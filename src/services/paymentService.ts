/**
 * Payment Service - Multi-region payment gateway integration
 * Supports: Razorpay (India), Stripe (USA), Telr (Middle East)
 */

import { Region } from "@/config/regionalConfig";

export type PaymentGateway = "razorpay" | "stripe" | "telr";

export interface PaymentConfig {
  gateway: PaymentGateway;
  publicKey: string;
  currencyCode: string;
  countryCode: string;
  webhookUrl: string;
}

export interface OrderData {
  serviceId: string;
  serviceName: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  orderId: string;
  paymentId?: string;
  status: "pending" | "success" | "failed";
  message: string;
  redirectUrl?: string;
}

/**
 * Get payment config based on region
 */
export const getPaymentConfig = (region: Region): PaymentConfig => {
  const configs: Record<Region, PaymentConfig> = {
    IN: {
      gateway: "razorpay",
      publicKey: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
      currencyCode: "INR",
      countryCode: "IN",
      webhookUrl: `${import.meta.env.VITE_API_URL}/webhooks/razorpay`,
    },
    US: {
      gateway: "stripe",
      publicKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
      currencyCode: "USD",
      countryCode: "US",
      webhookUrl: `${import.meta.env.VITE_API_URL}/webhooks/stripe`,
    },
    AE: {
      gateway: "telr",
      publicKey: import.meta.env.VITE_TELR_STORE_ID || "",
      currencyCode: "AED",
      countryCode: "AE",
      webhookUrl: `${import.meta.env.VITE_API_URL}/webhooks/telr`,
    },
    SA: {
      gateway: "telr",
      publicKey: import.meta.env.VITE_TELR_STORE_ID || "",
      currencyCode: "SAR",
      countryCode: "SA",
      webhookUrl: `${import.meta.env.VITE_API_URL}/webhooks/telr`,
    },
  };

  return configs[region];
};

/**
 * Razorpay Payment Handler
 * For India (INR) payments
 */
export const initializeRazorpayPayment = async (
  orderData: OrderData
): Promise<PaymentResponse> => {
  try {
    const amount = Math.round(orderData.amount * 100); // Convert to paise

    // Create order on backend
    const orderResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/razorpay/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `order_${Date.now()}`,
        description: orderData.description,
      }),
    });

    if (!orderResponse.ok) throw new Error("Failed to create Razorpay order");

    const { id: orderId } = await orderResponse.json();

    // Load Razorpay script if not loaded
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
    }

    return {
      orderId,
      status: "pending",
      message: "Ready to process Razorpay payment",
    };
  } catch (error) {
    console.error("Razorpay initialization error:", error);
    return {
      orderId: "",
      status: "failed",
      message: "Failed to initialize Razorpay payment",
    };
  }
};

/**
 * Stripe Payment Handler
 * For USA (USD) payments
 */
export const initializeStripePayment = async (
  orderData: OrderData
): Promise<PaymentResponse> => {
  try {
    const amount = Math.round(orderData.amount * 100); // Convert to cents

    // Create payment intent on backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/stripe/intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        currency: "USD",
        description: orderData.description,
        metadata: {
          serviceId: orderData.serviceId,
          customerEmail: orderData.customerEmail,
          ...orderData.metadata,
        },
      }),
    });

    if (!response.ok) throw new Error("Failed to create Stripe payment intent");

    const data = await response.json();

    return {
      orderId: data.clientSecret,
      status: "pending",
      message: "Ready to process Stripe payment",
      redirectUrl: `/checkout/stripe?clientSecret=${data.clientSecret}`,
    };
  } catch (error) {
    console.error("Stripe initialization error:", error);
    return {
      orderId: "",
      status: "failed",
      message: "Failed to initialize Stripe payment",
    };
  }
};

/**
 * Telr Payment Handler
 * For Middle East (AED/SAR) payments
 */
export const initializeTelrPayment = async (
  orderData: OrderData
): Promise<PaymentResponse> => {
  try {
    const amount = orderData.amount.toFixed(2); // Telr uses decimals

    // Create Telr order on backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/telr/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        currency: orderData.currency,
        description: orderData.description,
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        metadata: orderData.metadata,
      }),
    });

    if (!response.ok) throw new Error("Failed to create Telr order");

    const data = await response.json();

    return {
      orderId: data.orderId,
      status: "pending",
      message: "Ready to process Telr payment",
      redirectUrl: data.paymentUrl,
    };
  } catch (error) {
    console.error("Telr initialization error:", error);
    return {
      orderId: "",
      status: "failed",
      message: "Failed to initialize Telr payment",
    };
  }
};

/**
 * Universal Payment Processor
 * Routes to appropriate gateway based on region
 */
export const processPayment = async (
  region: Region,
  orderData: OrderData
): Promise<PaymentResponse> => {
  const config = getPaymentConfig(region);

  switch (config.gateway) {
    case "razorpay":
      return initializeRazorpayPayment(orderData);
    case "stripe":
      return initializeStripePayment(orderData);
    case "telr":
      return initializeTelrPayment(orderData);
    default:
      return {
        orderId: "",
        status: "failed",
        message: "Unsupported payment gateway",
      };
  }
};

/**
 * Verify payment after completion
 */
export const verifyPayment = async (
  gateway: PaymentGateway,
  paymentData: Record<string, any>
): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/${gateway}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });

    return response.ok;
  } catch (error) {
    console.error("Payment verification error:", error);
    return false;
  }
};

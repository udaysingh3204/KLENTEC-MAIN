import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/hooks/usePayment";
import { OrderData } from "@/services/paymentService";
import { Loader2, AlertCircle } from "lucide-react";

interface PaymentButtonProps {
  serviceId: string;
  serviceName: string;
  amount: number;
  currency: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export const PaymentButton = ({
  serviceId,
  serviceName,
  amount,
  currency,
  customerName = "",
  customerEmail = "",
  customerPhone = "",
  label = "Pay Now",
  variant = "primary",
  className = "",
}: PaymentButtonProps) => {
  const { initiatePayment, isProcessing, error, clearError } = usePayment();
  const [showError, setShowError] = useState(false);

  const handlePayment = async () => {
    // Validate customer data
    if (!customerEmail || !customerName) {
      setShowError(true);
      return;
    }

    if (!customerPhone) {
      setShowError(true);
      return;
    }

    const orderData: OrderData = {
      serviceId,
      serviceName,
      amount,
      currency,
      customerName,
      customerEmail,
      customerPhone,
      description: `Payment for ${serviceName}`,
      metadata: {
        serviceId,
        serviceName,
      },
    };

    const result = await initiatePayment(orderData);
    if (result?.status === "failed") {
      setShowError(true);
    }
  };

  const baseClass = `flex items-center gap-2 ${className}`;

  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white",
    outline: "border border-slate-600 text-slate-300 hover:border-purple-500 hover:text-purple-400",
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`${baseClass} ${variantClasses[variant]} font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isProcessing && <Loader2 size={18} className="animate-spin" />}
        {label}
      </button>

      {(error || showError) && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-900/20 border border-red-800/50">
          <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-red-400">
              {error || "Please ensure all required fields are filled"}
            </p>
            <button
              onClick={() => {
                setShowError(false);
                clearError();
              }}
              className="text-xs text-red-300 hover:text-red-200 mt-1 underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

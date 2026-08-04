import { useState } from "react";
import { useRegional } from "@/contexts/RegionalContext";
import { processPayment, OrderData, PaymentResponse } from "@/services/paymentService";

export const usePayment = () => {
  const { selectedRegion } = useRegional();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async (orderData: OrderData): Promise<PaymentResponse | null> => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await processPayment(selectedRegion, orderData);

      if (response.status === "failed") {
        setError(response.message);
        return null;
      }

      // If there's a redirect URL, navigate to it
      if (response.redirectUrl) {
        window.location.href = response.redirectUrl;
      }

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment processing failed";
      setError(errorMessage);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const clearError = () => setError(null);

  return {
    initiatePayment,
    isProcessing,
    error,
    clearError,
    currentRegion: selectedRegion,
  };
};

import { useRegional } from "@/contexts/RegionalContext";
import { formatCurrency, getServicePrice, Region } from "@/config/regionalConfig";

/**
 * Hook to format prices based on selected region
 */
export const useRegionalPrice = () => {
  const { selectedRegion } = useRegional();

  /**
   * Format a price amount to currency string
   */
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, selectedRegion);
  };

  /**
   * Get and format a service price
   */
  const getFormattedServicePrice = (
    serviceId: string,
    tier: "starter" | "professional" | "enterprise"
  ): string => {
    const price = getServicePrice(serviceId, tier, selectedRegion);
    return formatPrice(price);
  };

  /**
   * Get raw price (for calculations)
   */
  const getRawPrice = (serviceId: string, tier: "starter" | "professional" | "enterprise"): number => {
    return getServicePrice(serviceId, tier, selectedRegion);
  };

  return {
    selectedRegion,
    formatPrice,
    getFormattedServicePrice,
    getRawPrice,
  };
};

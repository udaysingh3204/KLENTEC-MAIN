import { useRegional } from "@/contexts/RegionalContext";
import { formatCurrency, getServicePrice, getIndividualServicePrice, Region } from "@/config/regionalConfig";

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
   * Get and format a service price (tiered)
   */
  const getFormattedServicePrice = (
    serviceId: string,
    tier: "starter" | "professional" | "enterprise"
  ): string => {
    const price = getServicePrice(serviceId, tier, selectedRegion);
    return formatPrice(price);
  };

  /**
   * Get and format individual service price (non-tiered)
   */
  const getFormattedPrice = (serviceId: string): string => {
    const price = getIndividualServicePrice(serviceId, selectedRegion);
    return formatPrice(price);
  };

  /**
   * Get raw price (for calculations) - tiered
   */
  const getRawPrice = (serviceId: string, tier: "starter" | "professional" | "enterprise"): number => {
    return getServicePrice(serviceId, tier, selectedRegion);
  };

  /**
   * Get raw individual price (for calculations) - non-tiered
   */
  const getRawIndividualPrice = (serviceId: string): number => {
    return getIndividualServicePrice(serviceId, selectedRegion);
  };

  return {
    selectedRegion,
    formatPrice,
    getFormattedServicePrice,
    getFormattedPrice,
    getRawPrice,
    getRawIndividualPrice,
  };
};

/**
 * Price formatting utility
 * Shows original price as crossed-out, new price as main display
 * 25% markup strategy positioning new prices as "discounted"
 */

export interface PriceDisplay {
  original: string; // Original price (struck through)
  new: string; // New price (25% higher) - displayed prominently
  percentage: number; // 25%
  label: string; // "Limited Offer", "Special Pricing", etc
}

/**
 * Parse price string and calculate new price with 25% increase
 * Examples: "₹4,999" → "₹6,249", "₹7,999/month" → "₹9,999/month"
 */
export const calculateNewPrice = (priceStr: string): PriceDisplay => {
  // Extract number and suffix (like /month, /day, /post, +, etc)
  const match = priceStr.match(/₹([\d,]+)(.*)/);

  if (!match) {
    return {
      original: priceStr,
      new: priceStr,
      percentage: 0,
      label: "",
    };
  }

  const numberStr = match[1].replace(/,/g, "");
  const suffix = match[2];
  const originalNum = parseInt(numberStr);
  const newNum = Math.round(originalNum * 1.25);

  // Format number with commas
  const formatNum = (n: number) => n.toLocaleString("en-IN");

  return {
    original: `₹${formatNum(originalNum)}${suffix}`,
    new: `₹${formatNum(newNum)}${suffix}`,
    percentage: 25,
    label: "Limited Time Offer",
  };
};

/**
 * Get all price updates for a specific service
 */
export const getServicePrices = () => {
  return {
    "24-hour-web-dev": {
      starter: calculateNewPrice("₹6,249"),
      enterprise: calculateNewPrice("₹12,499"),
      growth: calculateNewPrice("₹24,999"),
    },
  };
};

/**
 * Regional Configuration for KLENTEC Global Platform
 * Defines pricing, currency, and market-specific settings
 */

export type Region = "IN" | "US" | "AE" | "SA";
export type Currency = "INR" | "USD" | "AED" | "SAR";

export interface RegionalConfig {
  region: Region;
  name: string;
  currency: Currency;
  symbol: string;
  locale: string;
  timezone: string;
  phone: string;
  email: string;
  address: string;
  businessHours: string;
  vat?: number; // VAT percentage if applicable
  taxId?: string;
}

export interface RegionalPricing {
  baseServicePrice: number; // Starting price for basic service
  premiumMultiplier: number; // Multiplier for premium services
  enterpriseMultiplier: number; // Multiplier for enterprise services
  discountPercentage: number; // Current discount
}

/**
 * Regional Configuration Database
 */
export const regionalConfigs: Record<Region, RegionalConfig> = {
  IN: {
    region: "IN",
    name: "India",
    currency: "INR",
    symbol: "₹",
    locale: "en-IN",
    timezone: "IST",
    phone: "+91 95576 30336",
    email: "hello@klentec.com",
    address: "Noida, Uttar Pradesh, India",
    businessHours: "9:00 AM - 6:00 PM IST",
    vat: 18,
    taxId: "GSTIN: (To be added)",
  },
  US: {
    region: "US",
    name: "United States",
    currency: "USD",
    symbol: "$",
    locale: "en-US",
    timezone: "EST",
    phone: "+1 (844) 485-3832",
    email: "hello@klentec.com",
    address: "New York, USA",
    businessHours: "9:00 AM - 6:00 PM EST",
    // No VAT for US, sales tax varies by state
  },
  AE: {
    region: "AE",
    name: "United Arab Emirates",
    currency: "AED",
    symbol: "د.إ",
    locale: "ar-AE",
    timezone: "GST",
    phone: "+971 4 XXX XXXX",
    email: "hello@klentec.ae",
    address: "Dubai, United Arab Emirates",
    businessHours: "9:00 AM - 6:00 PM GST",
    vat: 5,
    taxId: "TRN: (To be added)",
  },
  SA: {
    region: "SA",
    name: "Saudi Arabia",
    currency: "SAR",
    symbol: "﷼",
    locale: "ar-SA",
    timezone: "AST",
    phone: "+966 XX XXXX XXXX",
    email: "hello@klentec.sa",
    address: "Riyadh, Saudi Arabia",
    businessHours: "9:00 AM - 6:00 PM AST",
    vat: 15,
    taxId: "VAT ID: (To be added)",
  },
};

/**
 * Regional Pricing Strategy
 * Market-based pricing for each region
 */
export const regionalPricing: Record<Region, RegionalPricing> = {
  IN: {
    baseServicePrice: 5000, // Base ₹5,000 for smallest service
    premiumMultiplier: 2.5, // ₹12,500 for premium
    enterpriseMultiplier: 6, // ₹30,000 for enterprise
    discountPercentage: 25, // Current 25% discount
  },
  US: {
    baseServicePrice: 500, // Base $500 (3.5x India in market terms)
    premiumMultiplier: 2.5, // $1,250 for premium
    enterpriseMultiplier: 5, // $2,500 for enterprise
    discountPercentage: 20, // 20% discount for US market
  },
  AE: {
    baseServicePrice: 1500, // Base د.إ1,500 (2x India adjusted)
    premiumMultiplier: 2.5, // د.إ3,750 for premium
    enterpriseMultiplier: 5.5, // د.إ8,250 for enterprise
    discountPercentage: 22, // 22% discount for ME market
  },
  SA: {
    baseServicePrice: 1500, // Base ﷼1,500 (aligned with AE)
    premiumMultiplier: 2.5, // ﷼3,750 for premium
    enterpriseMultiplier: 5.5, // ﷼8,250 for enterprise
    discountPercentage: 22, // 22% discount for ME market
  },
};

/**
 * Service-Specific Regional Pricing
 * Detailed pricing for each service tier by region
 */
export interface ServicePrice {
  starter: number;
  professional: number;
  enterprise: number;
}

export const serviceRegionalPricing: Record<Region, Record<string, ServicePrice>> = {
  IN: {
    "24-hour-web-dev": { starter: 7811, professional: 15624, enterprise: 31249 },
    "web-development": { starter: 35000, professional: 75000, enterprise: 200000 },
    "logo-design": { starter: 6249, professional: 15000, enterprise: 31250 },
    "social-media": { starter: 9999, professional: 18749, enterprise: 37499 },
    "video-production": { starter: 7500, professional: 15000, enterprise: 22500 },
    "digital-marketing": { starter: 20000, professional: 50000, enterprise: 100000 },
  },
  US: {
    "24-hour-web-dev": { starter: 799, professional: 1599, enterprise: 3199 },
    "web-development": { starter: 4500, professional: 9999, enterprise: 25000 },
    "logo-design": { starter: 799, professional: 1999, enterprise: 4999 },
    "social-media": { starter: 1299, professional: 2499, enterprise: 4999 },
    "video-production": { starter: 999, professional: 1999, enterprise: 2999 },
    "digital-marketing": { starter: 2999, professional: 6999, enterprise: 14999 },
  },
  AE: {
    "24-hour-web-dev": { starter: 2500, professional: 5000, enterprise: 10000 },
    "web-development": { starter: 15000, professional: 35000, enterprise: 85000 },
    "logo-design": { starter: 2500, professional: 6000, enterprise: 12500 },
    "social-media": { starter: 4000, professional: 8000, enterprise: 16000 },
    "video-production": { starter: 3000, professional: 6000, enterprise: 9000 },
    "digital-marketing": { starter: 8000, professional: 20000, enterprise: 40000 },
  },
  SA: {
    "24-hour-web-dev": { starter: 2500, professional: 5000, enterprise: 10000 },
    "web-development": { starter: 15000, professional: 35000, enterprise: 85000 },
    "logo-design": { starter: 2500, professional: 6000, enterprise: 12500 },
    "social-media": { starter: 4000, professional: 8000, enterprise: 16000 },
    "video-production": { starter: 3000, professional: 6000, enterprise: 9000 },
    "digital-marketing": { starter: 8000, professional: 20000, enterprise: 40000 },
  },
};

/**
 * Get regional config by region code
 */
export const getRegionalConfig = (region: Region): RegionalConfig => {
  return regionalConfigs[region];
};

/**
 * Get regional pricing by region code
 */
export const getRegionalPricing = (region: Region): RegionalPricing => {
  return regionalPricing[region];
};

/**
 * Get service-specific price
 */
export const getServicePrice = (
  serviceId: string,
  tier: "starter" | "professional" | "enterprise",
  region: Region
): number => {
  return serviceRegionalPricing[region]?.[serviceId]?.[tier] || 0;
};

/**
 * Format currency based on region and locale
 */
export const formatCurrency = (amount: number, region: Region): string => {
  const config = getRegionalConfig(region);
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Default region detection (can be enhanced with geo-IP)
 */
export const getDefaultRegion = (): Region => {
  // Default to India, can be enhanced with geo-IP detection
  return "IN";
};

/**
 * All available regions
 */
export const AVAILABLE_REGIONS: Region[] = ["IN", "US", "AE", "SA"];

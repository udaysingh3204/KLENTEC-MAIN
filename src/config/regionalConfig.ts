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

/**
 * Comprehensive regional pricing for ALL services
 * Prices are in the region's native currency
 */
export const serviceRegionalPricing: Record<Region, Record<string, any>> = {
  IN: {
    // Branding & Design
    "logo-basic": 6249,
    "logo-premium": 15000,
    "logo-luxury": 31250,
    "branding-guidelines": 18750,
    "brand-naming": 25000,
    "social-post": 749,
    "social-post-premium": 1500,
    "carousel-design": 3125,
    "story-design": 438,
    "flyer-poster": 1500,
    "brochure": 9375,
    "catalogue": 6250,
    "pitch-deck": 12500,
    "packaging": 6250,
    "business-card": 1249,
    "letterhead": 999,
    "email-signature": 1249,
    "id-card": 999,
    "invoice-design": 1875,
    "company-profile": 15000,

    // Social Media & Marketing
    "social-starter": 9999,
    "social-growth": 18749,
    "social-business": 37499,
    "social-scaleup": 74999,
    "social-enterprise": 125000,
    "meta-ads": 18750,
    "google-ads": 25000,
    "lead-generation": 31250,
    "ecom-ads": 43750,
    "conversion-funnel": 37500,
    "retargeting": 18750,

    // Video Production
    "reel-shoot": 7500,
    "promo-video": 15000,
    "corporate-shoot": 22500,
    "event-coverage": 18750,
    "podcast": 25000,
    "music-video": 62500,
    "documentary": 43750,
    "reel-editing": 1875,
    "youtube-editing": 5000,
    "corporate-editing": 12500,
    "motion-graphics": 10000,
    "vfx-editing": 18750,
    "thumbnail": 1249,
    "drone-shoot": 9375,
    "insta360-shoot": 6250,
    "voiceover": 4375,
    "scriptwriting": 9375,
    "studio-setup": 18750,

    // Web Development
    "landing-page": 18750,
    "business-website": 43750,
    "corporate-website": 93750,
    "portfolio-website": 25000,
    "blog-website": 50000,
    "shopify-store": 56250,
    "woocommerce-store": 68750,
    "custom-ecom": 250000,
    "marketplace": 500000,
    "quick-commerce": 625000,
    "react-website": 75000,
    "nextjs-platform": 125000,
    "mern-app": 250000,
    "saas-mvp": 500000,
    "admin-dashboard": 93750,
    "crm-erp": 375000,

    // Mobile Apps
    "android-app": 125000,
    "ios-app": 187500,
    "flutter-app": 187500,
    "react-native": 187500,
    "food-delivery": 500000,
    "booking-app": 375000,
    "ecom-app": 437500,
    "startup-app": 750000,

    // AI & Automation
    "ai-chatbot": 62500,
    "gpt-integration": 43750,
    "ai-support": 125000,
    "ai-workflow": 93750,
    "ai-saas": 750000,
    "ai-recommendation": 250000,
    "whatsapp-automation": 31250,
    "crm-automation": 50000,
    "email-automation": 43750,
    "lead-automation": 62500,
    "workflow-automation": 125000,

    // Fintech
    "razorpay-integration": 18750,
    "cashfree-integration": 22500,
    "phonepe-integration": 25000,
    "subscription-billing": 125000,
    "wallet-system": 250000,
    "payout-system": 312500,
    "gst-billing": 125000,
    "invoice-platform": 187500,
    "fintech-dashboard": 375000,
    "banking-api": 250000,
    "kyc-verification": 62500,
    "loan-management": 500000,

    // E-Commerce Management
    "amazon-setup": 12500,
    "flipkart-setup": 12500,
    "myntra-setup": 22500,
    "meesho-setup": 9375,
    "blinkit-setup": 31250,
    "product-upload": 94,
    "marketplace-mgmt": 18750,
    "quick-commerce-mgmt": 50000,
    "inventory-automation": 25000,

    // SEO
    "seo-basic": 12500,
    "seo-advanced": 37500,
    "seo-enterprise": 93750,
    "seo-audit": 25000,
    "backlink-building": 18750,
    "local-seo": 22500,

    // Communication
    "whatsapp-api": 18750,
    "whatsapp-marketing": 25000,
    "email-marketing": 12500,
    "email-funnel": 43750,
    "sms-gateway": 18750,
    "crm-integration": 62500,

    // Cloud & DevOps
    "shared-hosting": 6250,
    "vps-hosting": 25000,
    "aws-deployment": 43750,
    "docker-deployment": 31250,
    "cicd-pipeline": 37500,
    "server-optimization": 25000,

    // Backend
    "rest-api": 31250,
    "graphql-api": 50000,
    "backend-architecture": 93750,
    "microservices": 250000,
    "firebase-integration": 18750,
    "database-setup": 25000,

    // Add-ons
    "domain-hosting": 9375,
    "speed-optimization": 18750,
    "security-hardening": 25000,
    "api-integrations": 25000,
    "analytics-dashboard": 125000,
    "admin-panel": 62500,
    "third-party-integration": 31250,

    // Packages
    "startup-package": 250000,
    "d2c-package": 375000,
    "restaurant-package": 125000,
    "influencer-package": 93750,
    "saas-package": 875000,
    "digital-transformation": 1875000,

    // Tiers
    "24-hour-web-dev": { starter: 7811, professional: 15624, enterprise: 31249 },
  },

  US: {
    // Similar structure but in USD (roughly 8-10x base tier values)
    "logo-basic": 799,
    "logo-premium": 1999,
    "logo-luxury": 4999,
    "branding-guidelines": 2499,
    "brand-naming": 3499,
    "social-post": 99,
    "social-post-premium": 199,
    "carousel-design": 399,
    "story-design": 59,
    "flyer-poster": 199,
    "brochure": 1199,
    "catalogue": 799,
    "pitch-deck": 1599,
    "packaging": 799,
    "business-card": 149,
    "letterhead": 129,
    "email-signature": 149,
    "id-card": 129,
    "invoice-design": 249,
    "company-profile": 1999,

    "social-starter": 1299,
    "social-growth": 2499,
    "social-business": 4999,
    "social-scaleup": 9999,
    "social-enterprise": 19999,
    "meta-ads": 2499,
    "google-ads": 3299,
    "lead-generation": 4199,
    "ecom-ads": 5799,
    "conversion-funnel": 4999,
    "retargeting": 2499,

    "reel-shoot": 999,
    "promo-video": 1999,
    "corporate-shoot": 2999,
    "event-coverage": 2499,
    "podcast": 3299,
    "music-video": 8299,
    "documentary": 5799,
    "reel-editing": 249,
    "youtube-editing": 699,
    "corporate-editing": 1699,
    "motion-graphics": 1399,
    "vfx-editing": 2499,
    "thumbnail": 169,
    "drone-shoot": 1249,
    "insta360-shoot": 829,
    "voiceover": 579,
    "scriptwriting": 1249,
    "studio-setup": 2499,

    "landing-page": 2499,
    "business-website": 5999,
    "corporate-website": 12499,
    "portfolio-website": 3299,
    "blog-website": 6999,
    "shopify-store": 7499,
    "woocommerce-store": 9199,
    "custom-ecom": 33299,
    "marketplace": 66599,
    "quick-commerce": 83299,
    "react-website": 9999,
    "nextjs-platform": 16699,
    "mern-app": 33299,
    "saas-mvp": 66599,
    "admin-dashboard": 12499,
    "crm-erp": 49999,

    "android-app": 16699,
    "ios-app": 24999,
    "flutter-app": 24999,
    "react-native": 24999,
    "food-delivery": 66599,
    "booking-app": 49999,
    "ecom-app": 58299,
    "startup-app": 99999,

    "ai-chatbot": 8299,
    "gpt-integration": 5799,
    "ai-support": 16699,
    "ai-workflow": 12499,
    "ai-saas": 99999,
    "ai-recommendation": 33299,
    "whatsapp-automation": 4199,
    "crm-automation": 6699,
    "email-automation": 5799,
    "lead-automation": 8299,
    "workflow-automation": 16699,

    "razorpay-integration": 2499,
    "cashfree-integration": 2999,
    "phonepe-integration": 3299,
    "subscription-billing": 16699,
    "wallet-system": 33299,
    "payout-system": 41599,
    "gst-billing": 16699,
    "invoice-platform": 24999,
    "fintech-dashboard": 49999,
    "banking-api": 33299,
    "kyc-verification": 8299,
    "loan-management": 66599,

    "amazon-setup": 1699,
    "flipkart-setup": 1699,
    "myntra-setup": 2999,
    "meesho-setup": 1249,
    "blinkit-setup": 4199,
    "product-upload": 12,
    "marketplace-mgmt": 2499,
    "quick-commerce-mgmt": 6699,
    "inventory-automation": 3299,

    "seo-basic": 1699,
    "seo-advanced": 4999,
    "seo-enterprise": 12499,
    "seo-audit": 3299,
    "backlink-building": 2499,
    "local-seo": 2999,

    "whatsapp-api": 2499,
    "whatsapp-marketing": 3299,
    "email-marketing": 1699,
    "email-funnel": 5799,
    "sms-gateway": 2499,
    "crm-integration": 8299,

    "shared-hosting": 829,
    "vps-hosting": 3299,
    "aws-deployment": 5799,
    "docker-deployment": 4199,
    "cicd-pipeline": 4999,
    "server-optimization": 3299,

    "rest-api": 4199,
    "graphql-api": 6699,
    "backend-architecture": 12499,
    "microservices": 33299,
    "firebase-integration": 2499,
    "database-setup": 3299,

    "domain-hosting": 1249,
    "speed-optimization": 2499,
    "security-hardening": 3299,
    "api-integrations": 3299,
    "analytics-dashboard": 16699,
    "admin-panel": 8299,
    "third-party-integration": 4199,

    "startup-package": 33299,
    "d2c-package": 49999,
    "restaurant-package": 16699,
    "influencer-package": 12499,
    "saas-package": 116699,
    "digital-transformation": 249999,

    "24-hour-web-dev": { starter: 799, professional: 1599, enterprise: 3199 },
  },

  AE: {
    // Middle East pricing
    "logo-basic": 2500,
    "logo-premium": 6000,
    "logo-luxury": 12500,
    "branding-guidelines": 7500,
    "brand-naming": 10000,
    "social-post": 300,
    "social-post-premium": 600,
    "carousel-design": 1250,
    "story-design": 175,
    "flyer-poster": 600,
    "brochure": 3750,
    "catalogue": 2500,
    "pitch-deck": 5000,
    "packaging": 2500,
    "business-card": 500,
    "letterhead": 400,
    "email-signature": 500,
    "id-card": 400,
    "invoice-design": 750,
    "company-profile": 6000,

    "social-starter": 4000,
    "social-growth": 7500,
    "social-business": 15000,
    "social-scaleup": 30000,
    "social-enterprise": 50000,
    "meta-ads": 7500,
    "google-ads": 10000,
    "lead-generation": 12500,
    "ecom-ads": 17500,
    "conversion-funnel": 15000,
    "retargeting": 7500,

    "reel-shoot": 3000,
    "promo-video": 6000,
    "corporate-shoot": 9000,
    "event-coverage": 7500,
    "podcast": 10000,
    "music-video": 25000,
    "documentary": 17500,
    "reel-editing": 750,
    "youtube-editing": 2000,
    "corporate-editing": 5000,
    "motion-graphics": 4000,
    "vfx-editing": 7500,
    "thumbnail": 500,
    "drone-shoot": 3750,
    "insta360-shoot": 2500,
    "voiceover": 1750,
    "scriptwriting": 3750,
    "studio-setup": 7500,

    "landing-page": 7500,
    "business-website": 17500,
    "corporate-website": 37500,
    "portfolio-website": 10000,
    "blog-website": 20000,
    "shopify-store": 22500,
    "woocommerce-store": 27500,
    "custom-ecom": 100000,
    "marketplace": 200000,
    "quick-commerce": 250000,
    "react-website": 30000,
    "nextjs-platform": 50000,
    "mern-app": 100000,
    "saas-mvp": 200000,
    "admin-dashboard": 37500,
    "crm-erp": 150000,

    "android-app": 50000,
    "ios-app": 75000,
    "flutter-app": 75000,
    "react-native": 75000,
    "food-delivery": 200000,
    "booking-app": 150000,
    "ecom-app": 175000,
    "startup-app": 300000,

    "ai-chatbot": 25000,
    "gpt-integration": 17500,
    "ai-support": 50000,
    "ai-workflow": 37500,
    "ai-saas": 300000,
    "ai-recommendation": 100000,
    "whatsapp-automation": 12500,
    "crm-automation": 20000,
    "email-automation": 17500,
    "lead-automation": 25000,
    "workflow-automation": 50000,

    "razorpay-integration": 7500,
    "cashfree-integration": 9000,
    "phonepe-integration": 10000,
    "subscription-billing": 50000,
    "wallet-system": 100000,
    "payout-system": 125000,
    "gst-billing": 50000,
    "invoice-platform": 75000,
    "fintech-dashboard": 150000,
    "banking-api": 100000,
    "kyc-verification": 25000,
    "loan-management": 200000,

    "amazon-setup": 5000,
    "flipkart-setup": 5000,
    "myntra-setup": 9000,
    "meesho-setup": 3750,
    "blinkit-setup": 12500,
    "product-upload": 35,
    "marketplace-mgmt": 7500,
    "quick-commerce-mgmt": 20000,
    "inventory-automation": 10000,

    "seo-basic": 5000,
    "seo-advanced": 15000,
    "seo-enterprise": 37500,
    "seo-audit": 10000,
    "backlink-building": 7500,
    "local-seo": 9000,

    "whatsapp-api": 7500,
    "whatsapp-marketing": 10000,
    "email-marketing": 5000,
    "email-funnel": 17500,
    "sms-gateway": 7500,
    "crm-integration": 25000,

    "shared-hosting": 2500,
    "vps-hosting": 10000,
    "aws-deployment": 17500,
    "docker-deployment": 12500,
    "cicd-pipeline": 15000,
    "server-optimization": 10000,

    "rest-api": 12500,
    "graphql-api": 20000,
    "backend-architecture": 37500,
    "microservices": 100000,
    "firebase-integration": 7500,
    "database-setup": 10000,

    "domain-hosting": 3750,
    "speed-optimization": 7500,
    "security-hardening": 10000,
    "api-integrations": 10000,
    "analytics-dashboard": 50000,
    "admin-panel": 25000,
    "third-party-integration": 12500,

    "startup-package": 100000,
    "d2c-package": 150000,
    "restaurant-package": 50000,
    "influencer-package": 37500,
    "saas-package": 350000,
    "digital-transformation": 750000,

    "24-hour-web-dev": { starter: 2500, professional: 5000, enterprise: 10000 },
  },

  SA: {
    // Saudi Arabia (same as UAE for now, can be adjusted)
    "logo-basic": 2500,
    "logo-premium": 6000,
    "logo-luxury": 12500,
    "branding-guidelines": 7500,
    "brand-naming": 10000,
    "social-post": 300,
    "social-post-premium": 600,
    "carousel-design": 1250,
    "story-design": 175,
    "flyer-poster": 600,
    "brochure": 3750,
    "catalogue": 2500,
    "pitch-deck": 5000,
    "packaging": 2500,
    "business-card": 500,
    "letterhead": 400,
    "email-signature": 500,
    "id-card": 400,
    "invoice-design": 750,
    "company-profile": 6000,

    "social-starter": 4000,
    "social-growth": 7500,
    "social-business": 15000,
    "social-scaleup": 30000,
    "social-enterprise": 50000,
    "meta-ads": 7500,
    "google-ads": 10000,
    "lead-generation": 12500,
    "ecom-ads": 17500,
    "conversion-funnel": 15000,
    "retargeting": 7500,

    "reel-shoot": 3000,
    "promo-video": 6000,
    "corporate-shoot": 9000,
    "event-coverage": 7500,
    "podcast": 10000,
    "music-video": 25000,
    "documentary": 17500,
    "reel-editing": 750,
    "youtube-editing": 2000,
    "corporate-editing": 5000,
    "motion-graphics": 4000,
    "vfx-editing": 7500,
    "thumbnail": 500,
    "drone-shoot": 3750,
    "insta360-shoot": 2500,
    "voiceover": 1750,
    "scriptwriting": 3750,
    "studio-setup": 7500,

    "landing-page": 7500,
    "business-website": 17500,
    "corporate-website": 37500,
    "portfolio-website": 10000,
    "blog-website": 20000,
    "shopify-store": 22500,
    "woocommerce-store": 27500,
    "custom-ecom": 100000,
    "marketplace": 200000,
    "quick-commerce": 250000,
    "react-website": 30000,
    "nextjs-platform": 50000,
    "mern-app": 100000,
    "saas-mvp": 200000,
    "admin-dashboard": 37500,
    "crm-erp": 150000,

    "android-app": 50000,
    "ios-app": 75000,
    "flutter-app": 75000,
    "react-native": 75000,
    "food-delivery": 200000,
    "booking-app": 150000,
    "ecom-app": 175000,
    "startup-app": 300000,

    "ai-chatbot": 25000,
    "gpt-integration": 17500,
    "ai-support": 50000,
    "ai-workflow": 37500,
    "ai-saas": 300000,
    "ai-recommendation": 100000,
    "whatsapp-automation": 12500,
    "crm-automation": 20000,
    "email-automation": 17500,
    "lead-automation": 25000,
    "workflow-automation": 50000,

    "razorpay-integration": 7500,
    "cashfree-integration": 9000,
    "phonepe-integration": 10000,
    "subscription-billing": 50000,
    "wallet-system": 100000,
    "payout-system": 125000,
    "gst-billing": 50000,
    "invoice-platform": 75000,
    "fintech-dashboard": 150000,
    "banking-api": 100000,
    "kyc-verification": 25000,
    "loan-management": 200000,

    "amazon-setup": 5000,
    "flipkart-setup": 5000,
    "myntra-setup": 9000,
    "meesho-setup": 3750,
    "blinkit-setup": 12500,
    "product-upload": 35,
    "marketplace-mgmt": 7500,
    "quick-commerce-mgmt": 20000,
    "inventory-automation": 10000,

    "seo-basic": 5000,
    "seo-advanced": 15000,
    "seo-enterprise": 37500,
    "seo-audit": 10000,
    "backlink-building": 7500,
    "local-seo": 9000,

    "whatsapp-api": 7500,
    "whatsapp-marketing": 10000,
    "email-marketing": 5000,
    "email-funnel": 17500,
    "sms-gateway": 7500,
    "crm-integration": 25000,

    "shared-hosting": 2500,
    "vps-hosting": 10000,
    "aws-deployment": 17500,
    "docker-deployment": 12500,
    "cicd-pipeline": 15000,
    "server-optimization": 10000,

    "rest-api": 12500,
    "graphql-api": 20000,
    "backend-architecture": 37500,
    "microservices": 100000,
    "firebase-integration": 7500,
    "database-setup": 10000,

    "domain-hosting": 3750,
    "speed-optimization": 7500,
    "security-hardening": 10000,
    "api-integrations": 10000,
    "analytics-dashboard": 50000,
    "admin-panel": 25000,
    "third-party-integration": 12500,

    "startup-package": 100000,
    "d2c-package": 150000,
    "restaurant-package": 50000,
    "influencer-package": 37500,
    "saas-package": 350000,
    "digital-transformation": 750000,

    "24-hour-web-dev": { starter: 2500, professional: 5000, enterprise: 10000 },
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
 * Get service-specific price (for tiered services)
 */
export const getServicePrice = (
  serviceId: string,
  tier: "starter" | "professional" | "enterprise",
  region: Region
): number => {
  const price = serviceRegionalPricing[region]?.[serviceId]?.[tier];
  if (typeof price === 'number') return price;
  return 0;
};

/**
 * Get individual service price (for non-tiered services)
 */
export const getIndividualServicePrice = (
  serviceId: string,
  region: Region
): number => {
  const price = serviceRegionalPricing[region]?.[serviceId];
  if (typeof price === 'number') return price;
  return 0;
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

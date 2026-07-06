/**
 * Google Analytics 4 integration
 * Note: Add your GA4 tracking ID to .env.local as VITE_GA4_ID
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const initGA = (trackingId: string) => {
  // Load Google Analytics script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", trackingId, {
    page_path: window.location.pathname,
  });
};

/**
 * Track page view
 */
export const trackPageView = (pageName: string, pagePath: string) => {
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_title: pageName,
      page_path: pagePath,
    });
  }
};

/**
 * Track lead submission
 */
export const trackLeadSubmission = (service: string, source: string) => {
  if (window.gtag) {
    window.gtag("event", "lead_generated", {
      event_category: "engagement",
      event_label: service,
      source: source,
    });
  }
};

/**
 * Track CTA click
 */
export const trackCTAClick = (ctaName: string, ctaLocation: string) => {
  if (window.gtag) {
    window.gtag("event", "cta_click", {
      event_category: "engagement",
      event_label: ctaName,
      location: ctaLocation,
    });
  }
};

/**
 * Track service view
 */
export const trackServiceView = (serviceName: string) => {
  if (window.gtag) {
    window.gtag("event", "view_service", {
      event_category: "engagement",
      event_label: serviceName,
    });
  }
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentScrolled: number) => {
  if (window.gtag) {
    window.gtag("event", "scroll", {
      event_category: "engagement",
      event_label: `${percentScrolled}%`,
    });
  }
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (pageName: string, secondsSpent: number) => {
  if (window.gtag) {
    window.gtag("event", "time_on_page", {
      event_category: "engagement",
      event_label: pageName,
      value: secondsSpent,
    });
  }
};

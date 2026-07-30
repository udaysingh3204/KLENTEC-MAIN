/**
 * CTA Service - Handles all Call-To-Action redirects and tracking
 */

export type CTAType =
  | "strategy-call"
  | "growth-audit"
  | "contact-inquiry"
  | "lead-form";

export interface CTAData {
  type: CTAType;
  source: string; // Page/section where CTA was clicked
}

/**
 * Navigate to contact page with CTA context
 */
export const handleCTA = (type: CTAType, source: string = "unknown") => {
  const params = new URLSearchParams({
    cta: type,
    source: source,
  });

  // Store in session for form pre-fill
  sessionStorage.setItem("ctaData", JSON.stringify({ type, source }));

  // Redirect to contact page
  window.location.href = `/contact?${params.toString()}`;
};

/**
 * Get CTA data from URL or session
 */
export const getCTAData = (): CTAData | null => {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("cta");
  const source = params.get("source") || "unknown";

  if (type === "strategy-call" || type === "growth-audit" || type === "contact-inquiry" || type === "lead-form") {
    return { type, source };
  }

  // Try to get from session
  const sessionData = sessionStorage.getItem("ctaData");
  if (sessionData) {
    try {
      return JSON.parse(sessionData);
    } catch {
      return null;
    }
  }

  return null;
};

/**
 * Clear CTA data
 */
export const clearCTAData = () => {
  sessionStorage.removeItem("ctaData");
};

/**
 * Get pre-filled form values based on CTA type
 */
export const getFormPreFill = (ctaType: CTAType | null) => {
  switch (ctaType) {
    case "strategy-call":
      return {
        serviceInterest: "Strategy Consultation",
        message: "I'm interested in booking a free strategy call to discuss how KLENTEC can help scale my business.",
      };
    case "growth-audit":
      return {
        serviceInterest: "Growth Audit",
        message: "I'd like to get a free growth audit from KLENTEC to identify opportunities for my business.",
      };
    default:
      return {
        serviceInterest: "",
        message: "",
      };
  }
};

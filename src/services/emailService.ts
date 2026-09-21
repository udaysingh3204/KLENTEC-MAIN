export interface EmailContact {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceInterest?: string | null;
  message?: string | null;
  source?: string | null;
}

/**
 * Send welcome/confirmation email via the /api/send-email serverless
 * function (Resend). Failure is caught internally and never blocks the
 * caller's own success state.
 */
export const sendConfirmationEmail = async (contact: EmailContact) => {
  try {
    const resp = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "confirmation",
        toEmail: contact.email,
        toName: contact.name,
      }),
    });
    if (!resp.ok) {
      const body = await resp.json().catch(() => ({}));
      throw new Error(body?.error || `send-email failed: ${resp.status}`);
    }
  } catch (err) {
    console.error("Failed to send confirmation email:", err);
  }
};

/**
 * Send admin notification via the /api/send-email serverless function
 * (Resend). Shared by every intake surface (contact form, exit-intent
 * popup) so notifications stay consistent regardless of source.
 */
export const sendAdminNotification = async (contact: EmailContact) => {
  try {
    const resp = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "admin",
        leadName: contact.name,
        leadEmail: contact.email,
        leadPhone: contact.phone || "N/A",
        leadCompany: contact.company || "Not provided",
        leadService: contact.serviceInterest || "Not specified",
        leadMessage: contact.message || "(No message provided)",
        source: contact.source,
      }),
    });
    if (!resp.ok) {
      const body = await resp.json().catch(() => ({}));
      throw new Error(body?.error || `send-email failed: ${resp.status}`);
    }
  } catch (err) {
    console.error("Failed to send admin notification:", err);
  }
};

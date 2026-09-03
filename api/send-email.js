// Vercel serverless function — sends transactional emails via Resend.
// Kept server-side because Resend's API key is a secret; it must never be
// shipped to the browser the way EmailJS's "public key" was.

const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "KLENTEC <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "hello@klentec.com";

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const confirmationEmail = ({ toEmail, toName }) => ({
  from: FROM_EMAIL,
  to: [toEmail],
  subject: "Thanks for reaching out to KLENTEC",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color:#1a1a1a;">
      <h2 style="color:#7c3aed;">Thanks, ${escapeHtml(toName)}!</h2>
      <p>We've received your message and a member of our team will get back to you within 2 hours.</p>
      <p>In the meantime, feel free to explore our <a href="https://klentec.com/work">recent work</a>.</p>
      <p style="margin-top:32px; color:#6b7280; font-size:12px;">— The KLENTEC Team</p>
    </div>
  `,
});

const adminNotificationEmail = ({ leadName, leadEmail, leadPhone, leadCompany, leadService, leadMessage, source }) => ({
  from: FROM_EMAIL,
  to: [ADMIN_EMAIL],
  reply_to: leadEmail,
  subject: `New enquiry: ${leadName}${leadService ? ` (${leadService})` : ""}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color:#1a1a1a;">
      <h2 style="color:#7c3aed;">New Lead${source ? ` — ${escapeHtml(source)}` : ""}</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding:6px 0; color:#6b7280;">Name</td><td style="padding:6px 0;"><strong>${escapeHtml(leadName)}</strong></td></tr>
        <tr><td style="padding:6px 0; color:#6b7280;">Email</td><td style="padding:6px 0;">${escapeHtml(leadEmail)}</td></tr>
        <tr><td style="padding:6px 0; color:#6b7280;">Phone</td><td style="padding:6px 0;">${escapeHtml(leadPhone || "N/A")}</td></tr>
        <tr><td style="padding:6px 0; color:#6b7280;">Company</td><td style="padding:6px 0;">${escapeHtml(leadCompany || "Not provided")}</td></tr>
        <tr><td style="padding:6px 0; color:#6b7280;">Service Interest</td><td style="padding:6px 0;">${escapeHtml(leadService || "Not specified")}</td></tr>
      </table>
      <p style="margin-top:16px; color:#6b7280;">Message</p>
      <p style="white-space:pre-wrap; background:#f9fafb; border-radius:8px; padding:12px;">${escapeHtml(leadMessage || "(no message provided)")}</p>
    </div>
  `,
});

async function sendViaResend(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resp = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(data?.message || `Resend request failed with status ${resp.status}`);
  }
  return data;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let body = req.body;
  if (!body || typeof body === "string") {
    try {
      body = JSON.parse(body || "{}");
    } catch {
      res.status(400).json({ error: "Invalid JSON body" });
      return;
    }
  }

  const { type } = body;

  try {
    if (type === "confirmation") {
      const { toEmail, toName } = body;
      if (!toEmail) throw new Error("toEmail is required");
      await sendViaResend(confirmationEmail({ toEmail, toName: toName || "there" }));
    } else if (type === "admin") {
      const { leadName, leadEmail, leadPhone, leadCompany, leadService, leadMessage, source } = body;
      if (!leadName || !leadEmail) throw new Error("leadName and leadEmail are required");
      await sendViaResend(
        adminNotificationEmail({ leadName, leadEmail, leadPhone, leadCompany, leadService, leadMessage, source }),
      );
    } else {
      res.status(400).json({ error: "Unknown email type" });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("send-email error:", err);
    res.status(500).json({ error: err.message || "Failed to send email" });
  }
}

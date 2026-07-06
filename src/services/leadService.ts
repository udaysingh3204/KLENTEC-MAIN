import { createClient } from "@supabase/supabase-js";
import emailjs from "@emailjs/browser";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface Lead {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest: string;
  message: string;
  status?: "new" | "contacted" | "converted" | "closed";
  source?: string;
  created_at?: string;
}

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

/**
 * Submit lead to Supabase and trigger email automation
 */
export const submitLead = async (leadData: Lead) => {
  try {
    // 1. Save to Supabase
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          full_name: leadData.full_name,
          email: leadData.email,
          phone: leadData.phone || null,
          company: leadData.company || null,
          service_interest: leadData.service_interest,
          message: leadData.message,
          status: "new",
          source: leadData.source || "contact-form",
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(`Failed to save lead: ${error.message}`);
    }

    const leadId = data?.[0]?.id;
    console.log("Lead saved:", leadId);

    // 2. Send confirmation email to user
    await sendConfirmationEmail(leadData);

    // 3. Send admin notification
    await sendAdminNotification(leadData);

    return { success: true, leadId };
  } catch (err) {
    console.error("Lead submission error:", err);
    throw err;
  }
};

/**
 * Send welcome/confirmation email to lead
 */
const sendConfirmationEmail = async (lead: Lead) => {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_HELLO,
      import.meta.env.VITE_EMAILJS_TEMPLATE_INQUIRY,
      {
        to_email: lead.email,
        to_name: lead.full_name,
        from_name: "KLENTEC Team",
        subject: "Thanks for reaching out! 🚀",
        message: `Hi ${lead.full_name},\n\nThank you for your interest in KLENTEC! We've received your inquiry about ${lead.service_interest}.\n\nOur team will review your request and get back to you within 2 hours.\n\nBest regards,\nKLENTEC Team`,
      }
    );
    console.log("Confirmation email sent");
  } catch (err) {
    console.error("Failed to send confirmation email:", err);
    // Don't throw - lead is still saved even if email fails
  }
};

/**
 * Send admin notification
 */
const sendAdminNotification = async (lead: Lead) => {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ADMIN,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN,
      {
        to_email: "uday@klentec.com",
        from_name: "KLENTEC Lead System",
        subject: `🔥 New Lead: ${lead.full_name}`,
        lead_name: lead.full_name,
        lead_email: lead.email,
        lead_phone: lead.phone || "N/A",
        lead_company: lead.company || "Not provided",
        lead_service: lead.service_interest,
        lead_message: lead.message,
      }
    );
    console.log("Admin notification sent");
  } catch (err) {
    console.error("Failed to send admin notification:", err);
  }
};

/**
 * Get all leads (admin only)
 */
export const getLeads = async (filters?: {
  status?: string;
  service?: string;
  limit?: number;
}) => {
  try {
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    if (filters?.service) {
      query = query.eq("service_interest", filters.service);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Failed to fetch leads:", err);
    throw err;
  }
};

/**
 * Update lead status
 */
export const updateLeadStatus = async (
  leadId: string,
  status: "new" | "contacted" | "converted" | "closed"
) => {
  try {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", leadId);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Failed to update lead:", err);
    throw err;
  }
};

/**
 * Get lead statistics
 */
export const getLeadStats = async () => {
  try {
    const { data: leads, error } = await supabase
      .from("leads")
      .select("status, created_at");

    if (error) throw error;

    const stats = {
      total: leads?.length || 0,
      new: leads?.filter((l) => l.status === "new").length || 0,
      contacted: leads?.filter((l) => l.status === "contacted").length || 0,
      converted: leads?.filter((l) => l.status === "converted").length || 0,
      closed: leads?.filter((l) => l.status === "closed").length || 0,
    };

    return stats;
  } catch (err) {
    console.error("Failed to get lead stats:", err);
    throw err;
  }
};

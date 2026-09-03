import { createClient } from "@supabase/supabase-js";

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

    // Fire both emails in parallel; each catches its own errors internally
    // so a delivery failure never blocks the lead from being recorded as submitted.
    await Promise.all([sendConfirmationEmail(leadData), sendAdminNotification(leadData)]);

    return { success: true, leadId };
  } catch (err) {
    console.error("Lead submission error:", err);
    throw err;
  }
};

/**
 * Send welcome/confirmation email to lead via the /api/send-email
 * serverless function (Resend).
 */
const sendConfirmationEmail = async (lead: Lead) => {
  try {
    const resp = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "confirmation",
        toEmail: lead.email,
        toName: lead.full_name,
      }),
    });
    if (!resp.ok) {
      const body = await resp.json().catch(() => ({}));
      throw new Error(body?.error || `send-email failed: ${resp.status}`);
    }
    console.log("Confirmation email sent");
  } catch (err) {
    console.error("Failed to send confirmation email:", err);
  }
};

/**
 * Send admin notification via the /api/send-email serverless function
 * (Resend). Exported so other lead-capture surfaces (e.g. the exit-intent
 * popup) can reuse it without duplicating the wiring.
 */
export const sendAdminNotification = async (lead: Lead) => {
  try {
    const resp = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "admin",
        leadName: lead.full_name,
        leadEmail: lead.email,
        leadPhone: lead.phone || "N/A",
        leadCompany: lead.company || "Not provided",
        leadService: lead.service_interest,
        leadMessage: lead.message,
        source: lead.source,
      }),
    });
    if (!resp.ok) {
      const body = await resp.json().catch(() => ({}));
      throw new Error(body?.error || `send-email failed: ${resp.status}`);
    }
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

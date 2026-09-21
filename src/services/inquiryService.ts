import { supabase } from "@/lib/supabase";
import type { Inquiry } from "@/lib/types";
import { sendAdminNotification, sendConfirmationEmail } from "./emailService";

export type InquiryStatus = Inquiry["status"];

/**
 * Every inquiry that has moved past initial triage counts as a lead —
 * i.e. someone has actually engaged with it, not just submitted it.
 */
export const LEAD_STATUSES: InquiryStatus[] = ["contacted", "proposal_sent", "won"];

export interface InquirySubmission {
  name: string;
  email: string;
  company?: string;
  whatsapp?: string;
  services?: string;
  budget?: string;
  timeline?: string;
  notes?: string;
  source: string;
}

/**
 * Single entry point for every public intake surface (contact form,
 * exit-intent popup, future forms). Saves the inquiry and fires the
 * confirmation + admin notification emails.
 */
export const submitInquiry = async (submission: InquirySubmission) => {
  const { data, error } = await supabase
    .from("inquiries")
    .insert([
      {
        name: submission.name,
        email: submission.email,
        company: submission.company || null,
        whatsapp: submission.whatsapp || null,
        services: submission.services || null,
        budget: submission.budget || null,
        timeline: submission.timeline || null,
        notes: submission.notes || null,
        source: submission.source,
        status: "new",
      },
    ])
    .select();

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(`Failed to save inquiry: ${error.message}`);
  }

  const inquiryId = data?.[0]?.id;
  const emailContact = {
    name: submission.name,
    email: submission.email,
    phone: submission.whatsapp,
    company: submission.company,
    serviceInterest: submission.services,
    message: submission.notes,
    source: submission.source,
  };

  await Promise.all([sendConfirmationEmail(emailContact), sendAdminNotification(emailContact)]);

  return { success: true, inquiryId };
};

export const getInquiries = async (filters?: { statuses?: InquiryStatus[] }) => {
  let query = supabase.from("inquiries").select("*").order("created_at", { ascending: false });

  if (filters?.statuses?.length) {
    query = query.in("status", filters.statuses);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Inquiry[];
};

export const updateInquiryStatus = async (id: string, status: InquiryStatus) => {
  const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
  if (error) throw error;
  return { success: true };
};

export const updateInquiryInternalNotes = async (id: string, internalNotes: string) => {
  const { error } = await supabase.from("inquiries").update({ internal_notes: internalNotes }).eq("id", id);
  if (error) throw error;
  return { success: true };
};

export const getInquiryStats = async () => {
  const { data, error } = await supabase.from("inquiries").select("status");
  if (error) throw error;

  const rows = data ?? [];
  return {
    total: rows.length,
    new: rows.filter((r) => r.status === "new").length,
    leads: rows.filter((r) => LEAD_STATUSES.includes(r.status)).length,
    won: rows.filter((r) => r.status === "won").length,
    lost: rows.filter((r) => r.status === "lost").length,
  };
};

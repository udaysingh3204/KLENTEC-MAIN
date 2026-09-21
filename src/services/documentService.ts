import { supabase } from "@/lib/supabase";

export type DocumentCategory = "sop" | "prd" | "bill" | "contract" | "report" | "policy" | "other";

export interface AdminDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  description: string | null;
  tags: string[];
  file_path: string;
  file_name: string;
  file_size: number | null;
  mime_type: string | null;
  uploaded_by: string | null;
  created_at: string;
}

const BUCKET = "documents";

export const uploadDocument = async (params: {
  title: string;
  category: DocumentCategory;
  description?: string;
  tags?: string[];
  file: File;
}) => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id;

  const ext = params.file.name.includes(".") ? params.file.name.split(".").pop() : "";
  const path = `${crypto.randomUUID()}${ext ? `.${ext}` : ""}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, params.file);
  if (uploadError) throw new Error(`Failed to upload file: ${uploadError.message}`);

  const { data, error } = await supabase
    .from("documents")
    .insert([
      {
        title: params.title,
        category: params.category,
        description: params.description || null,
        tags: params.tags || [],
        file_path: path,
        file_name: params.file.name,
        file_size: params.file.size,
        mime_type: params.file.type || null,
        uploaded_by: userId,
      },
    ])
    .select();

  if (error) {
    // Roll back the uploaded file if the metadata insert fails
    await supabase.storage.from(BUCKET).remove([path]);
    throw new Error(`Failed to save document: ${error.message}`);
  }

  return data?.[0] as AdminDocument;
};

export const getDocuments = async (filters?: { category?: DocumentCategory }) => {
  let query = supabase.from("documents").select("*").order("created_at", { ascending: false });
  if (filters?.category) query = query.eq("category", filters.category);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as AdminDocument[];
};

export const getDocumentDownloadUrl = async (filePath: string) => {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(filePath, 60 * 5);
  if (error) throw error;
  return data.signedUrl;
};

export const deleteDocument = async (doc: AdminDocument) => {
  await supabase.storage.from(BUCKET).remove([doc.file_path]);
  const { error } = await supabase.from("documents").delete().eq("id", doc.id);
  if (error) throw error;
  return { success: true };
};

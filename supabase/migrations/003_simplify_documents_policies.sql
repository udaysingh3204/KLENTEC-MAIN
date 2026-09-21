-- ============================================================
-- KLENTEC — Simplify Documents module security
-- Run this once in the Supabase SQL editor.
--
-- Why: the original policies (in 001_documents.sql) gated documents on
-- public.profiles.role = 'admin'. Diagnostics showed public.profiles
-- currently has RLS enabled but zero policies, so it silently blocks
-- everyone, including a user reading their own row. Meanwhile
-- inquiries/reviews already work in production without depending on
-- profiles at all. This migration drops the profiles-based checks and
-- gates documents/storage on "authenticated" instead — the same trust
-- boundary the rest of the admin panel already relies on (only
-- /admin/login can create an authenticated session).
-- ============================================================

drop policy if exists "Admins can do all on documents" on public.documents;
drop policy if exists "Admins can read document files" on storage.objects;
drop policy if exists "Admins can upload document files" on storage.objects;
drop policy if exists "Admins can delete document files" on storage.objects;

create policy "Authenticated can do all on documents"
  on public.documents for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can read document files"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'documents');

create policy "Authenticated can upload document files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'documents');

create policy "Authenticated can delete document files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'documents');

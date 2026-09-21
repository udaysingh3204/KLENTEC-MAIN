-- ============================================================
-- KLENTEC — Admin Documents module
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query → Run)
-- ============================================================

-- ── Documents (SOPs, PRDs, bills, contracts, reports, etc.) ────
create table if not exists public.documents (
  id          uuid default gen_random_uuid() primary key,
  title       text not null,
  category    text not null default 'other'
              check (category in ('sop', 'prd', 'bill', 'contract', 'report', 'policy', 'other')),
  description text,
  tags        text[] default '{}',
  file_path   text not null,
  file_name   text not null,
  file_size   integer,
  mime_type   text,
  uploaded_by uuid references public.profiles(id),
  created_at  timestamptz default now()
);
alter table public.documents enable row level security;

create policy "Admins can do all on documents"
  on public.documents for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ── Internal notes on inquiries (admin-only follow-up notes,
--    separate from the customer's own submitted message) ──────
alter table public.inquiries add column if not exists internal_notes text;

-- ── Storage bucket for document files ───────────────────────────
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

create policy "Admins can read document files"
  on storage.objects for select
  using (
    bucket_id = 'documents'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admins can upload document files"
  on storage.objects for insert
  with check (
    bucket_id = 'documents'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admins can delete document files"
  on storage.objects for delete
  using (
    bucket_id = 'documents'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

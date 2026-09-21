-- ============================================================
-- KLENTEC — Lock down admin data to named accounts + fix profiles
-- Run this once in the Supabase SQL editor.
--
-- What this does and why:
--
-- 1. Creates public.is_admin() — a single source of truth that checks
--    the CALLER'S OWN authenticated email against an explicit allowlist.
--    This matters because Supabase's public sign-up is still open on
--    this project: right now, anyone who found the public anon key
--    could self-register and, as a merely "authenticated" user, read
--    Documents and Inquiries (customer names, emails, phones, budgets).
--    Gating on is_admin() closes that regardless of whether public
--    sign-up ever gets disabled in the dashboard.
--
--    To add a teammate later: add their email to the array in
--    is_admin() below and re-run just that CREATE OR REPLACE FUNCTION.
--
-- 2. Fixes public.profiles — it currently has RLS enabled with ZERO
--    policies (leftover from earlier experiments), which silently
--    blocks everyone, including a user viewing their own row. Restores
--    sane self-view/self-update + admin-view-all policies.
--
-- 3. Re-points documents + storage.objects at is_admin() instead of
--    the weaker "any authenticated user" from 003.
--
-- 4. Locks down inquiries (SELECT/UPDATE) to is_admin() — the public
--    "anyone can insert" policy stays, since the contact form and
--    exit-intent popup must keep working for anonymous visitors.
--
-- 5. Locks down reviews (UPDATE/DELETE) to is_admin(). Verified live:
--    right now ANY anonymous visitor — no login at all — can delete
--    any review via the public API. Public insert (review form) and
--    public select (testimonials page) stay open on purpose.
-- ============================================================

-- ── 1. Admin allowlist ──────────────────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(auth.jwt() ->> 'email', '') in ('hello@klentec.com', 'udaysingh@klentec.com');
$$;

-- ── 2. Fix public.profiles ───────────────────────────────────────
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Admins can view all profiles" on public.profiles;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin());

-- ── 3. Re-point documents + storage at the allowlist ─────────────
drop policy if exists "Authenticated can do all on documents" on public.documents;
drop policy if exists "Authenticated can read document files" on storage.objects;
drop policy if exists "Authenticated can upload document files" on storage.objects;
drop policy if exists "Authenticated can delete document files" on storage.objects;

create policy "Admins can do all on documents"
  on public.documents for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can read document files"
  on storage.objects for select
  using (bucket_id = 'documents' and public.is_admin());

create policy "Admins can upload document files"
  on storage.objects for insert
  with check (bucket_id = 'documents' and public.is_admin());

create policy "Admins can delete document files"
  on storage.objects for delete
  using (bucket_id = 'documents' and public.is_admin());

-- ── 4. Lock down inquiries to the allowlist (keep public insert) ─
alter table public.inquiries enable row level security;

drop policy if exists "Anyone can insert inquiries" on public.inquiries;
drop policy if exists "Admins can view all inquiries" on public.inquiries;
drop policy if exists "Admins can update inquiries" on public.inquiries;

create policy "Anyone can insert inquiries"
  on public.inquiries for insert
  with check (true);

create policy "Admins can view all inquiries"
  on public.inquiries for select
  using (public.is_admin());

create policy "Admins can update inquiries"
  on public.inquiries for update
  using (public.is_admin());

-- ── 5. Lock down reviews (keep public insert + select) ───────────
alter table public.reviews enable row level security;

drop policy if exists "Anyone can insert reviews" on public.reviews;
drop policy if exists "Anyone can view reviews" on public.reviews;
drop policy if exists "Admins can update reviews" on public.reviews;
drop policy if exists "Admins can delete reviews" on public.reviews;

create policy "Anyone can insert reviews"
  on public.reviews for insert
  with check (true);

create policy "Anyone can view reviews"
  on public.reviews for select
  using (true);

create policy "Admins can update reviews"
  on public.reviews for update
  using (public.is_admin());

create policy "Admins can delete reviews"
  on public.reviews for delete
  using (public.is_admin());

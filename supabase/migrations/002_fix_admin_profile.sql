-- ============================================================
-- KLENTEC — Fix missing admin profile row
-- Run this once in the Supabase SQL editor.
--
-- Why: the Documents module's security policies check
-- public.profiles.role = 'admin' (matching the same pattern already
-- used for inquiries/clients/projects in schema.sql). The admin
-- login account (hello@klentec.com) has no row in public.profiles at
-- all, so that check fails for the new Documents feature specifically.
-- This makes the account a proper admin the same way the original
-- schema.sql intended.
-- ============================================================

insert into public.profiles (id, email, full_name, role)
select id, email, 'KLENTEC Admin', 'admin'
from auth.users
where email in ('hello@klentec.com', 'udaysingh@klentec.com')
on conflict (id) do update set role = 'admin';

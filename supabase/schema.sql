-- ============================================================
-- KLENTEC V2 — Supabase Schema
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor)
-- ============================================================

-- ── Profiles (extends auth.users) ───────────────────────────
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text unique not null,
  full_name   text,
  role        text not null default 'client' check (role in ('admin', 'client')),
  company     text,
  phone       text,
  avatar_url  text,
  created_at  timestamptz default now()
);
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'client')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Inquiries (contact form submissions) ────────────────────
create table if not exists public.inquiries (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  company     text,
  email       text not null,
  whatsapp    text,
  link        text,
  services    text,
  stage       text,
  about       text,
  goal        text,
  budget      text,
  timeline    text,
  deadline    text,
  source      text,
  notes       text,
  status      text not null default 'new'
              check (status in ('new', 'contacted', 'proposal_sent', 'won', 'lost')),
  created_at  timestamptz default now()
);
alter table public.inquiries enable row level security;

create policy "Anyone can insert inquiries"
  on public.inquiries for insert with check (true);

create policy "Admins can view all inquiries"
  on public.inquiries for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins can update inquiries"
  on public.inquiries for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ── Clients ─────────────────────────────────────────────────
create table if not exists public.clients (
  id              uuid default gen_random_uuid() primary key,
  user_id         uuid references public.profiles(id) on delete set null,
  company         text not null,
  contact_name    text,
  contact_email   text,
  contact_phone   text,
  industry        text,
  website         text,
  status          text not null default 'active'
                  check (status in ('active', 'paused', 'completed')),
  total_billed    numeric default 0,
  notes           text,
  created_at      timestamptz default now()
);
alter table public.clients enable row level security;

create policy "Admins can do all on clients"
  on public.clients for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Clients can view own record"
  on public.clients for select
  using (user_id = auth.uid());

-- ── Projects ────────────────────────────────────────────────
create table if not exists public.projects (
  id          uuid default gen_random_uuid() primary key,
  client_id   uuid references public.clients(id) on delete cascade not null,
  title       text not null,
  description text,
  status      text not null default 'planning'
              check (status in ('planning', 'active', 'review', 'completed')),
  progress    integer not null default 0 check (progress between 0 and 100),
  start_date  date,
  due_date    date,
  created_at  timestamptz default now()
);
alter table public.projects enable row level security;

create policy "Admins can do all on projects"
  on public.projects for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Clients can view own projects"
  on public.projects for select
  using (exists (
    select 1 from public.clients c
    where c.id = projects.client_id and c.user_id = auth.uid()
  ));

-- ── Milestones ───────────────────────────────────────────────
create table if not exists public.milestones (
  id          uuid default gen_random_uuid() primary key,
  project_id  uuid references public.projects(id) on delete cascade not null,
  title       text not null,
  completed   boolean not null default false,
  due_date    date,
  created_at  timestamptz default now()
);
alter table public.milestones enable row level security;

create policy "Admins can do all on milestones"
  on public.milestones for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Clients can view own milestones"
  on public.milestones for select
  using (exists (
    select 1 from public.projects pr
    join public.clients c on c.id = pr.client_id
    where pr.id = milestones.project_id and c.user_id = auth.uid()
  ));

-- ── Deliverables ─────────────────────────────────────────────
create table if not exists public.deliverables (
  id           uuid default gen_random_uuid() primary key,
  client_id    uuid references public.clients(id) on delete cascade not null,
  project_id   uuid references public.projects(id) on delete set null,
  name         text not null,
  file_url     text not null,
  file_type    text,
  size_kb      integer,
  uploaded_by  uuid references public.profiles(id),
  created_at   timestamptz default now()
);
alter table public.deliverables enable row level security;

create policy "Admins can do all on deliverables"
  on public.deliverables for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Clients can view own deliverables"
  on public.deliverables for select
  using (exists (
    select 1 from public.clients c
    where c.id = deliverables.client_id and c.user_id = auth.uid()
  ));

-- ── Invoices ─────────────────────────────────────────────────
create table if not exists public.invoices (
  id             uuid default gen_random_uuid() primary key,
  client_id      uuid references public.clients(id) on delete cascade not null,
  invoice_number text unique not null,
  amount         numeric not null,
  currency       text not null default 'INR',
  status         text not null default 'pending'
                 check (status in ('pending', 'paid', 'overdue', 'cancelled')),
  description    text,
  due_date       date,
  paid_at        timestamptz,
  created_at     timestamptz default now()
);
alter table public.invoices enable row level security;

create policy "Admins can do all on invoices"
  on public.invoices for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Clients can view own invoices"
  on public.invoices for select
  using (exists (
    select 1 from public.clients c
    where c.id = invoices.client_id and c.user_id = auth.uid()
  ));

-- ── Messages ─────────────────────────────────────────────────
create table if not exists public.messages (
  id          uuid default gen_random_uuid() primary key,
  client_id   uuid references public.clients(id) on delete cascade not null,
  sender_id   uuid references public.profiles(id) not null,
  content     text not null,
  is_admin    boolean not null default false,
  read_at     timestamptz,
  created_at  timestamptz default now()
);
alter table public.messages enable row level security;

create policy "Admins can do all on messages"
  on public.messages for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Clients can view and insert own messages"
  on public.messages for select
  using (exists (
    select 1 from public.clients c
    where c.id = messages.client_id and c.user_id = auth.uid()
  ));

create policy "Clients can insert own messages"
  on public.messages for insert
  with check (
    sender_id = auth.uid() and
    exists (
      select 1 from public.clients c
      where c.id = messages.client_id and c.user_id = auth.uid()
    )
  );

-- ── Supabase Storage Bucket ───────────────────────────────────
-- Run this separately in the Supabase dashboard → Storage → New bucket
-- Bucket name: "deliverables", public: false

-- ── Seed: First admin user ────────────────────────────────────
-- After creating your first user via Supabase Auth (sign up at /login),
-- run this to make them admin (replace the email):
--
-- update public.profiles set role = 'admin' where email = 'admin@klentec.com';

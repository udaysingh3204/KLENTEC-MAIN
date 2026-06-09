-- ============================================================================
-- KLENTEC V2 — Complete Supabase Database Setup
-- ============================================================================
-- Run this SQL in Supabase SQL Editor to set up all tables with RLS policies
-- ============================================================================

-- ============================================================================
-- 1. PROFILES TABLE (Users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  role text NOT NULL CHECK (role IN ('admin', 'client')),
  company text,
  phone text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (id)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can insert during signup" ON public.profiles;

CREATE POLICY "Users can read their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
ON public.profiles FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can insert during signup"
ON public.profiles FOR INSERT
WITH CHECK (true);

-- ============================================================================
-- 2. CLIENTS TABLE (Company/Client Records)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  company text NOT NULL,
  contact_name text,
  contact_email text,
  contact_phone text,
  industry text,
  website text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  total_billed numeric DEFAULT 0,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own client" ON public.clients;
DROP POLICY IF EXISTS "Admins can read all clients" ON public.clients;
DROP POLICY IF EXISTS "Users can insert own client" ON public.clients;
DROP POLICY IF EXISTS "Users can update own client" ON public.clients;
DROP POLICY IF EXISTS "Admins can insert clients" ON public.clients;

CREATE POLICY "Users can read their own client"
ON public.clients FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Admins can read all clients"
ON public.clients FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can insert clients"
ON public.clients FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Users can update their own client"
ON public.clients FOR UPDATE
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- 3. PROJECTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'review', 'completed')),
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  start_date timestamp with time zone,
  due_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients can read their projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can read all projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can create and update projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;

CREATE POLICY "Clients can read their projects"
ON public.projects FOR SELECT
USING (EXISTS (SELECT 1 FROM public.clients WHERE id = client_id AND user_id = auth.uid()));

CREATE POLICY "Admins can read all projects"
ON public.projects FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can create and update projects"
ON public.projects FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update projects"
ON public.projects FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================================
-- 4. MILESTONES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  completed boolean DEFAULT false,
  due_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients can read project milestones" ON public.milestones;
DROP POLICY IF EXISTS "Admins can manage milestones" ON public.milestones;
DROP POLICY IF EXISTS "Admins can read all milestones" ON public.milestones;

CREATE POLICY "Clients can read project milestones"
ON public.milestones FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.projects p
  INNER JOIN public.clients c ON p.client_id = c.id
  WHERE p.id = project_id AND c.user_id = auth.uid()
));

CREATE POLICY "Admins can read all milestones"
ON public.milestones FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can manage milestones"
ON public.milestones FOR ALL
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================================
-- 5. DELIVERABLES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.deliverables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  size_kb integer,
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients can read their deliverables" ON public.deliverables;
DROP POLICY IF EXISTS "Admins can manage deliverables" ON public.deliverables;
DROP POLICY IF EXISTS "Admins can read all deliverables" ON public.deliverables;

CREATE POLICY "Clients can read their deliverables"
ON public.deliverables FOR SELECT
USING (client_id = (SELECT id FROM public.clients WHERE user_id = auth.uid()));

CREATE POLICY "Admins can read all deliverables"
ON public.deliverables FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can manage deliverables"
ON public.deliverables FOR ALL
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================================
-- 6. INVOICES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  invoice_number text NOT NULL UNIQUE,
  amount numeric NOT NULL,
  currency text DEFAULT 'INR',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  description text,
  due_date timestamp with time zone,
  paid_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients can read their invoices" ON public.invoices;
DROP POLICY IF EXISTS "Admins can manage invoices" ON public.invoices;
DROP POLICY IF EXISTS "Admins can read all invoices" ON public.invoices;

CREATE POLICY "Clients can read their invoices"
ON public.invoices FOR SELECT
USING (client_id = (SELECT id FROM public.clients WHERE user_id = auth.uid()));

CREATE POLICY "Admins can read all invoices"
ON public.invoices FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can manage invoices"
ON public.invoices FOR ALL
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================================
-- 7. MESSAGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES auth.users(id),
  content text NOT NULL,
  is_admin boolean DEFAULT false,
  read_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read messages for their client" ON public.messages;
DROP POLICY IF EXISTS "Admins can read all messages" ON public.messages;
DROP POLICY IF EXISTS "Users can send messages" ON public.messages;

CREATE POLICY "Users can read messages for their client"
ON public.messages FOR SELECT
USING (client_id = (SELECT id FROM public.clients WHERE user_id = auth.uid()));

CREATE POLICY "Admins can read all messages"
ON public.messages FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Users can send messages"
ON public.messages FOR INSERT
WITH CHECK (sender_id = auth.uid());

-- ============================================================================
-- 8. INQUIRIES TABLE (Contact Form Submissions)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  email text NOT NULL,
  whatsapp text,
  link text,
  services text,
  stage text,
  about text,
  goal text,
  budget text,
  timeline text,
  deadline text,
  source text,
  notes text,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'proposal_sent', 'won', 'lost')),
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can manage inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.inquiries;

CREATE POLICY "Admins can read inquiries"
ON public.inquiries FOR SELECT
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Anyone can submit inquiry"
ON public.inquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage inquiries"
ON public.inquiries FOR UPDATE
USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================================
-- GRANTS & PERMISSIONS
-- ============================================================================
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.clients TO authenticated;
GRANT ALL ON public.projects TO authenticated;
GRANT ALL ON public.milestones TO authenticated;
GRANT ALL ON public.deliverables TO authenticated;
GRANT ALL ON public.invoices TO authenticated;
GRANT ALL ON public.messages TO authenticated;
GRANT ALL ON public.inquiries TO authenticated;

-- ============================================================================
-- TRIGGER TO AUTO-CREATE CLIENT RECORD
-- ============================================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.user_metadata->>'full_name',
    COALESCE(NEW.user_metadata->>'role', 'client')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
    role = COALESCE(EXCLUDED.role, public.profiles.role);

  -- Auto-create client record if role is 'client'
  IF COALESCE(NEW.user_metadata->>'role', 'client') = 'client' THEN
    INSERT INTO public.clients (user_id, company, contact_name, contact_email, contact_phone)
    VALUES (
      NEW.id,
      COALESCE(NEW.user_metadata->>'company', 'My Company'),
      NEW.user_metadata->>'full_name',
      NEW.email,
      NEW.user_metadata->>'phone'
    )
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- VERIFICATION
-- ============================================================================
SELECT 'All tables created successfully!' AS status;

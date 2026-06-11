-- ============================================================================
-- KLENTEC V2 — SIMPLE FINAL RLS FIX (No Recursion)
-- ============================================================================
-- This is the simplest possible fix - drop ALL RLS and rebuild clean
-- ============================================================================

-- Step 1: Disable RLS on all tables
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverables DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies
DROP POLICY IF EXISTS "Users can read their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can insert during signup" ON public.profiles;
DROP POLICY IF EXISTS "Users can read their own client" ON public.clients;
DROP POLICY IF EXISTS "Admins can read all clients" ON public.clients;
DROP POLICY IF EXISTS "Admins can insert clients" ON public.clients;
DROP POLICY IF EXISTS "Users can update their own client" ON public.clients;
DROP POLICY IF EXISTS "Clients can read their projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can read all projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can create and update projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "Clients can read project milestones" ON public.milestones;
DROP POLICY IF EXISTS "Admins can read all milestones" ON public.milestones;
DROP POLICY IF EXISTS "Admins can manage milestones" ON public.milestones;
DROP POLICY IF EXISTS "Clients can read their deliverables" ON public.deliverables;
DROP POLICY IF EXISTS "Admins can read all deliverables" ON public.deliverables;
DROP POLICY IF EXISTS "Admins can manage deliverables" ON public.deliverables;
DROP POLICY IF EXISTS "Clients can read their invoices" ON public.invoices;
DROP POLICY IF EXISTS "Admins can read all invoices" ON public.invoices;
DROP POLICY IF EXISTS "Admins can manage invoices" ON public.invoices;
DROP POLICY IF EXISTS "Users can read messages for their client" ON public.messages;
DROP POLICY IF EXISTS "Admins can read all messages" ON public.messages;
DROP POLICY IF EXISTS "Users can send messages" ON public.messages;
DROP POLICY IF EXISTS "Admins can read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.inquiries;
DROP POLICY IF EXISTS "Admins can manage inquiries" ON public.inquiries;

-- Step 3: Drop helper function if exists
DROP FUNCTION IF EXISTS public.is_admin(uuid) CASCADE;

-- Step 4: Re-enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- Step 5: Create SIMPLE policies (no recursion, no functions)
-- ============================================================================

-- PROFILES - Simple policies without recursion
CREATE POLICY "Users can read their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can insert during signup"
ON public.profiles FOR INSERT
WITH CHECK (true);

-- CLIENTS - Simple policies
CREATE POLICY "Users can read their own client"
ON public.clients FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can update their own client"
ON public.clients FOR UPDATE
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage clients"
ON public.clients FOR ALL
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- PROJECTS - Simple policies
CREATE POLICY "Clients can read their projects"
ON public.projects FOR SELECT
USING (EXISTS (SELECT 1 FROM public.clients WHERE id = client_id AND user_id = auth.uid()));

CREATE POLICY "Admins can manage projects"
ON public.projects FOR ALL
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- MILESTONES - Simple policies
CREATE POLICY "Clients can read milestones"
ON public.milestones FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.projects p
  INNER JOIN public.clients c ON p.client_id = c.id
  WHERE p.id = project_id AND c.user_id = auth.uid()
));

CREATE POLICY "Admins can manage milestones"
ON public.milestones FOR ALL
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- DELIVERABLES - Simple policies
CREATE POLICY "Clients can read deliverables"
ON public.deliverables FOR SELECT
USING (EXISTS (SELECT 1 FROM public.clients WHERE id = client_id AND user_id = auth.uid()));

CREATE POLICY "Admins can manage deliverables"
ON public.deliverables FOR ALL
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- INVOICES - Simple policies
CREATE POLICY "Clients can read invoices"
ON public.invoices FOR SELECT
USING (EXISTS (SELECT 1 FROM public.clients WHERE id = client_id AND user_id = auth.uid()));

CREATE POLICY "Admins can manage invoices"
ON public.invoices FOR ALL
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- MESSAGES - Simple policies
CREATE POLICY "Users can read their messages"
ON public.messages FOR SELECT
USING (EXISTS (SELECT 1 FROM public.clients WHERE id = client_id AND user_id = auth.uid()));

CREATE POLICY "Admins can manage messages"
ON public.messages FOR ALL
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Authenticated users can insert messages"
ON public.messages FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- INQUIRIES - Simple policies
CREATE POLICY "Admins can manage inquiries"
ON public.inquiries FOR ALL
USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
WITH CHECK ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Anyone can submit inquiry"
ON public.inquiries FOR INSERT
WITH CHECK (true);

-- ============================================================================
-- Step 6: Verify
-- ============================================================================
SELECT 'RLS policies rebuilt successfully! ✅' AS status;

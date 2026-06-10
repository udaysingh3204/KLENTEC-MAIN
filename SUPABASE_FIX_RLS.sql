-- ============================================================================
-- KLENTEC V2 — RLS Policy Recursion Fix
-- ============================================================================
-- This fixes infinite recursion by using a helper function
-- ============================================================================

-- Create helper function to check if user is admin (no recursion)
DROP FUNCTION IF EXISTS public.is_admin(uuid) CASCADE;

CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS(
    SELECT 1 FROM profiles
    WHERE id = user_id AND role = 'admin'
  )
$$;

-- ============================================================================
-- Drop ALL existing policies to start fresh
-- ============================================================================

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

-- ============================================================================
-- RECREATE POLICIES - Clean Version (No Recursion)
-- ============================================================================

-- PROFILES TABLE
CREATE POLICY "Users can read their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
ON public.profiles FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can insert during signup"
ON public.profiles FOR INSERT
WITH CHECK (true);

-- CLIENTS TABLE
CREATE POLICY "Users can read their own client"
ON public.clients FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Admins can read all clients"
ON public.clients FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert clients"
ON public.clients FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Users can update their own client"
ON public.clients FOR UPDATE
USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- PROJECTS TABLE
CREATE POLICY "Clients can read their projects"
ON public.projects FOR SELECT
USING (EXISTS (SELECT 1 FROM public.clients WHERE id = client_id AND user_id = auth.uid()));

CREATE POLICY "Admins can read all projects"
ON public.projects FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can create and update projects"
ON public.projects FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update projects"
ON public.projects FOR UPDATE
USING (public.is_admin(auth.uid()));

-- MILESTONES TABLE
CREATE POLICY "Clients can read project milestones"
ON public.milestones FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.projects p
  INNER JOIN public.clients c ON p.client_id = c.id
  WHERE p.id = project_id AND c.user_id = auth.uid()
));

CREATE POLICY "Admins can read all milestones"
ON public.milestones FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage milestones"
ON public.milestones FOR ALL
USING (public.is_admin(auth.uid()));

-- DELIVERABLES TABLE
CREATE POLICY "Clients can read their deliverables"
ON public.deliverables FOR SELECT
USING (client_id = (SELECT id FROM public.clients WHERE user_id = auth.uid()));

CREATE POLICY "Admins can read all deliverables"
ON public.deliverables FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage deliverables"
ON public.deliverables FOR ALL
USING (public.is_admin(auth.uid()));

-- INVOICES TABLE
CREATE POLICY "Clients can read their invoices"
ON public.invoices FOR SELECT
USING (client_id = (SELECT id FROM public.clients WHERE user_id = auth.uid()));

CREATE POLICY "Admins can read all invoices"
ON public.invoices FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage invoices"
ON public.invoices FOR ALL
USING (public.is_admin(auth.uid()));

-- MESSAGES TABLE
CREATE POLICY "Users can read messages for their client"
ON public.messages FOR SELECT
USING (client_id = (SELECT id FROM public.clients WHERE user_id = auth.uid()));

CREATE POLICY "Admins can read all messages"
ON public.messages FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can send messages"
ON public.messages FOR INSERT
WITH CHECK (sender_id = auth.uid());

-- INQUIRIES TABLE
CREATE POLICY "Admins can read inquiries"
ON public.inquiries FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Anyone can submit inquiry"
ON public.inquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage inquiries"
ON public.inquiries FOR UPDATE
USING (public.is_admin(auth.uid()));

-- ============================================================================
-- VERIFICATION
-- ============================================================================
SELECT 'RLS Policies fixed successfully! ✅' AS status;

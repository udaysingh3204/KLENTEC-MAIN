-- ============================================================================
-- KLENTEC V2 — Sample Data for Testing (OPTIONAL)
-- ============================================================================
-- Run this AFTER SUPABASE_SETUP.sql to populate test data
-- WARNING: This is for testing only. Clear this data before going live.
-- ============================================================================

-- Get the current authenticated user's ID (replace with actual user_id after signup)
-- For testing: Create a test client with projects, invoices, etc.

-- Note: Replace 'YOUR_CLIENT_USER_ID' with the actual user ID after a test user signs up

-- Example test data insertion:
-- Assuming you have a client user with ID: 11111111-1111-1111-1111-111111111111

-- 1. Create test projects
INSERT INTO public.projects (client_id, title, description, status, progress, start_date, due_date)
SELECT
  c.id,
  'Website Redesign',
  'Complete overhaul of the company website with modern design and improved UX',
  'active',
  65,
  NOW() - INTERVAL '30 days',
  NOW() + INTERVAL '30 days'
FROM public.clients c
LIMIT 1;

INSERT INTO public.projects (client_id, title, description, status, progress, start_date, due_date)
SELECT
  c.id,
  'SEO Optimization',
  'Comprehensive SEO strategy and implementation to improve organic search rankings',
  'planning',
  20,
  NOW(),
  NOW() + INTERVAL '60 days'
FROM public.clients c
LIMIT 1;

INSERT INTO public.projects (client_id, title, description, status, progress, start_date, due_date)
SELECT
  c.id,
  'Marketing Automation',
  'Set up automated email campaigns and lead nurturing workflows',
  'review',
  85,
  NOW() - INTERVAL '60 days',
  NOW() + INTERVAL '5 days'
FROM public.clients c
LIMIT 1;

-- 2. Create milestones for the first project
INSERT INTO public.milestones (project_id, title, completed, due_date)
SELECT
  p.id,
  'Design Wireframes',
  true,
  p.start_date + INTERVAL '10 days'
FROM public.projects p
WHERE p.title = 'Website Redesign'
LIMIT 1;

INSERT INTO public.milestones (project_id, title, completed, due_date)
SELECT
  p.id,
  'Frontend Development',
  true,
  p.start_date + INTERVAL '25 days'
FROM public.projects p
WHERE p.title = 'Website Redesign'
LIMIT 1;

INSERT INTO public.milestones (project_id, title, completed, due_date)
SELECT
  p.id,
  'Backend Integration',
  false,
  p.due_date - INTERVAL '5 days'
FROM public.projects p
WHERE p.title = 'Website Redesign'
LIMIT 1;

-- 3. Create invoices
INSERT INTO public.invoices (client_id, invoice_number, amount, status, description, due_date)
SELECT
  c.id,
  'INV-2024-001',
  150000,
  'paid',
  'Website Redesign Phase 1',
  NOW() - INTERVAL '10 days'
FROM public.clients c
LIMIT 1;

INSERT INTO public.invoices (client_id, invoice_number, amount, status, description, due_date)
SELECT
  c.id,
  'INV-2024-002',
  75000,
  'pending',
  'SEO Strategy Development',
  NOW() + INTERVAL '15 days'
FROM public.clients c
LIMIT 1;

INSERT INTO public.invoices (client_id, invoice_number, amount, status, description, due_date)
SELECT
  c.id,
  'INV-2024-003',
  100000,
  'overdue',
  'Marketing Automation Setup',
  NOW() - INTERVAL '5 days'
FROM public.clients c
LIMIT 1;

-- 4. Create deliverables
INSERT INTO public.deliverables (client_id, project_id, name, file_url, file_type, size_kb)
SELECT
  c.id,
  p.id,
  'Website Design Mockup.pdf',
  'https://example.com/deliverables/website-mockup.pdf',
  'pdf',
  2500
FROM public.clients c
CROSS JOIN public.projects p
WHERE p.title = 'Website Redesign'
LIMIT 1;

INSERT INTO public.deliverables (client_id, project_id, name, file_url, file_type, size_kb)
SELECT
  c.id,
  p.id,
  'Frontend Code Repository',
  'https://github.com/example/repo',
  'code',
  NULL
FROM public.clients c
CROSS JOIN public.projects p
WHERE p.title = 'Website Redesign'
LIMIT 1;

INSERT INTO public.deliverables (client_id, project_id, name, file_url, file_type, size_kb)
SELECT
  c.id,
  p.id,
  'SEO Report - Q1 2024.xlsx',
  'https://example.com/deliverables/seo-report-q1.xlsx',
  'pdf',
  1500
FROM public.clients c
CROSS JOIN public.projects p
WHERE p.title = 'SEO Optimization'
LIMIT 1;

-- 5. Create sample messages (from admin to client)
INSERT INTO public.messages (client_id, sender_id, content, is_admin, read_at)
SELECT
  c.id,
  (SELECT id FROM auth.users LIMIT 1),
  'Hi! Your Website Redesign project is progressing well. We''ve completed the frontend development and are now working on backend integration.',
  true,
  NOW() - INTERVAL '2 days'
FROM public.clients c
LIMIT 1;

INSERT INTO public.messages (client_id, sender_id, content, is_admin, read_at)
SELECT
  c.id,
  (SELECT id FROM auth.users LIMIT 1),
  'We''ve uploaded the final design mockup to your deliverables. Please review and let us know if any changes are needed.',
  true,
  NULL
FROM public.clients c
LIMIT 1;

INSERT INTO public.messages (client_id, sender_id, content, is_admin, read_at)
SELECT
  c.id,
  (SELECT id FROM auth.users LIMIT 1),
  'The SEO optimization project is scheduled to start next week. We''ll begin with a comprehensive site audit.',
  true,
  NULL
FROM public.clients c
LIMIT 1;

-- Verify data was inserted
SELECT 'Test data loaded successfully!' AS status;
SELECT COUNT(*) as projects FROM public.projects;
SELECT COUNT(*) as invoices FROM public.invoices;
SELECT COUNT(*) as milestones FROM public.milestones;
SELECT COUNT(*) as deliverables FROM public.deliverables;
SELECT COUNT(*) as messages FROM public.messages;

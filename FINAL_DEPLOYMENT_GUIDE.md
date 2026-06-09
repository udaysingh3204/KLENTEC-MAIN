# 🚀 KLENTEC V2 — Final Deployment Guide

**Status**: Dev server running on `http://localhost:8083`

---

## Phase 1: Database Migration (CRITICAL - Do This First)

### Step 1: Run the Complete Schema Migration
1. Go to **Supabase Dashboard** → **SQL Editor**
2. Create a **New Query**
3. **Copy the ENTIRE contents** from: `SUPABASE_SETUP.sql`
4. Click **Run** (should complete without errors)
5. Verify output shows: "All tables created successfully!"

**This step creates:**
- ✅ `profiles` table with RLS policies
- ✅ `clients` table (links users to their client records)
- ✅ `projects`, `milestones`, `deliverables`, `invoices`, `messages`, `inquiries` tables
- ✅ Auto-trigger that creates profile + client record on signup
- ✅ All RLS policies for role-based access

**⚠️ IMPORTANT**: This migration fixes the dashboard data loading issue. Without it, the client dashboard will show empty states.

---

## Phase 2: Optional - Add Sample Data (For Testing)

If you want to see the dashboard with sample data:

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Create a **New Query**
3. Copy contents from: `SUPABASE_SAMPLE_DATA.sql`
4. Click **Run**

This populates:
- 3 test projects with milestones
- 3 test invoices
- Sample deliverables and messages

⚠️ **Clear this data before going live** — it's for testing only.

---

## Phase 3: Test the Complete Flows Locally

### Test 1: Client Signup Flow
1. Open: `http://localhost:8083/login`
2. Click **Client** tab
3. Fill in:
   - Email: `testclient@gmail.com`
   - Full Name: `Test Client`
   - Password: `TestPass123!`
4. Click **Sign Up**
5. **Expected**: Auto-redirect to `/client` dashboard
6. **Verify**:
   - Sidebar shows: Dashboard, My Projects, Deliverables, Invoices, Messages
   - Dashboard shows: Welcome greeting, project/invoice counts
   - Projects page loads (may be empty if no sample data)

### Test 2: Client Login Flow
1. On `/login`, Client tab
2. Sign in with: `testclient@gmail.com` / `TestPass123!`
3. **Expected**: Auto-redirect to `/client` dashboard
4. **Verify**: All pages load without errors

### Test 3: Admin Login & Deliverables
1. On `/login`, Admin tab
2. Sign in with: `admin@klentec.com` / `AdminPass123!`
3. **Expected**: Auto-redirect to `/admin` dashboard
4. **Verify**:
   - Sidebar shows: Dashboard, Inquiries, Messages, Clients, Projects, Deliverables, Invoices
   - Click "Deliverables" → file upload form loads
   - Try uploading a test file

### Test 4: Contact Form Submission
1. Navigate to: `http://localhost:8083/contact`
2. Fill all 4 steps with test data
3. Submit
4. **Expected**: Success message appears
5. **Verify**: 
   - Check Supabase: `inquiries` table should have new row
   - Check browser console: No errors
   - Email may not arrive (needs EmailJS setup for transactional emails)

### Test 5: Role-Based Access Control
1. Sign in as **client**
2. Try accessing `/admin` → should redirect to `/client`
3. Sign out
4. Try accessing `/client` without auth → should redirect to `/login`
5. Sign in as **admin**
6. Try accessing `/client` → should redirect to `/admin`

---

## Phase 4: Critical Verifications Before Deploying

### Database Schema
- [ ] Run SUPABASE_SETUP.sql successfully
- [ ] All tables created (check Supabase → Tables)
- [ ] RLS policies enabled (check each table's policies)

### Authentication Flows
- [ ] Client signup works → creates profile + clients record
- [ ] Client login works → redirects to dashboard
- [ ] Admin login works → redirects to admin dashboard
- [ ] Logout works → redirects to login
- [ ] Protected routes enforce role-based access

### Dashboard Data Loading
- [ ] Client dashboard shows project/invoice counts (not empty skeletons)
- [ ] Projects page displays project cards with progress bars
- [ ] Invoices page shows invoice list
- [ ] Deliverables page allows file uploads
- [ ] Messages page shows conversation list

### Content & UI
- [ ] Homepage loads with all sections visible
- [ ] Work page shows 12 case studies
- [ ] All images/icons load correctly
- [ ] No console errors (F12 → Console tab)
- [ ] Responsive design works on mobile

---

## Phase 5: Deploy to Production

### Option A: Vercel (Recommended)
```bash
npm install -g vercel
vercel
# Follow prompts
# Set environment variables in Vercel dashboard:
VITE_SUPABASE_URL=https://your-instance.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_HELLO=...
VITE_EMAILJS_SERVICE_ADMIN=...
VITE_EMAILJS_TEMPLATE_INQUIRY=...
VITE_EMAILJS_TEMPLATE_ADMIN=...
```

### Option B: Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
# Add environment variables in Netlify dashboard
```

---

## Phase 6: Post-Deployment Testing

After deploying to production:

1. **Test signup on live domain** → should work and redirect
2. **Test login** → should load dashboard with real data
3. **Test contact form** → should submit successfully
4. **Check browser console** → no errors
5. **Test on mobile** → responsive design should work
6. **Admin dashboard** → can upload deliverables, see messages

---

## 🎯 Quick Checklist

```
Database Setup
- [ ] Ran SUPABASE_SETUP.sql
- [ ] All 8 tables created
- [ ] RLS policies enabled
- [ ] Trigger auto-creates client records

Local Testing
- [ ] Client signup → dashboard loaded ✅
- [ ] Client login → dashboard loaded ✅
- [ ] Admin login → admin dashboard loaded ✅
- [ ] Contact form → submitted successfully ✅
- [ ] No console errors

Build & Deploy
- [ ] npm run build succeeds
- [ ] Deployed to Vercel/Netlify
- [ ] Environment variables set
- [ ] Live domain works

Content
- [ ] 12 case studies visible on /work
- [ ] 6 audit points visible on growth audit section
- [ ] Real client logos in marquee
- [ ] All sections load without errors
```

---

## ⚠️ Common Issues & Fixes

### Issue: "Account isn't linked to a client record yet"
**Cause**: User profile exists but clients record wasn't created
**Fix**: Run `SUPABASE_SETUP.sql` again to enable trigger, then new signups will auto-create clients record

### Issue: Dashboard shows empty skeleton screens
**Cause**: RLS policies blocking queries
**Fix**: 
1. Verify RLS policies are enabled on all tables
2. Run SUPABASE_SETUP.sql with latest version
3. Check that client's user_id matches in clients table

### Issue: Signup succeeds but no redirect
**Cause**: Profile loading delay
**Fix**: Verify AuthContext is waiting for profile to load before redirecting

### Issue: Contact form doesn't submit
**Cause**: EmailJS not configured or missing env variables
**Fix**: Add VITE_EMAILJS_* keys to .env.local, or check EmailJS dashboard for errors

### Issue: Admin can't upload deliverables
**Cause**: Missing files table or RLS policy issue
**Fix**: Run SUPABASE_SETUP.sql to create deliverables table and policies

---

## 📊 Database Schema Overview

```
profiles (auth users)
  ├─ id (uuid, PK)
  ├─ email, full_name, role, company
  └─ RLS: Users read own, admins read all

clients (linked to users)
  ├─ id (uuid, PK)
  ├─ user_id (FK to profiles)
  ├─ company, contact_*, industry, status
  └─ RLS: Users read own, admins read all

projects
  ├─ id (uuid, PK)
  ├─ client_id (FK)
  ├─ title, description, status, progress
  └─ RLS: Clients read own, admins read all

milestones
  ├─ id (uuid, PK)
  ├─ project_id (FK)
  ├─ title, completed, due_date
  └─ RLS: Clients read own projects' milestones, admins read all

deliverables
  ├─ id (uuid, PK)
  ├─ client_id (FK), project_id (FK)
  ├─ name, file_url, file_type, size_kb
  └─ RLS: Clients read own, admins read all

invoices
  ├─ id (uuid, PK)
  ├─ client_id (FK)
  ├─ invoice_number, amount, status, due_date
  └─ RLS: Clients read own, admins read all

messages
  ├─ id (uuid, PK)
  ├─ client_id (FK), sender_id (FK)
  ├─ content, is_admin, read_at
  └─ RLS: Users read own, admins read all

inquiries (contact form)
  ├─ id (uuid, PK)
  ├─ name, company, email, services
  ├─ status, created_at
  └─ RLS: Anyone can submit, admins can read/update
```

---

## 🚀 You're Ready!

1. **Run SUPABASE_SETUP.sql** ← Start here
2. **Test locally** → http://localhost:8083
3. **Deploy** → Vercel or Netlify
4. **Go live** → Your live domain

**Questions?** Check the environment variables in `.env.local` match your Supabase instance.

---

**Last Updated**: 2026-06-05
**Dev Server**: http://localhost:8083
**Production Ready**: ✅ Yes, after running migrations

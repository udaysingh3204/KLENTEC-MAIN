# 🚀 KLENTEC V2 — Production Deployment Checklist

## Phase 1: Supabase Database Setup (CRITICAL - Do This First!)

### Step 1: Run SQL Migration
1. Go to **Supabase Dashboard → SQL Editor**
2. Create **New Query**
3. Copy & paste entire content from: `SUPABASE_SETUP.sql`
4. Click **Run** (should complete without errors)
5. Verify output shows: "Profiles table ready for auth!"

**This step MUST complete before testing auth flows.**

---

## Phase 2: Local Testing (Verify Everything Works)

### Test 1: Client Signup & Redirect ✅
```bash
npm run dev
# Navigate to http://localhost:8080/login
# Client tab → Sign up
# Email: testuser@gmail.com
# Full Name: Test User
# Password: TestPass123!
# Expected: Redirects to /client dashboard immediately
```

### Test 2: Client Login ✅
```bash
# Stay on /login, Client tab
# Sign in with same email/password
# Expected: Redirects to /client dashboard
# Check: Sidebar shows "Dashboard, Projects, Deliverables, Invoices, Messages"
```

### Test 3: Admin Login ✅
```bash
# /login → Admin tab
# Sign in with admin@klentec.com credentials
# Expected: Redirects to /admin dashboard
# Check: Admin sidebar shows "Dashboard, Inquiries, Messages, Clients, Projects, Deliverables, Invoices"
```

### Test 4: Contact Form (No Email Verification Yet) ✅
```bash
# Navigate to http://localhost:8080/contact
# Fill all 4 steps of the form
# Submit
# Expected: Success message "Thank you..."
# Check Supabase: inquiries table should have new row
# Check Console: No JavaScript errors
```

### Test 5: Role-Based Access Control ✅
```bash
# Sign in as client
# Try accessing /admin → Should redirect to /client
# Sign out
# Try accessing /client without auth → Should redirect to /login
```

---

## Phase 3: Environment Variables Verification

### Check `.env.local` has all these keys:
```env
VITE_SUPABASE_URL=https://nxngvwhgoydmmfmqlpcy.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_O592LkDu4Qs0e2nO9Yet1g_9oqo9bo0
VITE_EMAILJS_PUBLIC_KEY=VVNcVx-aYti4QLeT0
VITE_EMAILJS_SERVICE_HELLO=service_m5wusox
VITE_EMAILJS_SERVICE_ADMIN=service_m5wusox
VITE_EMAILJS_TEMPLATE_INQUIRY=template_tyb8hx8
VITE_EMAILJS_TEMPLATE_ADMIN=template_7xnx955
```

---

## Phase 4: Build for Production

```bash
npm run build

# Verify build succeeds with zero errors:
# ✓ 2181 modules transformed.
# ✓ built in 2.00s
```

---

## Phase 5: Deploy to Hosting

### Option A: Vercel (Recommended for React)
```bash
npm install -g vercel
vercel
# Follow prompts:
# → Connect GitHub repo
# → Select framework: Next.js (or Vite)
# → Set environment variables (copy from .env.local)
# → Deploy
```

### Option B: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
# Add environment variables in Netlify dashboard
```

### Option C: Your Own Server
```bash
# Build
npm run build

# Serve the dist folder with any static host (nginx, Apache, etc)
# For testing locally:
npm run preview
```

---

## Phase 6: Post-Deployment Verification

### After deploying to production, test all flows on live domain:

1. **Client Signup** → Redirects to dashboard ✅
2. **Client Login** → Redirects to dashboard ✅
3. **Admin Login** → Redirects to admin dashboard ✅
4. **Contact Form** → Submits and appears in Supabase inquiries ✅
5. **Admin Deliverables** → Can upload files, clients can see them ✅
6. **Admin Notification Bell** → Shows new inquiries ✅

---

## Phase 7: Email Setup (Optional - For Production)

Currently, EmailJS is configured but sending emails will only work if you've:
1. ✅ Created EmailJS account
2. ✅ Connected Gmail services
3. ✅ Created email templates
4. ✅ Updated .env with credentials

**If emails aren't sending:**
- Check EmailJS dashboard for error logs
- Verify Gmail account has "Less secure apps" enabled or use app-specific password
- Check console for EmailJS errors

---

## 🎯 Quick Deployment Steps (TL;DR)

```bash
# 1. Run SQL migration in Supabase (CRITICAL)
# → Copy SUPABASE_SETUP.sql to Supabase SQL Editor and Run

# 2. Test locally
npm run dev
# Test signup/login/contact form

# 3. Build
npm run build

# 4. Deploy
vercel  # or netlify deploy --prod --dir=dist

# 5. Set env variables on hosting platform

# 6. Test live domain
```

---

## ⚠️ Common Issues & Fixes

### Issue: "Invalid login credentials" after signin
**Fix:** Run `SUPABASE_SETUP.sql` in Supabase → enables RLS policies

### Issue: Signup creates user but doesn't redirect
**Fix:** Check browser console for errors. Likely RLS policy issue on profiles table.

### Issue: EmailJS emails not sending
**Fix:** Check EmailJS dashboard, verify service IDs and template IDs are correct in `.env.local`

### Issue: Admin/Client can access each other's dashboard
**Fix:** ProtectedRoute component should enforce role checks. Check `src/components/ProtectedRoute.tsx`

---

## ✅ Before Going Live Checklist

- [ ] Ran SUPABASE_SETUP.sql in Supabase
- [ ] Tested client signup → redirects to dashboard
- [ ] Tested admin login → redirects to admin dashboard
- [ ] Tested contact form submission
- [ ] npm run build succeeds (zero errors)
- [ ] .env.local has all 7 keys configured
- [ ] Deployed to Vercel/Netlify/hosting
- [ ] Set environment variables on hosting platform
- [ ] Tested live domain signup/login/contact form
- [ ] Admin can upload deliverables
- [ ] Clients can see deliverables
- [ ] Notification bell shows new inquiries

---

**Once all ✅ are checked, you're READY FOR PRODUCTION!**

Questions? Check the EMAIL_SETUP_GUIDE.md for email configuration details.

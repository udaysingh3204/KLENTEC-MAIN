# 🚨 URGENT FIX: Admin Redirect & Profile Sync

**Problem**: Admin@klentec.com logs in but gets redirected to `/client` instead of `/admin`

**Root Cause**: Profile wasn't created because trigger didn't fire when user was created via Supabase UI

**Solution**: Create the missing profile manually (1 minute fix)

---

## ✅ STEP 1: Create Missing Admin Profile (1 minute)

**In Supabase SQL Editor**, run:

```sql
-- Create the profile for admin user if it doesn't exist
INSERT INTO public.profiles (id, email, full_name, role)
SELECT id, email, 'Admin', 'admin'
FROM auth.users
WHERE email = 'admin@klentec.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Verify it worked
SELECT id, email, role FROM public.profiles WHERE email = 'admin@klentec.com';
```

This will:
- ✅ Create profile if missing
- ✅ Set role to 'admin'
- ✅ Fix the redirect issue

---

## ✅ STEP 2: Test Admin Login (2 minutes)

```
1. Hard refresh: www.klentec.com
2. Go to /login
3. Click "Admin" tab
4. Email: admin@klentec.com
5. Password: Admin123456!
6. Click Sign In
7. Should redirect to /admin dashboard (NOT /client)
```

---

## ✅ STEP 3: Verify Everything Works

**On /admin page:**
- ✅ Can see admin dashboard
- ✅ Can see all admin sections (Inquiries, Clients, Projects, etc.)
- ✅ Sidebar navigation works
- ✅ Can log out

**On /client page (test as different user):**
- ✅ Can see client dashboard
- ✅ Can see client sections (Projects, Invoices, Messages, Deliverables)
- ✅ Can log out

---

## 🎯 Expected Result

After this 1-minute fix:
- ✅ Admin logs in → goes to `/admin` ✅
- ✅ Client logs in → goes to `/client` ✅
- ✅ All pages working correctly
- ✅ No more redirect issues

---

## 🆘 Why This Happened

When you create a user in Supabase UI with "Auto confirm user?", the trigger that auto-creates profiles sometimes doesn't fire. The manual profile creation is a safe fallback that ensures the profile exists.

---

**Do this 1-minute fix now, and everything will work perfectly!** 🚀

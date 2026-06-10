# 🔧 Google OAuth Configuration Fix

**Error**: "Access blocked: KLENTEC can only be used within its organisation"  
**Cause**: OAuth app set to "Internal" instead of "External"  
**Fix Time**: 5 minutes

---

## ✅ STEP-BY-STEP FIX

### **Step 1: Change OAuth Consent Screen to External**

```
1. Open Google Cloud Console
   → https://console.cloud.google.com/

2. Select "udaysingh3204's Project" (or your project)

3. Go to **APIs & Services** → **OAuth consent screen**

4. Click **Edit App**

5. Under "User type", select **External**

6. Click **Save and Continue**

7. Fill out any remaining fields and complete the setup
```

**What this does:**
- Changes app from organization-only to public
- Allows ANY Google account to sign in
- Required for client signups

---

### **Step 2: Update Authorized Redirect URLs**

```
1. Still in Google Cloud Console

2. Go to **APIs & Services** → **Credentials**

3. Find your **OAuth 2.0 Client ID** (Web application)

4. Click **Edit** (pencil icon)

5. Under "Authorized redirect URIs", add:
   • https://www.klentec.com/
   • https://www.klentec.com/login
   • https://nxngvwhgoydmmfmqlpcy.supabase.co/auth/v1/callback

6. **Save**
```

**What this does:**
- Tells Google where to redirect after authentication
- Enables OAuth flow to work
- Fixes the organization restriction error

---

### **Step 3: Verify in Supabase**

```
1. Open Supabase Dashboard
   → https://app.supabase.com/

2. Select your project: "Klentec Solutions"

3. Go to **Authentication** → **Providers**

4. Click **Google** and check it's enabled

5. Verify Google Client ID and Secret are filled

6. Under "Redirect URL", note the callback URL:
   https://nxngvwhgoydmmfmqlpcy.supabase.co/auth/v1/callback

7. Make sure this is added to Google Cloud Console (Step 2, item 5)
```

---

### **Step 4: Test Google OAuth**

```
1. Hard refresh: www.klentec.com

2. Click "Start Free"

3. In the login form, look for "Sign in with Google" button

4. Click it

5. Should now show Google sign-in (not the "Access blocked" error)

6. Select your Google account

7. Should redirect to /client dashboard
```

---

## 🔍 VERIFY THE FIX

After completing all steps, you should see:

✅ Google sign-in button on login page  
✅ Can click Google button without error  
✅ Redirects to Google sign-in page  
✅ Can select your Google account  
✅ Successfully redirects to /client dashboard  

---

## 📋 COMMON ISSUES & SOLUTIONS

### **Still showing "Access blocked" error?**

**Causes:**
1. OAuth consent screen still set to "Internal"
2. Redirect URI not added to Google Cloud
3. Browser cache not cleared

**Solutions:**
1. Double-check consent screen is set to "External"
2. Verify all 3 redirect URIs are added in Google Cloud
3. Hard refresh (Cmd+Shift+Delete on Mac, Ctrl+Shift+Delete on Windows)
4. Try incognito window
5. Wait 5-10 minutes for changes to propagate

---

### **Getting different error?**

**"Invalid Client ID"**
- Check Supabase has the correct Google Client ID
- Regenerate credentials in Google Cloud if needed

**"Redirect mismatch"**
- Make sure the exact URL from Supabase is in Google Cloud
- No typos or extra slashes
- Must be exact match

**"Invalid request"**
- Browser cache issue
- Clear all cookies and try again
- Try incognito window

---

## ✨ AFTER FIX IS COMPLETE

### **Users can now:**
✅ Sign in with Google account (personal or work)  
✅ Auto-creates profile on first login  
✅ Auto-creates client record  
✅ Redirects directly to /client dashboard  
✅ Emails match Google account  

### **Your system now supports:**
✅ Email/password signup and login  
✅ Google OAuth signin  
✅ Automatic account creation  
✅ Seamless authentication flow  

---

## ⏱️ Timeline

- **Configuration**: 5 minutes
- **Propagation**: 5-10 minutes
- **Testing**: 2-3 minutes

**Total**: ~15 minutes to full functionality

---

## 🎯 NEXT AFTER THIS FIX

Once Google OAuth is working:

1. Test client signup with Google
2. Test admin login
3. Test contact form
4. Verify all dashboard features work
5. Full system is LIVE and READY

---

**Important**: Make sure your personal Google account (udays3204@gmail.com) is configured as an admin in Supabase if you want to test admin login. Otherwise, any Google account will be treated as a client.

---

**Status**: Ready to implement  
**Priority**: HIGH (blocking feature)  
**Impact**: Enables Google OAuth sign-in  

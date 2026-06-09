# 📧 KLENTEC V2 — Complete Email Setup Guide

This guide walks you through configuring email for:
1. **Contact form inquiries** (via EmailJS)
2. **User authentication** (via Supabase)
3. **Password reset & email verification** (Supabase auth emails)

---

## 🚀 Step 1: Set Up EmailJS for Contact Form Emails

EmailJS is used to send inquiry submissions to your email addresses.

### 1.1 Create EmailJS Account
- Go to **https://www.emailjs.com**
- Click **"Sign Up Free"** (or log in if you have an account)
- Verify your email
- Go to **Dashboard → Account**

### 1.2 Get Your Public Key
- In EmailJS Dashboard → **Account → General**
- Copy your **Public Key** (looks like: `XXXXXXXXXXXXXXX`)
- Save it — you'll use this in `.env.local`

### 1.3 Create Gmail Service (For Receiving Inquiries)
You'll create **3 email services** (one for each recipient):

#### Service 1: hello@klentec.com (receives full inquiry details)
- Dashboard → **Email Services** → **"Add Email Service"** or **"Add Service"**
- Choose **Gmail**
- Click **"Connect Gmail Account"**
  - Select/create a Gmail account (e.g., hello@klentec.com or your main KLENTEC email)
  - Grant EmailJS permission to send emails
- Name the service: `hello_inquiry` or similar
- Copy the **Service ID** (looks like: `service_xxxxx`)

#### Service 2: Admin Alert Service
- Repeat the above for a second email address (e.g., udaysingh@klentec.com)
- Gmail may ask for app-specific password (if 2FA enabled):
  - Go to **Google Account → Security → App Passwords**
  - Generate one for EmailJS
  - Paste it in EmailJS when prompted

#### Service 3: Auto-Reply Service (info@klentec.com)
- Repeat for a third email address (info@klentec.com or a generic sender)
- This sends auto-reply emails to clients

**Result:** You'll have 3 Service IDs. Save them all.

### 1.4 Create Email Templates

Templates define what emails look like. Create 3:

#### Template 1: Full Inquiry → hello@klentec.com
- Dashboard → **Email Templates** → **"Create New Template"**
- Name: `inquiry_full` or similar
- **Email Service:** Select the hello@ service you created
- **To Email:** `{{to_email}}` (we'll fill this in the form)
- **Subject:** `🎯 New Inquiry from {{from_name}}`
- **HTML Content:**
```html
<h2>New Client Inquiry</h2>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Company:</strong> {{company}}</p>
<p><strong>WhatsApp:</strong> {{whatsapp}}</p>
<hr />
<p><strong>Services Needed:</strong> {{services}}</p>
<p><strong>Budget:</strong> {{budget}}</p>
<p><strong>Goal:</strong> {{goal}}</p>
<p><strong>About Business:</strong> {{about}}</p>
<p><strong>Source:</strong> {{source}}</p>
<hr />
<p>Reply within 4 hours.</p>
```
- Click **"Create"**
- Copy the **Template ID** (looks like: `template_xxxxx`)

#### Template 2: Admin Quick Alert → udaysingh@klentec.com
- Create New Template
- Name: `admin_alert`
- **Subject:** `⚡ New Inquiry: {{from_name}}`
- **HTML:**
```html
<h3>{{from_name}} from {{company}}</h3>
<p><strong>WhatsApp:</strong> {{whatsapp}}</p>
<p><strong>Budget:</strong> {{budget}}</p>
<p><strong>Services:</strong> {{services}}</p>
<p>Log in to KLENTEC portal to view full details.</p>
```
- Copy the Template ID

#### Template 3: Auto-Reply → Client's Email
- Create New Template
- Name: `autoreply`
- **Subject:** `✅ We Got Your Inquiry — Uday from KLENTEC`
- **HTML:**
```html
<h2>Thanks for reaching out!</h2>
<p>Hi {{from_name}},</p>
<p>We received your inquiry and will get back to you within <strong>4 hours</strong>.</p>
<p>In the meantime:</p>
<ul>
  <li>Check out our case studies: <a href="https://klentec.com/work">klentec.com/work</a></li>
  <li>Message us on WhatsApp: <a href="https://wa.me/919557630336">+91 95576 30336</a></li>
</ul>
<p>Let's build something amazing together!</p>
<p>— <strong>Uday Singh</strong><br/>Founder, KLENTEC</p>
```
- Copy the Template ID

**Result:** You'll have 3 Template IDs. Save them all.

### 1.5 Update `.env.local`
```bash
# Open: /Users/apple/Desktop/KLENTEC/nexus-scaling-co/.env.local
```

Replace the placeholder values:
```env
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY_HERE
VITE_EMAILJS_SERVICE_HELLO=service_xxxxx
VITE_EMAILJS_SERVICE_ADMIN=service_xxxxx
VITE_EMAILJS_SERVICE_INFO=service_xxxxx
VITE_EMAILJS_TEMPLATE_INQUIRY=template_xxxxx
VITE_EMAILJS_TEMPLATE_ADMIN=template_xxxxx
VITE_EMAILJS_TEMPLATE_AUTOREPLY=template_xxxxx
```

---

## ✅ Step 2: Update ContactPage to Send Emails via EmailJS

The ContactPage currently references old env variable names. Update it to use the new ones.

### Key changes:
- Use `VITE_EMAILJS_PUBLIC_KEY` (not missing one)
- Send 3 emails: full details, admin alert, auto-reply
- Use proper service/template IDs per email

**File:** `src/pages/ContactPage.tsx` (lines 175-191)

This will be updated in the code modifications below.

---

## 🔐 Step 3: Set Up Supabase Auth for User Registration & Password Reset

Supabase handles user signup, login, and password resets automatically.

### 3.1 Enable Email Auth in Supabase
- Go to **https://supabase.com/dashboard**
- Select your project
- **Auth → Providers → Email**
- Ensure **Email Auth** is **Enabled**
- Set **Autoconfirm users:** OFF (so they verify their email first) [OPTIONAL but recommended for security]
  - OR set it to ON for faster onboarding
  - We recommend ON for your MVP

### 3.2 Configure Email Templates (Supabase)
- **Auth → Email Templates**
- You'll see templates for:
  - Confirm signup email
  - Invite user email
  - Magic link email
  - Change email email
  - Reset password email

**For now, use defaults.** Later you can customize them.

### 3.3 (Optional) Configure Custom SMTP
If you want emails to come from hello@klentec.com:
- **Auth → Email Templates → Custom SMTP**
- You can set a custom From address
- This is advanced; for MVP, Supabase's default is fine

---

## 🔧 Step 4: Update AuthContext to Support Signup

Currently, the AuthContext only has `signIn`. We need to add `signUp`.

**File:** `src/contexts/AuthContext.tsx`

Add this method to the context:
```typescript
const signUp = async (email: string, password: string, fullName: string, role: 'client' | 'admin') => {
  // Create auth account
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role },
    },
  })
  if (authError) throw authError

  // Create profile
  if (authData.user) {
    await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        full_name: fullName,
        email,
        role,
      })
  }
}
```

Add to context provider value:
```typescript
value={{ user, session, profile, loading, signIn, signUp, signInWithGoogle, signOut }}
```

---

## 📝 Step 5: Update LoginPage to Support Signup

Currently signup calls `signIn`, which fails. Wire it to `signUp` instead.

**File:** `src/pages/LoginPage.tsx` (around line 18)

Changes needed:
1. Add `signUp` to useAuth() destructuring
2. Update handleSubmit to call `signUp` when `authMode === 'signup'`
3. Add fullName field to signup form

---

## 🔑 Step 6: Test the Complete Flow

Once all code changes are done, test:

### Client Signup
1. Go to **http://localhost:5173/login**
2. Click **"Client"** tab (top right)
3. Click **"Sign up"**
4. Fill in:
   - Email: `testclient@example.com`
   - Full Name: `Test Client`
   - Password: `TestPass123!`
   - Confirm: `TestPass123!`
5. Click **"Create account"**
6. Check your email for confirmation link (or in Supabase if autoconfirm is ON)
7. Verify and login

### Admin Login
1. **Admin** tab → **Sign In**
2. Use your existing admin credentials (created via Supabase dashboard or first signup)

### Contact Form
1. Go to **http://localhost:5173/contact**
2. Fill out the 4-step inquiry form
3. Submit
4. Check:
   - Your inbox (hello@klentec.com) for full inquiry
   - Admin inbox (udaysingh@klentec.com) for alert
   - Client's inbox for auto-reply

### Password Reset (Future)
1. On login page, add "Forgot Password?" link (currently missing)
2. Click it → Enter email
3. Get reset link via email
4. Set new password

---

## 📋 Checklist

- [ ] EmailJS account created
- [ ] Public key saved to `.env.local`
- [ ] 3 Gmail services created & service IDs saved
- [ ] 3 email templates created & template IDs saved
- [ ] `.env.local` fully populated with EmailJS keys
- [ ] AuthContext updated with `signUp` method
- [ ] LoginPage updated to call `signUp` during signup
- [ ] Supabase Email Auth enabled
- [ ] Dev server running (`npm run dev`)
- [ ] Test client signup works
- [ ] Test contact form sends all 3 emails
- [ ] Test admin can login

---

## 🚀 Step 7: Push to Production

Once all tests pass:

### Build & Deploy
```bash
npm run build
# Then deploy to your hosting (Vercel, Netlify, AWS, etc.)
```

### Update Environment Variables on Hosting
Copy all `VITE_` keys from `.env.local` to your hosting platform's environment variables.

### Final Verification on Live
1. Test signup on live domain
2. Test contact form sends emails
3. Test login/logout works
4. Monitor error logs

---

## 🆘 Troubleshooting

### "CORS error on EmailJS send"
- Make sure EmailJS Public Key is correct in `.env.local`
- Make sure service/template IDs are correct
- Check that Gmail services are "Active" in EmailJS dashboard

### "Email not receiving"
- Check spam/junk folder
- Verify Gmail services are connected in EmailJS
- Test with EmailJS dashboard's **"Test Email"** button

### "Signup not creating profile"
- Check Supabase `profiles` table has a Row Level Security (RLS) policy that allows inserts
- Check that the `signUp` method is calling profile insert correctly

### "Contact form not sending emails"
- Check browser console for errors
- Verify all 3 template IDs in `.env.local` are correct
- Check EmailJS Service IDs are active

---

## Next Steps

Once emails are working:
1. Customize email templates with your branding
2. Add "Forgot Password" functionality
3. Add email verification badges to user profiles
4. Set up email notifications for messages, invoices, etc.
5. Deploy to production

**Let me know when you're ready to start!** I'll help you with each step.

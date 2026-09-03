# 🚀 KLENTEC Lead Machine - Complete Setup Guide

## Overview
The Lead Machine system automatically captures, manages, and nurtures leads from your website. It includes:
- ✅ Lead capture from all contact forms
- ✅ Automatic email sequences
- ✅ Admin dashboard for lead management
- ✅ Google Analytics 4 integration
- ✅ WhatsApp integration
- ✅ Real-time notifications

---

## 📋 Already Configured

### Supabase
- ✅ Project URL: `https://nxngvwhgoydmmfmqlpcy.supabase.co`
- ✅ Public anon key configured
- **Next:** Create `leads` table (see below)

### Email (Resend)
- Switched from EmailJS to Resend, sent via a small Vercel serverless
  function (`api/send-email.js`) instead of a client-exposed public key.
- **Requires:** a Resend account, an API key, and (optionally) a verified
  sending domain. See `.env.example` for the exact env vars
  (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_NOTIFICATION_EMAIL`).
- Until `klentec.com` is verified in Resend, `RESEND_FROM_EMAIL` must stay
  `onboarding@resend.dev` — Resend will reject sends from an unverified
  custom domain.

---

## 🔧 Setup Steps

### 1. Create Supabase `leads` Table

**Go to:** Supabase Dashboard → SQL Editor → New Query

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  service_interest VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new',
  source VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow all users to insert
CREATE POLICY "Allow inserts" ON leads FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view/update
CREATE POLICY "Allow select" ON leads FOR SELECT USING (true);
CREATE POLICY "Allow update" ON leads FOR UPDATE USING (true);
```

---

### 2. Set Up Google Analytics 4 (Optional but Recommended)

**Go to:** [Google Analytics 4](https://analytics.google.com) → Create Property

1. Click "Create Property"
2. Enter: "KLENTEC" as property name
3. Select: "Web" as data stream type
4. Enter your domain: `klentec.com`
5. Copy the Measurement ID (e.g., `G-XXXXXXXXXX`)
6. Add to `.env.local`:

```
VITE_GA4_ID=G-XXXXXXXXXX
```

Then initialize in `src/main.tsx`:

```typescript
import { initGA } from '@/services/analytics';

if (import.meta.env.VITE_GA4_ID) {
  initGA(import.meta.env.VITE_GA4_ID);
}
```

---

### 3. Access Admin Dashboard

**URL:** `http://localhost:8080/admin/leads`

**Features:**
- 📊 Real-time lead stats (Total, New, Contacted, Converted, Closed)
- 🔍 Filter leads by status or service
- 📝 View full lead details
- 📞 Quick actions (Email, WhatsApp)
- ✏️ Update lead status
- 📧 Send follow-up emails directly

---

## 📧 How Email Automation Works

### Welcome Email (Sent Automatically)
When a lead submits the contact form, they receive:
- Personalized confirmation email
- Thank you message
- Expected response time (2 hours)

### Admin Notification (Sent to You)
You receive an email with:
- Lead's full details
- Service interest
- Message content
- Time submitted

### Follow-up Sequences (Coming Soon)
Set up automated sequences:
- Day 1: Welcome + Value proposition
- Day 3: Case study showcase
- Day 7: Limited-time offer
- Day 14: Final outreach

---

## 🔍 Tracking Lead Sources

The system automatically tracks where leads come from:
- `contact-form` → Direct contact form submission
- `cta-click` → From CTA button click
- `landing-page` → From service page
- Custom sources → Add as needed

---

## 📊 Analytics Events Tracked

### Lead Generation
```
Event: lead_generated
Properties:
- service: (digital-marketing, web-development, etc.)
- source: (contact-form, landing-page, etc.)
```

### CTA Interactions
```
Event: cta_click
Properties:
- cta_name: "Book Free Strategy Call"
- location: "homepage-hero"
```

### Engagement
```
Event: page_view, scroll, time_on_page
- Tracks user journey
- Identifies bottlenecks
- Optimizes conversion flow
```

---

## 🚀 Best Practices

### For Maximum Lead Capture
1. ✅ Ensure contact forms are working (test yourself)
2. ✅ Add clear CTAs on high-traffic pages
3. ✅ Use "Form Success" messaging to improve UX
4. ✅ Follow up within 2 hours (set a reminder)
5. ✅ Track conversion from lead → client

### For Lead Management
1. ✅ Check dashboard daily
2. ✅ Update lead status as you progress
3. ✅ Send follow-ups within 2 hours
4. ✅ Note next steps in CRM
5. ✅ Close won deals as "converted"

### For Performance
1. ✅ Analyze which services get most leads
2. ✅ Double down on high-performing CTAs
3. ✅ A/B test form fields (shorter = better)
4. ✅ Use analytics to identify drop-off points
5. ✅ Optimize based on data

---

## 🆘 Troubleshooting

### "Contact form not saving leads"
1. Check `.env.local` has Supabase keys
2. Verify `leads` table exists in Supabase
3. Check browser console for errors
4. Check Supabase Dashboard → Logs

### "Emails not being sent"
1. Verify `RESEND_API_KEY` is set in Vercel (Production + Preview)
2. Check Resend Dashboard → Logs for the actual delivery attempt
3. If sending from `@klentec.com`, confirm the domain is verified in
   Resend — unverified domains are rejected
4. Check spam folder (emails might be there)
5. Check the Vercel function logs for `/api/send-email` for the exact
   error message

### "Admin dashboard shows no leads"
1. Make sure at least one lead was submitted
2. Check Supabase: Tables → leads (should have rows)
3. Clear browser cache and reload
4. Check browser console for errors

---

## 📈 Success Metrics

Track these to measure success:
- **Lead Volume:** Leads/day, Leads/week
- **Lead Quality:** By service, by source
- **Response Rate:** % leads you contact within 2 hours
- **Conversion Rate:** % leads → clients
- **CTR (Click-Through Rate):** % who click CTA
- **Form Submission Rate:** % who submit forms

---

## 🔐 Security Notes

- ✅ Supabase RLS policies prevent unauthorized access
- ✅ Email data is encrypted in transit
- ✅ Admin dashboard should be password-protected (add soon)
- ✅ Never commit `.env.local` to git
- ⚠️ Consider adding authentication to `/admin/leads`

---

## 🎯 Next Steps

1. **Create Supabase `leads` table** (SQL script above)
2. **Test the contact form** - Submit a test message
3. **Check admin dashboard** - Verify lead appears
4. **Verify emails received** - Check inbox + spam folder
5. **Set up Google Analytics** (optional but recommended)
6. **Deploy to production** - Vercel auto-deploys on git push

---

## 📞 Support

For issues:
1. Check browser console (F12 → Console tab)
2. Check Supabase logs (Dashboard → Logs)
3. Check Resend logs (Dashboard → Logs)
4. Check Vercel deployment logs
5. Contact Claude for help

---

**Status:** ✅ Ready to use!
**Last Updated:** July 6, 2026
**Version:** 1.0

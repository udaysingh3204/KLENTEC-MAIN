import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const caseStudies = [
  {
    title: "TechNova - B2B SaaS Explosion",
    category: "Full Growth System",
    result: "320% Lead Growth",
    icon: TrendingUp,
    problem: "A B2B SaaS was getting 5-10 leads/month with no predictable process. Founder was doing all the marketing. CAC was too high to scale.",
    solution: "We audited their funnel, rebuilt the website for conversions, created a LinkedIn automation + content strategy, and deployed email nurture sequences. Built a complete marketing system that required zero founder involvement. Tech: Next.js, Stripe, HubSpot, Zapier automation.",
    metrics: ["From 10 to 80+ qualified leads/month", "+$150K MRR projected", "60% reduction in CAC", "9/10 NPS score"],
    year: "2024",
  },
  {
    title: "RetailMax - E-commerce Turnaround",
    category: "Performance Marketing + Dev",
    result: "4.2X ROAS",
    icon: TrendingUp,
    problem: "Running ads on autopilot wasn't working. Website was slow and confusing. Checkout was losing 40% of customers. Ad spend was $15K/month with poor returns.",
    solution: "Complete funnel redesign: optimized site speed (GTmetrix A grade), improved UX, added AI chatbot for support, retargeting campaigns + SMS recovery. Created a system to automatically re-engage cart abandoners. Tech: React, Shopify, AI chatbot (OpenAI), Meta Ads, Klaviyo SMS.",
    metrics: ["40% cart recovery rate (2% → 2.8%)", "$280K additional revenue in 6 months", "4.2x ROAS (up from 1.2x)", "15% increase in average order value"],
    year: "2024",
  },
  {
    title: "ConsultPro - Service Business Scaled",
    category: "Complete Digital Transformation",
    result: "5X Lead Pipeline",
    icon: Target,
    problem: "High-ticket consulting firm had inconsistent leads. Website looked outdated. No social presence. Couldn't articulate their value. Wanted to scale without hiring sales team.",
    solution: "Brand overhaul + premium website + LinkedIn Authority strategy + automated outreach system + case studies + proposal templates. Built a 'self-selling' machine. Tech: Custom WordPress site, LinkedIn API automation, Calendly integration, Proposal.io templates.",
    metrics: ["50+ qualified inbound inquiries/month", "Closed $1.2M in contracts (Year 1)", "Authority status in industry", "85% proposal-to-close rate"],
    year: "2024",
  },
  {
    title: "FreshStart - Startup from Zero",
    category: "Development + Product Launch",
    result: "Product-Market Fit + 8K Users",
    icon: Users,
    problem: "Startup founder had an idea but no tech team, no brand, and no customer base. Needed everything built in 90 days before funding round.",
    solution: "End-to-end build: brand identity, product design, full-stack development, landing page, launch strategy, investor pitch deck. Coordinated a complete go-to-market. Tech stack: React, Node.js, PostgreSQL, Supabase, Figma design system.",
    metrics: ["Product launched in 12 weeks", "8K beta users pre-launch", "Featured in TechCrunch + 2 other publications", "Raised $500K seed funding"],
    year: "2023",
  },
  {
    title: "HealthPlus - Healthcare App Expansion",
    category: "Product + Growth Marketing",
    result: "2.8X Monthly Users in 6 Months",
    icon: TrendingUp,
    problem: "A telemedicine app had good product but zero market awareness. Struggling to compete with established players. Founder couldn't afford traditional marketing. User acquisition was stalled at 200 sign-ups/month.",
    solution: "Built viral loops and referral mechanics into the app. Implemented organic growth strategy: content marketing on healthcare blogs, partnership outreach with wellness influencers, and in-app gamification. Deployed Google Ads + TikTok campaigns. Tech: Flutter (mobile), Firebase, Amplitude analytics, Segment CDP.",
    metrics: ["From 200 to 2,400 monthly sign-ups", "$500K in annual contracts secured", "10% referral-driven growth rate", "4.8★ app store rating with 50K+ reviews"],
    year: "2024",
  },
  {
    title: "FinFlow - Fintech B2B SaaS",
    category: "Full Stack Development + Go-To-Market",
    result: "6x Revenue in 12 Months",
    icon: TrendingUp,
    problem: "Fintech startup had a solid product for business accounting automation but couldn't break into SMB market. Cold outreach wasn't working. Product-market fit was uncertain.",
    solution: "Conducted customer interviews and repositioned messaging. Rebuilt landing page with clearer value prop. Launched SEO strategy targeting financial software keywords. Created interactive demo video and product walkthrough. Integrated with QuickBooks & Xero. Tech: React, Python backend, Stripe Connect, Plaid API, Intercom.",
    metrics: ["250+ SMB customers onboarded", "$800K ARR achieved", "65% NPS score", "90% customer retention"],
    year: "2023",
  },
  {
    title: "EduSmart - EdTech Platform Growth",
    category: "UX/CRO + Paid Acquisition",
    result: "285% Student Enrollment Growth",
    icon: Users,
    problem: "Online course platform had 5K students but plateau'd at $30K/month revenue. High bounce rate (60%) on course pages. Poor completion rates (28%) hurt word-of-mouth growth.",
    solution: "Complete course page redesign with social proof, video testimonials, structured curriculum preview. A/B tested enrollment flow (reduced from 5 steps to 2). Launched cohort-based courses for accountability. Tech: Next.js frontend, Stripe payments, Sendgrid email campaigns, Loom video embeds.",
    metrics: ["14K active students (180% growth)", "$125K MRR revenue", "67% course completion rate", "45% student referral rate"],
    year: "2024",
  },
  {
    title: "PropFlow - Real Estate Tech",
    category: "MVP Development + Launch",
    result: "150+ Agent Sign-ups in Month 1",
    icon: Target,
    problem: "Real estate agents were manually managing client follow-ups in spreadsheets. CRM was too expensive for independent agents. Market gap identified but no solution existed.",
    solution: "Built lightweight CRM specifically for real estate agents. 30-day launch sprint: design, dev, beta testing, launch. Pricing: freemium model ($0-49/month). Early users from founder's network helped spread awareness. Tech: Vue.js, Firebase, Twilio SMS integration, Mailgun.",
    metrics: ["150+ active agents in Month 1", "$12K MRR by Month 3", "92% activation rate", "Ranked #3 in ProductHunt for real estate category"],
    year: "2023",
  },
  {
    title: "BrandLab - Visual Identity & Branding",
    category: "Branding & Creative Design",
    result: "Brand Awareness +400%, 3 Product Lines Launched",
    icon: TrendingUp,
    problem: "D2C consumer brand had no consistent visual identity; different designers across the years had created a messy, incoherent brand. They had no brand guidelines and couldn't articulate their positioning to retailers.",
    solution: "Complete brand identity system: logo redesign, typography hierarchy, color palette + standards, 120-page brand guidelines book, packaging design for 3 SKUs, social media kit, pitch deck design. Alignment workshop with leadership to define brand voice and positioning. Tech: Figma, Adobe Illustrator, Figma design system components.",
    metrics: ["Brand recall increased 4x in post-campaign survey", "Secured 2 major retail partnerships (Top 500 retailers)", "Pitch deck helped close ₹1.2Cr Series A investment", "Instagram following grew 3.2x with consistent brand aesthetics"],
    year: "2024",
  },
  {
    title: "QuickEats - Marketplace & D2C Expansion",
    category: "E-Commerce & Marketplace Management",
    result: "5X Revenue via Marketplace Channels",
    icon: TrendingUp,
    problem: "Food & beverage D2C brand was only selling on their Shopify website. 80% of sales from direct marketing. Wanted Amazon and quick commerce (Blinkit/Zepto) expansion but had no bandwidth or expertise to manage multiple channels.",
    solution: "End-to-end marketplace expansion: Amazon India storefront setup with A+ Enhanced Content, product photography optimization, Blinkit and Zepto quick commerce onboarding, inventory sync across all channels, paid marketplace ads (Amazon Sponsored Products), product listing optimization. Created marketplace-specific content and pricing strategy. Tech: Amazon Seller Central API, Blinkit Partner API, inventory management automation via Zapier.",
    metrics: ["Amazon store launched in 3 weeks", "₹8L in revenue in first 90 days", "#1-3 listings in category within 6 months", "Blinkit dark store activation in 6 cities", "Quick commerce contributing 35% of total revenue by Month 6"],
    year: "2024",
  },
  {
    title: "GrowthPulse - SEO & Organic Growth",
    category: "SEO & Organic Growth",
    result: "580% Organic Traffic Growth in 12 Months",
    icon: TrendingUp,
    problem: "B2B SaaS company was completely dependent on paid ads (Google & LinkedIn). CAC was ₹12,000/lead. Founder wanted to build an organic moat and reduce reliance on ad spend before scaling. No content strategy or SEO foundation existed.",
    solution: "Technical SEO audit + systematic fix of 80+ issues (site speed, crawlability, Core Web Vitals). Pillar content strategy: 24 blog posts/month targeting high-intent keywords, skyscraper posts beating top competitors, internal linking structure. Backlink building campaign (securing 65 DR40+ links). Google Search Console optimization, schema markup implementation. Monthly SEO strategy sessions with leadership. Tech: SEMrush, Ahrefs, Google Search Console, GA4 analytics, Screaming Frog.",
    metrics: ["580% organic sessions growth (from 1K to 6.8K/month)", "Top-3 rankings for 34 target keywords (up from 0)", "CAC reduced from ₹12K to ₹2,800 via organic leads", "45 qualified organic leads/month by Month 12", "Organic now 40% of total pipeline (up from 5%)"],
    year: "2024",
  },
  {
    title: "NexaComm - WhatsApp & Communication Automation",
    category: "WhatsApp, Email & Communication",
    result: "68% Lead Response Rate (Up from 8%)",
    icon: TrendingUp,
    problem: "Real estate company generating 200+ leads/month from paid ads but converting <2% due to slow response times. Leads went cold within 30 minutes if no rep response. Sales team was overwhelmed, inconsistent follow-up was costing deals. Manual CRM data entry ate 20+ hours/week.",
    solution: "WhatsApp Business API setup with instant automated greeting (within 3 seconds of lead submission). Qualification sequence (5 templated questions). CRM integration (HubSpot) with auto-sync of lead data and responses. AI-powered lead scoring to prioritize hot prospects. Drip email + WhatsApp follow-up for cold leads (every 3 days, 8 touch sequence). Weekly performance dashboard + monthly reporting. Tech: WhatsApp Business API, HubSpot CRM, Make.com automation, Supabase database, custom webhook architecture.",
    metrics: ["Response time reduced from 4 hours to 30 seconds", "68% lead engagement rate (up from 8%)", "23% of qualified leads became site visits (vs 4% before)", "42% conversion rate for warm leads (vs 18% before)", "₹45L in property closures attributed to automation in 6 months"],
    year: "2024",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const WorkPage = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main>
      <section className="relative gradient-bg-hero pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge-dreamy mb-6 inline-block">🏆 Case Studies</span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
              Results That Speak for <span className="gradient-text">Themselves</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              These aren't hypothetical scenarios. These are real companies we've worked with. Real problems we've solved. Real revenue we've helped them generate.
            </p>
            <div className="mt-8 flex justify-center gap-8 text-sm font-medium flex-wrap">
              <div className="flex items-center gap-2 text-primary">
                ✓ All verified results
              </div>
              <div className="flex items-center gap-2 text-primary">
                ✓ From real clients
              </div>
              <div className="flex items-center gap-2 text-primary">
                ✓ Recent work
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto space-y-5">
          {caseStudies.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-elevated overflow-hidden cursor-pointer"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-5 flex-1">
                  <div className="icon-box-lg shrink-0">
                    <c.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{c.category}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{c.year}</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground">{c.title}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-2xl font-display font-bold gradient-text whitespace-nowrap">{c.result}</span>
                  <ArrowRight className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${expanded === i ? "rotate-90" : ""}`} />
                </div>
              </div>

              <motion.div
                initial={false}
                animate={{ height: expanded === i ? "auto" : 0, opacity: expanded === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-7 pb-7 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-7">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-2">Problem</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-2">Solution</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-2">Results</h4>
                    <ul className="space-y-1.5">
                      {c.metrics.map((m) => (
                        <li key={m} className="text-sm text-primary font-medium">✓ {m}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding gradient-bg-subtle">
        <div className="container mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Want Results Like <span className="gradient-text">These</span>?
            </h2>
            <Link to="/contact" className="btn-primary-gradient inline-block mt-8 px-10 py-4 text-base">
              Book a Call
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default WorkPage;

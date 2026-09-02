import ServiceHeroSection from "@/components/services/ServiceHeroSection";
import ServiceFeaturesSection from "@/components/services/ServiceFeaturesSection";
import ServiceProcessSection from "@/components/services/ServiceProcessSection";
import ServicePricingSection from "@/components/services/ServicePricingSection";
import ServiceResultsSection from "@/components/services/ServiceResultsSection";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PriceDisplay } from "@/components/PriceDisplay";

const FastTrackWebDevPage = () => {
  const features = [
    {
      title: "Strategic Design System",
      description: "Enterprise-grade UI that converts",
      items: ["Brand-aligned design language", "High-conversion layouts", "Accessibility optimized", "Mobile-first responsive"],
    },
    {
      title: "Custom Development",
      description: "Production-ready code",
      items: ["React 19 + TypeScript", "Performance optimized", "SEO-ready structure", "Form & lead capture"],
    },
    {
      title: "Performance First",
      description: "Lightning-fast loading",
      items: ["Lighthouse 90+ scores", "Image optimization", "CDN delivery ready", "Core Web Vitals passed"],
    },
    {
      title: "Lead Generation Built-In",
      description: "Conversion-focused features",
      items: ["Multiple CTA points", "Email capture forms", "WhatsApp integration", "Analytics tracking"],
    },
    {
      title: "Business Tools",
      description: "Day-1 ready operations",
      items: ["Email automation", "Contact management", "Basic CRM integration", "Admin dashboard"],
    },
    {
      title: "Launch & Deploy",
      description: "Live in 24 hours",
      items: ["DNS setup included", "SSL certificate", "CDN configuration", "24/7 monitoring"],
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Strategy Call",
      description: "60-minute discovery: your goals, target market, competitors, unique value prop.",
      duration: "Hour 1",
    },
    {
      number: "2",
      title: "Design Sprint",
      description: "Rapid wireframes → approved design. 3 rounds of refinement in real-time.",
      duration: "Hours 2-6",
    },
    {
      number: "3",
      title: "Development Blitz",
      description: "Full-stack build with components, pages, forms, and integrations coded in parallel.",
      duration: "Hours 6-18",
    },
    {
      number: "4",
      title: "Integration & Testing",
      description: "Email, forms, analytics, WhatsApp, payment (if needed) + QA testing.",
      duration: "Hours 18-22",
    },
    {
      number: "5",
      title: "Launch & Handoff",
      description: "Deploy to production, DNS activation, admin training, go live.",
      duration: "Hour 22-24",
    },
  ];

  const tiers = [
    {
      name: "Starter Speed",
      price: "₹7,811",
      originalPrice: "₹6,249",
      showDiscount: true,
      period: "one-time",
      description: "Landing page + lead capture",
      features: [
        "Landing page (1-2 sections)",
        "Hero + CTA sections",
        "Email capture form",
        "Mobile responsive",
        "Basic analytics",
        "1 round of revisions",
      ],
      highlighted: false,
      cta: "Get Landing Page",
      serviceId: "24hr-web-starter",
      numericPrice: 7811,
    },
    {
      name: "Enterprise Speed",
      price: "₹15,624",
      originalPrice: "₹12,499",
      showDiscount: true,
      period: "one-time",
      description: "Full 5-page business website",
      features: [
        "5 complete pages",
        "Hero + Services + Team + Blog + Contact",
        "Advanced form integrations",
        "Email automation (3 sequences)",
        "WhatsApp integration",
        "Admin dashboard",
        "Lighthouse 90+ score",
        "2 rounds of revisions",
      ],
      highlighted: true,
      cta: "Launch Enterprise Website",
      serviceId: "24hr-web-enterprise",
      numericPrice: 15624,
    },
    {
      name: "Growth Accelerator",
      price: "₹31,249",
      originalPrice: "₹24,999",
      showDiscount: true,
      period: "one-time",
      description: "Complete digital ecosystem",
      features: [
        "8+ branded pages",
        "E-commerce ready",
        "CRM integration",
        "Advanced automation",
        "Team portal",
        "Analytics dashboard",
        "API integrations (3)",
        "3 rounds of revisions",
        "30-day support included",
      ],
      highlighted: false,
      cta: "Build Growth System",
      serviceId: "24hr-web-growth",
      numericPrice: 31249,
    },
  ];

  const results = [
    {
      company: "TechNova",
      industry: "SaaS",
      metric: "Time to Market",
      value: "24 hrs",
      timeline: "launch",
      description: "Launched product page with full lead capture in 24 hours. Started generating leads immediately.",
    },
    {
      company: "RetailMax",
      industry: "E-commerce",
      metric: "Conversion Rate",
      value: "+42%",
      timeline: "30 days",
      description: "Enterprise Speed build resulted in 42% higher conversion vs previous site due to optimized UX.",
    },
    {
      company: "ConsultPro",
      industry: "Services",
      metric: "Leads/Month",
      value: "180+",
      timeline: "90 days",
      description: "24-hour launch enabled immediate lead capture. Scaled to 180+ qualified leads in 90 days.",
    },
    {
      company: "FinFlow",
      industry: "Fintech",
      metric: "Page Load",
      value: "1.2s",
      timeline: "core web",
      description: "Performance-first build achieved 1.2s load time with Lighthouse 98 score.",
    },
    {
      company: "FreshStart",
      industry: "Startup",
      metric: "Development Cost",
      value: "-70%",
      timeline: "vs agency",
      description: "24-hour build reduced typical 3-month agency project into single day execution.",
    },
    {
      company: "HealthPlus",
      industry: "Healthcare",
      metric: "Time Saved",
      value: "720 hrs",
      timeline: "vs manual",
      description: "Eliminated months of back-and-forth revisions with sprint-based rapid delivery.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <ServiceHeroSection
        title="Enterprise Website in 24 Hours"
        subtitle="Enterprise Speed"
        description="Strategic design + custom development + go live. No templates. No waiting. No excuses. Your complete business website built from scratch in a single day."
        benefits={["Strategy to Launch in 24 Hours", "Production-Ready Code", "Conversion-Focused Design"]}
        ctaText="Start Enterprise Speed Build"
        gradient="from-blue-600 to-cyan-600"
      />

      <ServiceFeaturesSection
        title="What's Included in Your 24-Hour Build"
        features={features}
      />

      <ServiceProcessSection
        title="The Enterprise Speed Process"
        steps={steps}
        color="from-blue-500 to-cyan-500"
      />

      {/* Unique Section: What Makes This Different */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Enterprise Speed Works
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Not a template builder. Not AI-generated junk. A real team. Real strategy. Real code. Real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-slate-900 border border-slate-800"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-3">
                1x
              </div>
              <h3 className="text-xl font-bold text-white mb-2">One Team</h3>
              <p className="text-slate-400">
                Strategist + Designer + Developer + QA working in sync. No handoffs. No delays. No communication gaps.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-slate-900 border border-slate-800"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-3">
                100%
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Custom Code</h3>
              <p className="text-slate-400">
                Enterprise-grade React + TypeScript. Production-ready. Scalable. Not a Wix clone or WordPress theme hack.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-slate-900 border border-slate-800"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-3">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Conversion-First</h3>
              <p className="text-slate-400">
                Every pixel designed for leads. Multiple CTAs. Email capture. WhatsApp integration. Built-in analytics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <ServicePricingSection
        title="Enterprise Speed Pricing"
        tiers={tiers}
        color="from-blue-500 to-cyan-500"
        serviceName="Enterprise Website in 24 Hours"
      />

      <ServiceResultsSection
        title="Real Results. Real Speed."
        subtitle="Companies that launched in 24 hours"
        results={results}
        color="from-blue-500 to-cyan-500"
      />

      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Launch in 24 Hours?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            No more waiting for agencies. No more $50K projects that take 3 months. Start today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all"
            >
              Start 24-Hour Build
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold border border-slate-600 text-slate-300 hover:bg-slate-900 transition-all"
            >
              Schedule Strategy Call
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FastTrackWebDevPage;

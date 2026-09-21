import ServiceHeroSection from "@/components/services/ServiceHeroSection";
import ServiceFeaturesSection from "@/components/services/ServiceFeaturesSection";
import ServiceProcessSection from "@/components/services/ServiceProcessSection";
import ServicePricingSection from "@/components/services/ServicePricingSection";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PriceDisplay } from "@/components/PriceDisplay";
import { SEO } from "@/components/SEO";

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
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="24-Hour Web Dev"
        description="A complete, fixed-scope business website — strategy to launch in 24 hours."
        path="/services/24-hour-web-dev"
      />
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
      <section className="section-padding gradient-bg-subtle">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Why Enterprise Speed Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Not a template builder. Not AI-generated junk. A real team. Real strategy. Real code. Real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-dreamy p-8"
            >
              <div className="text-4xl font-display font-bold gradient-text mb-3">
                1x
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">One Team</h3>
              <p className="text-muted-foreground">
                Strategist + Designer + Developer + QA working in sync. No handoffs. No delays. No communication gaps.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-dreamy p-8"
            >
              <div className="text-4xl font-display font-bold gradient-text mb-3">
                100%
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">Custom Code</h3>
              <p className="text-muted-foreground">
                Enterprise-grade React + TypeScript. Production-ready. Scalable. Not a Wix clone or WordPress theme hack.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-dreamy p-8"
            >
              <div className="text-4xl font-display font-bold gradient-text mb-3">
                ✓
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">Conversion-First</h3>
              <p className="text-muted-foreground">
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

      <section className="section-padding">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            Ready to Launch in 24 Hours?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            No more waiting for agencies. No more months-long projects. Start today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              className="btn-primary-gradient inline-flex items-center justify-center px-8 py-3"
            >
              Start 24-Hour Build
            </a>
            <Link
              to="/contact"
              className="btn-ghost inline-flex items-center justify-center px-8 py-3"
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

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Palette,
  Megaphone,
  Video,
  Globe,
  Smartphone,
  Bot,
  CreditCard,
  ShoppingBag,
  Search,
  MessageSquare,
  Cloud,
  Database,
  Zap,
  Rocket,
  Check,
} from "lucide-react";

type Row = { name: string; serviceId: string };
type Group = { title: string; rows: Row[] };
type Category = {
  id: string;
  icon: typeof Palette;
  emoji: string;
  title: string;
  groups: Group[];
  extras?: { title: string; items: string[] };
};

const categories: Category[] = [
  {
    id: "branding",
    icon: Palette,
    emoji: "🎨",
    title: "Branding & Creative Design",
    groups: [
      {
        title: "Logo & Identity",
        rows: [
          { name: "Basic Logo Design", serviceId: "logo-basic" },
          { name: "Premium Logo Design", serviceId: "logo-premium" },
          { name: "Luxury Brand Identity", serviceId: "logo-luxury" },
          { name: "Brand Guidelines Book", serviceId: "branding-guidelines" },
          { name: "Brand Naming & Strategy", serviceId: "brand-naming" },
        ],
      },
      {
        title: "Marketing Design",
        rows: [
          { name: "Social Media Post Design", serviceId: "social-post" },
          { name: "Premium Creative Design", serviceId: "social-post-premium" },
          { name: "Carousel Design", serviceId: "carousel-design" },
          { name: "Story Design", serviceId: "story-design" },
          { name: "Flyer / Poster Design", serviceId: "flyer-poster" },
          { name: "Brochure Design", serviceId: "brochure" },
          { name: "Catalogue Design", serviceId: "catalogue" },
          { name: "Pitch Deck Design", serviceId: "pitch-deck" },
          { name: "Packaging Design", serviceId: "packaging" },
        ],
      },
      {
        title: "Business Essentials",
        rows: [
          { name: "Business Card Design", serviceId: "business-card" },
          { name: "Letterhead Design", serviceId: "letterhead" },
          { name: "Email Signature Design", serviceId: "email-signature" },
          { name: "ID Card Design", serviceId: "id-card" },
          { name: "Invoice Design", serviceId: "invoice-design" },
          { name: "Company Profile Design", serviceId: "company-profile" },
        ],
      },
    ],
  },
  {
    id: "social",
    icon: Megaphone,
    emoji: "📱",
    title: "Social Media & Growth Marketing",
    groups: [
      {
        title: "Monthly Social Media Plans",
        rows: [
          { name: "Starter Plan", serviceId: "social-starter" },
          { name: "Growth Plan", serviceId: "social-growth" },
          { name: "Business Plan", serviceId: "social-business" },
          { name: "Scale-Up Plan", serviceId: "social-scaleup" },
          { name: "Enterprise Plan", serviceId: "social-enterprise" },
        ],
      },
      {
        title: "Performance Marketing",
        rows: [
          { name: "Meta Ads Management", serviceId: "meta-ads" },
          { name: "Google Ads Management", serviceId: "google-ads" },
          { name: "Lead Generation Campaigns", serviceId: "lead-generation" },
          { name: "E-commerce Ads Scaling", serviceId: "ecom-ads" },
          { name: "Conversion Funnel Setup", serviceId: "conversion-funnel" },
          { name: "Retargeting Campaigns", serviceId: "retargeting" },
        ],
      },
    ],
    extras: {
      title: "Included in Plans",
      items: [
        "Content Strategy",
        "Reels & Shorts",
        "Post Designing",
        "Captions & Hashtags",
        "Story Management",
        "Competitor Analysis",
        "Monthly Reporting",
        "Meta Ads Management",
        "Google Ads Management",
      ],
    },
  },
  {
    id: "video",
    icon: Video,
    emoji: "🎥",
    title: "Video Production & Content Creation",
    groups: [
      {
        title: "Production Services",
        rows: [
          { name: "Reel Shoot", serviceId: "reel-shoot" },
          { name: "Promo Video Production", serviceId: "promo-video" },
          { name: "Corporate Shoot", serviceId: "corporate-shoot" },
          { name: "Event Coverage", serviceId: "event-coverage" },
          { name: "Podcast Production", serviceId: "podcast" },
          { name: "Music Video Production", serviceId: "music-video" },
          { name: "Documentary Production", serviceId: "documentary" },
        ],
      },
      {
        title: "Editing Services",
        rows: [
          { name: "Reel Editing", serviceId: "reel-editing" },
          { name: "YouTube Video Editing", serviceId: "youtube-editing" },
          { name: "Corporate Editing", serviceId: "corporate-editing" },
          { name: "Motion Graphics", serviceId: "motion-graphics" },
          { name: "VFX Editing", serviceId: "vfx-editing" },
          { name: "Thumbnail Design", serviceId: "thumbnail" },
        ],
      },
      {
        title: "Production Add-ons",
        rows: [
          { name: "Drone Shoot", serviceId: "drone-shoot" },
          { name: "Insta360 Shoot", serviceId: "insta360-shoot" },
          { name: "Voiceover", serviceId: "voiceover" },
          { name: "Scriptwriting", serviceId: "scriptwriting" },
          { name: "Studio Setup", serviceId: "studio-setup" },
        ],
      },
    ],
  },
  {
    id: "web",
    icon: Globe,
    emoji: "🌐",
    title: "Website Development",
    groups: [
      {
        title: "Business Websites",
        rows: [
          { name: "Landing Page Website", serviceId: "landing-page" },
          { name: "Business Website", serviceId: "business-website" },
          { name: "Corporate Website", serviceId: "corporate-website" },
          { name: "Portfolio Website", serviceId: "portfolio-website" },
          { name: "News / Blog Website", serviceId: "blog-website" },
        ],
      },
      {
        title: "E-Commerce Development",
        rows: [
          { name: "Shopify Store", serviceId: "shopify-store" },
          { name: "WooCommerce Store", serviceId: "woocommerce-store" },
          { name: "Custom E-commerce Platform", serviceId: "custom-ecom" },
          { name: "Marketplace Development", serviceId: "marketplace" },
          { name: "Quick Commerce Platform", serviceId: "quick-commerce" },
        ],
      },
      {
        title: "Premium Web Development",
        rows: [
          { name: "React.js Website", serviceId: "react-website" },
          { name: "Next.js Platform", serviceId: "nextjs-platform" },
          { name: "MERN Stack Application", serviceId: "mern-app" },
          { name: "SaaS MVP Development", serviceId: "saas-mvp" },
          { name: "Custom Admin Dashboard", serviceId: "admin-dashboard" },
          { name: "CRM / ERP System", serviceId: "crm-erp" },
        ],
      },
    ],
  },
  {
    id: "app",
    icon: Smartphone,
    emoji: "📲",
    title: "Mobile App Development",
    groups: [
      {
        title: "App Development",
        rows: [
          { name: "Android App Development", serviceId: "android-app" },
          { name: "iOS App Development", serviceId: "ios-app" },
          { name: "Flutter App Development", serviceId: "flutter-app" },
          { name: "React Native App", serviceId: "react-native" },
          { name: "Food Delivery App", serviceId: "food-delivery" },
          { name: "Booking App", serviceId: "booking-app" },
          { name: "E-commerce App", serviceId: "ecom-app" },
          { name: "Custom Startup App", serviceId: "startup-app" },
        ],
      },
    ],
  },
  {
    id: "ai",
    icon: Bot,
    emoji: "🤖",
    title: "AI & Automation",
    groups: [
      {
        title: "AI Solutions",
        rows: [
          { name: "AI Chatbot Development", serviceId: "ai-chatbot" },
          { name: "GPT Integration", serviceId: "gpt-integration" },
          { name: "AI Customer Support System", serviceId: "ai-support" },
          { name: "AI Workflow Automation", serviceId: "ai-workflow" },
          { name: "AI SaaS Development", serviceId: "ai-saas" },
          { name: "AI Recommendation System", serviceId: "ai-recommendation" },
        ],
      },
      {
        title: "Automation Services",
        rows: [
          { name: "WhatsApp Automation", serviceId: "whatsapp-automation" },
          { name: "CRM Automation", serviceId: "crm-automation" },
          { name: "Email Automation Funnel", serviceId: "email-automation" },
          { name: "Lead Management Automation", serviceId: "lead-automation" },
          { name: "Business Workflow Automation", serviceId: "workflow-automation" },
        ],
      },
    ],
  },
  {
    id: "fintech",
    icon: CreditCard,
    emoji: "💳",
    title: "Fintech Solutions",
    groups: [
      {
        title: "Payment & Banking",
        rows: [
          { name: "Razorpay Integration", serviceId: "razorpay-integration" },
          { name: "Cashfree Integration", serviceId: "cashfree-integration" },
          { name: "PhonePe Payment Integration", serviceId: "phonepe-integration" },
          { name: "Subscription Billing System", serviceId: "subscription-billing" },
          { name: "Wallet System Development", serviceId: "wallet-system" },
          { name: "Payout System Development", serviceId: "payout-system" },
        ],
      },
      {
        title: "Fintech Platforms",
        rows: [
          { name: "GST Billing Software", serviceId: "gst-billing" },
          { name: "Invoice Management Platform", serviceId: "invoice-platform" },
          { name: "Fintech Dashboard", serviceId: "fintech-dashboard" },
          { name: "Banking API Integration", serviceId: "banking-api" },
          { name: "KYC Verification Integration", serviceId: "kyc-verification" },
          { name: "Loan Management System", serviceId: "loan-management" },
        ],
      },
    ],
  },
  {
    id: "ecom",
    icon: ShoppingBag,
    emoji: "🛒",
    title: "E-Commerce & Marketplace Management",
    groups: [
      {
        title: "Marketplace Setup",
        rows: [
          { name: "Amazon Seller Setup", serviceId: "amazon-setup" },
          { name: "Flipkart Seller Setup", serviceId: "flipkart-setup" },
          { name: "Myntra Setup", serviceId: "myntra-setup" },
          { name: "Meesho Setup", serviceId: "meesho-setup" },
          { name: "Blinkit / Zepto Setup", serviceId: "blinkit-setup" },
        ],
      },
      {
        title: "Marketplace Management",
        rows: [
          { name: "Product Upload", serviceId: "product-upload" },
          { name: "Marketplace Management", serviceId: "marketplace-mgmt" },
          { name: "Quick Commerce Management", serviceId: "quick-commerce-mgmt" },
          { name: "Inventory Automation", serviceId: "inventory-automation" },
        ],
      },
    ],
  },
  {
    id: "seo",
    icon: Search,
    emoji: "📊",
    title: "SEO & Organic Growth",
    groups: [
      {
        title: "SEO Services",
        rows: [
          { name: "Basic SEO", serviceId: "seo-basic" },
          { name: "Advanced SEO", serviceId: "seo-advanced" },
          { name: "Enterprise SEO", serviceId: "seo-enterprise" },
          { name: "Technical SEO Audit", serviceId: "seo-audit" },
          { name: "Backlink Building", serviceId: "backlink-building" },
          { name: "Local SEO", serviceId: "local-seo" },
        ],
      },
    ],
  },
  {
    id: "comms",
    icon: MessageSquare,
    emoji: "📧",
    title: "WhatsApp, Email & Communication",
    groups: [
      {
        title: "Communication Solutions",
        rows: [
          { name: "WhatsApp API Setup", serviceId: "whatsapp-api" },
          { name: "Bulk WhatsApp Marketing", serviceId: "whatsapp-marketing" },
          { name: "Email Marketing Setup", serviceId: "email-marketing" },
          { name: "Email Automation Funnel", serviceId: "email-funnel" },
          { name: "SMS Gateway Integration", serviceId: "sms-gateway" },
          { name: "CRM Integration", serviceId: "crm-integration" },
        ],
      },
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    emoji: "☁️",
    title: "Cloud, DevOps & Hosting",
    groups: [
      {
        title: "Hosting & Infrastructure",
        rows: [
          { name: "Shared Hosting Setup", serviceId: "shared-hosting" },
          { name: "VPS Hosting Setup", serviceId: "vps-hosting" },
          { name: "AWS Deployment", serviceId: "aws-deployment" },
          { name: "Docker Deployment", serviceId: "docker-deployment" },
          { name: "CI/CD Pipeline Setup", serviceId: "cicd-pipeline" },
          { name: "Server Optimization", serviceId: "server-optimization" },
        ],
      },
    ],
  },
  {
    id: "backend",
    icon: Database,
    emoji: "🗄️",
    title: "Database & Backend Development",
    groups: [
      {
        title: "Backend Solutions",
        rows: [
          { name: "REST API Development", serviceId: "rest-api" },
          { name: "GraphQL API Development", serviceId: "graphql-api" },
          { name: "Backend Architecture Setup", serviceId: "backend-architecture" },
          { name: "Microservices Architecture", serviceId: "microservices" },
          { name: "Firebase Integration", serviceId: "firebase-integration" },
          { name: "PostgreSQL / MongoDB Setup", serviceId: "database-setup" },
        ],
      },
    ],
  },
  {
    id: "addons",
    icon: Zap,
    emoji: "⚡",
    title: "Premium Add-ons",
    groups: [
      {
        title: "Add-ons",
        rows: [
          { name: "Domain & Hosting Setup", serviceId: "domain-hosting" },
          { name: "Speed Optimization", serviceId: "speed-optimization" },
          { name: "Website Security Hardening", serviceId: "security-hardening" },
          { name: "API Integrations", serviceId: "api-integrations" },
          { name: "Analytics Dashboard", serviceId: "analytics-dashboard" },
          { name: "Admin Panel Development", serviceId: "admin-panel" },
          { name: "Third-Party Integrations", serviceId: "third-party-integration" },
        ],
      },
    ],
  },
  {
    id: "packages",
    icon: Rocket,
    emoji: "🏆",
    title: "Business & Startup Packages",
    groups: [
      {
        title: "Packages",
        rows: [
          { name: "Startup Launch Package", serviceId: "startup-package" },
          { name: "D2C Brand Launch Package", serviceId: "d2c-package" },
          { name: "Restaurant Digital Package", serviceId: "restaurant-package" },
          { name: "Influencer Growth Package", serviceId: "influencer-package" },
          { name: "SaaS Startup Package", serviceId: "saas-package" },
          { name: "Full Digital Transformation", serviceId: "digital-transformation" },
        ],
      },
    ],
  },
];

const ServicesPage = () => {
  return (
    <main>{/* Hero */}
    <section className="relative gradient-bg-hero pt-32 pb-16">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="badge-dreamy mb-6 inline-block">🚀 Services</span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-balance">
            Everything You Need to <span className="gradient-text">Scale & Dominate</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you need a brand from scratch, a fully-automated funnel, or a custom SaaS platform — we've got you covered. <strong className="text-foreground">Every engagement is scoped to your goals, not a generic template.</strong>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-medium">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              ✓ 150+ Projects Delivered
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              ✓ 4.2x Avg ROI
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              ✓ Custom-Scoped Proposals
            </div>
          </div>
        </motion.div>

        {/* Quick nav */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-2 max-w-4xl mx-auto"
        >
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="px-4 py-2 rounded-full text-xs font-medium bg-card border border-border/50 hover:border-primary/40 hover:text-primary transition-all"
            >
              <span className="mr-1.5">{c.emoji}</span>
              {c.title}
            </a>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Value Proposition */}
    <section className="section-padding bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-3xl font-display font-bold gradient-text mb-2">Scoped Proposals</p>
            <p className="text-sm text-muted-foreground">No generic packages. Every quote is built around your actual project.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-3xl font-display font-bold gradient-text mb-2">Full Support</p>
            <p className="text-sm text-muted-foreground">Dedicated account manager. Weekly check-ins. Always here when you need us.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-3xl font-display font-bold gradient-text mb-2">Fast Turnaround</p>
            <p className="text-sm text-muted-foreground">Most projects ship in 2-4 weeks. Custom SaaS take 8-12 weeks.</p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Featured 24-Hour Web Dev Banner */}
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-600 p-12 md:p-16 border border-blue-400/30"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,blue/20_1px,transparent_1px)] bg-[length:20px_20px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 mb-6">
              <span className="text-lg">⚡</span>
              <span className="text-white font-semibold text-sm">MOST POPULAR OFFER</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Website in 24 Hours?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Strategy → Design → Development → Live. All in one day. Enterprise Speed delivers your complete business website fast.
            </p>

            <Link
              to="/services/24-hour-web-dev"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white text-blue-600 font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Enterprise Speed
              <span className="ml-2">→</span>
            </Link>

            <div className="mt-10 grid grid-cols-3 gap-4 md:gap-8 text-white text-center text-sm">
              <div>
                <p className="text-2xl font-bold">24 hrs</p>
                <p className="text-white/70">Turnaround</p>
              </div>
              <div>
                <p className="text-2xl font-bold">₹7.8K+</p>
                <p className="text-white/70">Starting</p>
              </div>
              <div>
                <p className="text-2xl font-bold">5 Pages</p>
                <p className="text-white/70">Included</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Categories */}
    <section className="section-padding">
      <div className="container mx-auto space-y-24">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            id={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-28"
          >
            {/* Category header */}
            <div className="flex items-center gap-4 mb-10">
              <div className="icon-dreamy-lg shrink-0">
                <cat.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")} — Category
                </span>
                <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight">
                  {cat.emoji} {cat.title}
                </h2>
              </div>
            </div>

            {/* Groups grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cat.groups.map((g) => (
                <div key={g.title} className="card-dreamy p-7">
                  <h3 className="text-lg font-display font-bold mb-5 text-foreground">{g.title}</h3>
                  <ul className="divide-y divide-border/40">
                    {g.rows.map((r) => (
                      <li key={r.name} className="flex items-center gap-3 py-3">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm text-foreground">{r.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Extras */}
            {cat.extras && (
              <div className="mt-6 card-glass p-7">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
                  {cat.extras.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.extras.items.map((it) => (
                    <span
                      key={it}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-background border border-border/50 text-foreground"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding gradient-bg-soft">
      <div className="container mx-auto text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-dreamy mb-4 inline-block">Ready to Scale?</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Don't See Exactly What You Need? <span className="gradient-text">Let's Build It Together.</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-base leading-relaxed">
            The list above covers 90% of common projects. But if you need something custom — whether it's a unique SaaS platform, a complex automation system, or a full digital transformation — we'll work with you to create the perfect solution.
          </p>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm font-medium text-muted-foreground mb-10">
            <div className="flex items-center justify-center gap-2">✓ Free consultation</div>
            <div className="flex items-center justify-center gap-2">✓ Detailed timeline</div>
            <div className="flex items-center justify-center gap-2">✓ Budget transparency</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-dreamy">
              Book Free Strategy Call
            </Link>
            <a href="#branding" className="btn-ghost">
              ↓ Browse All Services
            </a>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            💡 <strong>Pro tip:</strong> We offer 10-20% discounts on bundled services. Mix and match to build your perfect package.
          </p>
        </motion.div>
      </div>
    </section>
    </main>
  );
};

export default ServicesPage;

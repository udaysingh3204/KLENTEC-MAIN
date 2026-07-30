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
} from "lucide-react";

type Row = { name: string; price: string };
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
          { name: "Basic Logo Design", price: "₹6,249" },
          { name: "Premium Logo Design", price: "₹15,000+" },
          { name: "Luxury Brand Identity", price: "₹31,250+" },
          { name: "Brand Guidelines Book", price: "₹18,750+" },
          { name: "Brand Naming & Strategy", price: "₹25,000+" },
        ],
      },
      {
        title: "Marketing Design",
        rows: [
          { name: "Social Media Post Design", price: "₹749/post" },
          { name: "Premium Creative Design", price: "₹1,500/post" },
          { name: "Carousel Design", price: "₹3,125+" },
          { name: "Story Design", price: "₹438/story" },
          { name: "Flyer / Poster Design", price: "₹1,500+" },
          { name: "Brochure Design", price: "₹9,375+" },
          { name: "Catalogue Design", price: "₹6,250+" },
          { name: "Pitch Deck Design", price: "₹12,500+" },
          { name: "Packaging Design", price: "₹6,250+" },
        ],
      },
      {
        title: "Business Essentials",
        rows: [
          { name: "Business Card Design", price: "₹1,249" },
          { name: "Letterhead Design", price: "₹999" },
          { name: "Email Signature Design", price: "₹1,249" },
          { name: "ID Card Design", price: "₹999" },
          { name: "Invoice Design", price: "₹1,875+" },
          { name: "Company Profile Design", price: "₹15,000+" },
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
          { name: "Starter Plan", price: "₹9,999/month" },
          { name: "Growth Plan", price: "₹18,749/month" },
          { name: "Business Plan", price: "₹37,499/month" },
          { name: "Scale-Up Plan", price: "₹74,999/month" },
          { name: "Enterprise Plan", price: "₹1.25L+/month" },
        ],
      },
      {
        title: "Performance Marketing",
        rows: [
          { name: "Meta Ads Management", price: "₹18,750+/month" },
          { name: "Google Ads Management", price: "₹25,000+/month" },
          { name: "Lead Generation Campaigns", price: "₹31,250+/month" },
          { name: "E-commerce Ads Scaling", price: "₹43,750+/month" },
          { name: "Conversion Funnel Setup", price: "₹37,500+" },
          { name: "Retargeting Campaigns", price: "₹18,750+" },
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
          { name: "Reel Shoot", price: "₹7,500/day" },
          { name: "Promo Video Production", price: "₹15,000/day" },
          { name: "Corporate Shoot", price: "₹22,500/day" },
          { name: "Event Coverage", price: "₹18,750/day" },
          { name: "Podcast Production", price: "₹25,000+" },
          { name: "Music Video Production", price: "₹62,500+" },
          { name: "Documentary Production", price: "₹43,750+" },
        ],
      },
      {
        title: "Editing Services",
        rows: [
          { name: "Reel Editing", price: "₹1,875+" },
          { name: "YouTube Video Editing", price: "₹5,000+" },
          { name: "Corporate Editing", price: "₹12,500+" },
          { name: "Motion Graphics", price: "₹10,000+" },
          { name: "VFX Editing", price: "₹18,750+" },
          { name: "Thumbnail Design", price: "₹1,249+" },
        ],
      },
      {
        title: "Production Add-ons",
        rows: [
          { name: "Drone Shoot", price: "₹9,375/day" },
          { name: "Insta360 Shoot", price: "₹6,250/day" },
          { name: "Voiceover", price: "₹4,375+" },
          { name: "Scriptwriting", price: "₹9,375+" },
          { name: "Studio Setup", price: "₹18,750/day" },
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
          { name: "Landing Page Website", price: "₹18,750+" },
          { name: "Business Website", price: "₹43,750+" },
          { name: "Corporate Website", price: "₹93,750+" },
          { name: "Portfolio Website", price: "₹25,000+" },
          { name: "News / Blog Website", price: "₹50,000+" },
        ],
      },
      {
        title: "E-Commerce Development",
        rows: [
          { name: "Shopify Store", price: "₹56,250+" },
          { name: "WooCommerce Store", price: "₹68,750+" },
          { name: "Custom E-commerce Platform", price: "₹2.5L+" },
          { name: "Marketplace Development", price: "₹5L+" },
          { name: "Quick Commerce Platform", price: "₹6.25L+" },
        ],
      },
      {
        title: "Premium Web Development",
        rows: [
          { name: "React.js Website", price: "₹75,000+" },
          { name: "Next.js Platform", price: "₹1.25L+" },
          { name: "MERN Stack Application", price: "₹2.5L+" },
          { name: "SaaS MVP Development", price: "₹5L+" },
          { name: "Custom Admin Dashboard", price: "₹93,750+" },
          { name: "CRM / ERP System", price: "₹3.75L+" },
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
          { name: "Android App Development", price: "₹1.25L+" },
          { name: "iOS App Development", price: "₹1.875L+" },
          { name: "Flutter App Development", price: "₹1.875L+" },
          { name: "React Native App", price: "₹1.875L+" },
          { name: "Food Delivery App", price: "₹5L+" },
          { name: "Booking App", price: "₹3.75L+" },
          { name: "E-commerce App", price: "₹4.375L+" },
          { name: "Custom Startup App", price: "₹7.5L+" },
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
          { name: "AI Chatbot Development", price: "₹62,500+" },
          { name: "GPT Integration", price: "₹43,750+" },
          { name: "AI Customer Support System", price: "₹1.25L+" },
          { name: "AI Workflow Automation", price: "₹93,750+" },
          { name: "AI SaaS Development", price: "₹7.5L+" },
          { name: "AI Recommendation System", price: "₹2.5L+" },
        ],
      },
      {
        title: "Automation Services",
        rows: [
          { name: "WhatsApp Automation", price: "₹31,250+" },
          { name: "CRM Automation", price: "₹50,000+" },
          { name: "Email Automation Funnel", price: "₹43,750+" },
          { name: "Lead Management Automation", price: "₹62,500+" },
          { name: "Business Workflow Automation", price: "₹1.25L+" },
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
          { name: "Razorpay Integration", price: "₹18,750+" },
          { name: "Cashfree Integration", price: "₹22,500+" },
          { name: "PhonePe Payment Integration", price: "₹25,000+" },
          { name: "Subscription Billing System", price: "₹1.25L+" },
          { name: "Wallet System Development", price: "₹2.5L+" },
          { name: "Payout System Development", price: "₹3.125L+" },
        ],
      },
      {
        title: "Fintech Platforms",
        rows: [
          { name: "GST Billing Software", price: "₹1.25L+" },
          { name: "Invoice Management Platform", price: "₹1.875L+" },
          { name: "Fintech Dashboard", price: "₹3.75L+" },
          { name: "Banking API Integration", price: "₹2.5L+" },
          { name: "KYC Verification Integration", price: "₹62,500+" },
          { name: "Loan Management System", price: "₹5L+" },
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
          { name: "Amazon Seller Setup", price: "₹12,500+" },
          { name: "Flipkart Seller Setup", price: "₹12,500+" },
          { name: "Myntra Setup", price: "₹22,500+" },
          { name: "Meesho Setup", price: "₹9,375+" },
          { name: "Blinkit / Zepto Setup", price: "₹31,250+" },
        ],
      },
      {
        title: "Marketplace Management",
        rows: [
          { name: "Product Upload", price: "₹94/product" },
          { name: "Marketplace Management", price: "₹18,750+/month" },
          { name: "Quick Commerce Management", price: "₹50,000+/month" },
          { name: "Inventory Automation", price: "₹25,000+" },
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
          { name: "Basic SEO", price: "₹12,500+/month" },
          { name: "Advanced SEO", price: "₹37,500+/month" },
          { name: "Enterprise SEO", price: "₹93,750+/month" },
          { name: "Technical SEO Audit", price: "₹25,000+" },
          { name: "Backlink Building", price: "₹18,750+" },
          { name: "Local SEO", price: "₹22,500+/month" },
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
          { name: "WhatsApp API Setup", price: "₹18,750+" },
          { name: "Bulk WhatsApp Marketing", price: "₹25,000+/month" },
          { name: "Email Marketing Setup", price: "₹12,500+" },
          { name: "Email Automation Funnel", price: "₹43,750+" },
          { name: "SMS Gateway Integration", price: "₹18,750+" },
          { name: "CRM Integration", price: "₹62,500+" },
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
          { name: "Shared Hosting Setup", price: "₹6,250/year" },
          { name: "VPS Hosting Setup", price: "₹25,000+" },
          { name: "AWS Deployment", price: "₹43,750+" },
          { name: "Docker Deployment", price: "₹31,250+" },
          { name: "CI/CD Pipeline Setup", price: "₹37,500+" },
          { name: "Server Optimization", price: "₹25,000+" },
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
          { name: "REST API Development", price: "₹31,250+" },
          { name: "GraphQL API Development", price: "₹50,000+" },
          { name: "Backend Architecture Setup", price: "₹93,750+" },
          { name: "Microservices Architecture", price: "₹2.5L+" },
          { name: "Firebase Integration", price: "₹18,750+" },
          { name: "PostgreSQL / MongoDB Setup", price: "₹25,000+" },
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
          { name: "Domain & Hosting Setup", price: "₹9,375+" },
          { name: "Speed Optimization", price: "₹18,750+" },
          { name: "Website Security Hardening", price: "₹25,000+" },
          { name: "API Integrations", price: "₹25,000+" },
          { name: "Analytics Dashboard", price: "₹1.25L+" },
          { name: "Admin Panel Development", price: "₹62,500+" },
          { name: "Third-Party Integrations", price: "₹31,250+" },
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
          { name: "Startup Launch Package", price: "₹2.5L+" },
          { name: "D2C Brand Launch Package", price: "₹3.75L+" },
          { name: "Restaurant Digital Package", price: "₹1.25L+" },
          { name: "Influencer Growth Package", price: "₹93,750+" },
          { name: "SaaS Startup Package", price: "₹8.75L+" },
          { name: "Full Digital Transformation", price: "₹18.75L+" },
        ],
      },
    ],
  },
];

const ServicesPage = () => (
  <main>
    {/* Hero */}
    <section className="relative gradient-bg-hero pt-32 pb-16">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="badge-dreamy mb-6 inline-block">🚀 Services & Pricing</span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-balance">
            Everything You Need to <span className="gradient-text">Scale & Dominate</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you need a brand from scratch, a fully-automated funnel, or a custom SaaS platform — we've got you covered. <strong className="text-foreground">All-inclusive packages with transparent pricing and zero surprises.</strong>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-medium">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              ✓ 150+ Projects Delivered
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              ✓ 4.2x Avg ROI
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              ✓ Fixed-Price Packages
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
            <p className="text-3xl font-display font-bold gradient-text mb-2">Fixed Pricing</p>
            <p className="text-sm text-muted-foreground">No hidden fees. No surprises. Transparent, all-inclusive packages.</p>
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
                      <li key={r.name} className="flex items-center justify-between py-3 gap-4">
                        <span className="text-sm text-foreground">{r.name}</span>
                        <span className="text-sm font-semibold text-primary whitespace-nowrap">{r.price}</span>
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
            Our pricing covers 90% of common projects. But if you need something custom — whether it's a unique SaaS platform, a complex automation system, or a full digital transformation — we'll work with you to create the perfect solution.
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

export default ServicesPage;

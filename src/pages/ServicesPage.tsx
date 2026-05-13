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
          { name: "Basic Logo Design", price: "₹4,999" },
          { name: "Premium Logo Design", price: "₹12,000+" },
          { name: "Luxury Brand Identity", price: "₹25,000+" },
          { name: "Brand Guidelines Book", price: "₹15,000+" },
          { name: "Brand Naming & Strategy", price: "₹20,000+" },
        ],
      },
      {
        title: "Marketing Design",
        rows: [
          { name: "Social Media Post Design", price: "₹599/post" },
          { name: "Premium Creative Design", price: "₹1,200/post" },
          { name: "Carousel Design", price: "₹2,500+" },
          { name: "Story Design", price: "₹350/story" },
          { name: "Flyer / Poster Design", price: "₹1,200+" },
          { name: "Brochure Design", price: "₹7,500+" },
          { name: "Catalogue Design", price: "₹5,000+" },
          { name: "Pitch Deck Design", price: "₹10,000+" },
          { name: "Packaging Design", price: "₹5,000+" },
        ],
      },
      {
        title: "Business Essentials",
        rows: [
          { name: "Business Card Design", price: "₹999" },
          { name: "Letterhead Design", price: "₹799" },
          { name: "Email Signature Design", price: "₹999" },
          { name: "ID Card Design", price: "₹799" },
          { name: "Invoice Design", price: "₹1,500+" },
          { name: "Company Profile Design", price: "₹12,000+" },
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
          { name: "Starter Plan", price: "₹7,999/month" },
          { name: "Growth Plan", price: "₹14,999/month" },
          { name: "Business Plan", price: "₹29,999/month" },
          { name: "Scale-Up Plan", price: "₹59,999/month" },
          { name: "Enterprise Plan", price: "₹1L+/month" },
        ],
      },
      {
        title: "Performance Marketing",
        rows: [
          { name: "Meta Ads Management", price: "₹15,000+/month" },
          { name: "Google Ads Management", price: "₹20,000+/month" },
          { name: "Lead Generation Campaigns", price: "₹25,000+/month" },
          { name: "E-commerce Ads Scaling", price: "₹35,000+/month" },
          { name: "Conversion Funnel Setup", price: "₹30,000+" },
          { name: "Retargeting Campaigns", price: "₹15,000+" },
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
          { name: "Reel Shoot", price: "₹6,000/day" },
          { name: "Promo Video Production", price: "₹12,000/day" },
          { name: "Corporate Shoot", price: "₹18,000/day" },
          { name: "Event Coverage", price: "₹15,000/day" },
          { name: "Podcast Production", price: "₹20,000+" },
          { name: "Music Video Production", price: "₹50,000+" },
          { name: "Documentary Production", price: "₹35,000+" },
        ],
      },
      {
        title: "Editing Services",
        rows: [
          { name: "Reel Editing", price: "₹1,500+" },
          { name: "YouTube Video Editing", price: "₹4,000+" },
          { name: "Corporate Editing", price: "₹10,000+" },
          { name: "Motion Graphics", price: "₹8,000+" },
          { name: "VFX Editing", price: "₹15,000+" },
          { name: "Thumbnail Design", price: "₹999+" },
        ],
      },
      {
        title: "Production Add-ons",
        rows: [
          { name: "Drone Shoot", price: "₹7,500/day" },
          { name: "Insta360 Shoot", price: "₹5,000/day" },
          { name: "Voiceover", price: "₹3,500+" },
          { name: "Scriptwriting", price: "₹7,500+" },
          { name: "Studio Setup", price: "₹15,000/day" },
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
          { name: "Landing Page Website", price: "₹15,000+" },
          { name: "Business Website", price: "₹35,000+" },
          { name: "Corporate Website", price: "₹75,000+" },
          { name: "Portfolio Website", price: "₹20,000+" },
          { name: "News / Blog Website", price: "₹40,000+" },
        ],
      },
      {
        title: "E-Commerce Development",
        rows: [
          { name: "Shopify Store", price: "₹45,000+" },
          { name: "WooCommerce Store", price: "₹55,000+" },
          { name: "Custom E-commerce Platform", price: "₹2L+" },
          { name: "Marketplace Development", price: "₹4L+" },
          { name: "Quick Commerce Platform", price: "₹5L+" },
        ],
      },
      {
        title: "Premium Web Development",
        rows: [
          { name: "React.js Website", price: "₹60,000+" },
          { name: "Next.js Platform", price: "₹1L+" },
          { name: "MERN Stack Application", price: "₹2L+" },
          { name: "SaaS MVP Development", price: "₹4L+" },
          { name: "Custom Admin Dashboard", price: "₹75,000+" },
          { name: "CRM / ERP System", price: "₹3L+" },
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
          { name: "Android App Development", price: "₹1L+" },
          { name: "iOS App Development", price: "₹1.5L+" },
          { name: "Flutter App Development", price: "₹1.5L+" },
          { name: "React Native App", price: "₹1.5L+" },
          { name: "Food Delivery App", price: "₹4L+" },
          { name: "Booking App", price: "₹3L+" },
          { name: "E-commerce App", price: "₹3.5L+" },
          { name: "Custom Startup App", price: "₹6L+" },
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
          { name: "AI Chatbot Development", price: "₹50,000+" },
          { name: "GPT Integration", price: "₹35,000+" },
          { name: "AI Customer Support System", price: "₹1L+" },
          { name: "AI Workflow Automation", price: "₹75,000+" },
          { name: "AI SaaS Development", price: "₹6L+" },
          { name: "AI Recommendation System", price: "₹2L+" },
        ],
      },
      {
        title: "Automation Services",
        rows: [
          { name: "WhatsApp Automation", price: "₹25,000+" },
          { name: "CRM Automation", price: "₹40,000+" },
          { name: "Email Automation Funnel", price: "₹35,000+" },
          { name: "Lead Management Automation", price: "₹50,000+" },
          { name: "Business Workflow Automation", price: "₹1L+" },
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
          { name: "Razorpay Integration", price: "₹15,000+" },
          { name: "Cashfree Integration", price: "₹18,000+" },
          { name: "PhonePe Payment Integration", price: "₹20,000+" },
          { name: "Subscription Billing System", price: "₹1L+" },
          { name: "Wallet System Development", price: "₹2L+" },
          { name: "Payout System Development", price: "₹2.5L+" },
        ],
      },
      {
        title: "Fintech Platforms",
        rows: [
          { name: "GST Billing Software", price: "₹1L+" },
          { name: "Invoice Management Platform", price: "₹1.5L+" },
          { name: "Fintech Dashboard", price: "₹3L+" },
          { name: "Banking API Integration", price: "₹2L+" },
          { name: "KYC Verification Integration", price: "₹50,000+" },
          { name: "Loan Management System", price: "₹4L+" },
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
          { name: "Amazon Seller Setup", price: "₹10,000+" },
          { name: "Flipkart Seller Setup", price: "₹10,000+" },
          { name: "Myntra Setup", price: "₹18,000+" },
          { name: "Meesho Setup", price: "₹7,500+" },
          { name: "Blinkit / Zepto Setup", price: "₹25,000+" },
        ],
      },
      {
        title: "Marketplace Management",
        rows: [
          { name: "Product Upload", price: "₹75/product" },
          { name: "Marketplace Management", price: "₹15,000+/month" },
          { name: "Quick Commerce Management", price: "₹40,000+/month" },
          { name: "Inventory Automation", price: "₹20,000+" },
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
          { name: "Basic SEO", price: "₹10,000+/month" },
          { name: "Advanced SEO", price: "₹30,000+/month" },
          { name: "Enterprise SEO", price: "₹75,000+/month" },
          { name: "Technical SEO Audit", price: "₹20,000+" },
          { name: "Backlink Building", price: "₹15,000+" },
          { name: "Local SEO", price: "₹18,000+/month" },
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
          { name: "WhatsApp API Setup", price: "₹15,000+" },
          { name: "Bulk WhatsApp Marketing", price: "₹20,000+/month" },
          { name: "Email Marketing Setup", price: "₹10,000+" },
          { name: "Email Automation Funnel", price: "₹35,000+" },
          { name: "SMS Gateway Integration", price: "₹15,000+" },
          { name: "CRM Integration", price: "₹50,000+" },
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
          { name: "Shared Hosting Setup", price: "₹5,000/year" },
          { name: "VPS Hosting Setup", price: "₹20,000+" },
          { name: "AWS Deployment", price: "₹35,000+" },
          { name: "Docker Deployment", price: "₹25,000+" },
          { name: "CI/CD Pipeline Setup", price: "₹30,000+" },
          { name: "Server Optimization", price: "₹20,000+" },
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
          { name: "REST API Development", price: "₹25,000+" },
          { name: "GraphQL API Development", price: "₹40,000+" },
          { name: "Backend Architecture Setup", price: "₹75,000+" },
          { name: "Microservices Architecture", price: "₹2L+" },
          { name: "Firebase Integration", price: "₹15,000+" },
          { name: "PostgreSQL / MongoDB Setup", price: "₹20,000+" },
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
          { name: "Domain & Hosting Setup", price: "₹7,500+" },
          { name: "Speed Optimization", price: "₹15,000+" },
          { name: "Website Security Hardening", price: "₹20,000+" },
          { name: "API Integrations", price: "₹20,000+" },
          { name: "Analytics Dashboard", price: "₹1L+" },
          { name: "Admin Panel Development", price: "₹50,000+" },
          { name: "Third-Party Integrations", price: "₹25,000+" },
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
          { name: "Startup Launch Package", price: "₹2L+" },
          { name: "D2C Brand Launch Package", price: "₹3L+" },
          { name: "Restaurant Digital Package", price: "₹1L+" },
          { name: "Influencer Growth Package", price: "₹75,000+" },
          { name: "SaaS Startup Package", price: "₹7L+" },
          { name: "Full Digital Transformation", price: "₹15L+" },
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
            Premium Solutions <span className="gradient-text">Built to Scale</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Creative • Technology • Marketing • Automation • Fintech — built for startups, brands, creators & enterprises.
          </p>
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
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Need a <span className="gradient-text">custom quote</span>?
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-xl mx-auto">
            Tell us about your project. We'll tailor a package that fits your goals and budget.
          </p>
          <Link to="/contact" className="btn-dreamy inline-block mt-8">
            Get a Custom Quote
          </Link>
        </motion.div>
      </div>
    </section>
  </main>
);

export default ServicesPage;

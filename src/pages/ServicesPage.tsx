import { motion } from "framer-motion";
import { BarChart3, Palette, Globe, Bot, Layers, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";

const services = [
  {
    icon: BarChart3,
    title: "Performance Marketing",
    desc: "We create and manage ad campaigns designed to maximize ROI and scale profitably.",
    features: ["Meta Ads", "Google Ads", "Funnel Strategy", "Conversion Tracking", "Retargeting Systems"],
  },
  {
    icon: Palette,
    title: "Branding & Identity",
    desc: "We build brands that stand out and stay memorable.",
    features: ["Logo Design", "Brand Guidelines", "Positioning Strategy", "Creative Direction"],
  },
  {
    icon: Globe,
    title: "Development",
    desc: "We build fast, scalable, and conversion-focused digital platforms.",
    features: ["Websites", "Landing Pages", "E-commerce Stores", "SaaS Platforms"],
  },
  {
    icon: Bot,
    title: "AI Automation",
    desc: "We automate repetitive work so you can focus on growth.",
    features: ["Lead Systems", "CRM Integration", "Chatbots", "Workflow Automation"],
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    desc: "We design experiences that users love — and convert.",
    features: ["Wireframing", "UI Design", "UX Optimization", "Product Design"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

const ServicesPage = () => (
  <main>
    <section className="relative min-h-[60vh] flex items-center justify-center hero-gradient-bg pt-32 pb-16">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
            Our Services
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            Services Built for <span className="gradient-text">Growth</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Everything you need to build, launch, and scale — under one roof.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto space-y-20">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`flex flex-col md:flex-row gap-10 items-start ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="flex-1">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.desc}</p>
            </div>
            <div className="flex-1 glass-card gradient-border p-8 w-full">
              <ul className="space-y-3">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="section-padding hero-gradient-bg">
      <div className="container mx-auto text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Ready to <span className="gradient-text">Get Started</span>?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">Let's discuss your project and find the perfect solution.</p>
          <Link
            to="/contact"
            className="magnetic-btn inline-block mt-8 px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold neon-glow hover:scale-105 transition-transform text-base"
          >
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  </main>
);

export default ServicesPage;

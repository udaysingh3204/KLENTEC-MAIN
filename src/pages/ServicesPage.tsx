import { motion } from "framer-motion";
import { BarChart3, Palette, Globe, Bot, Layers, Check } from "lucide-react";
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
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const ServicesPage = () => (
  <main>
    <section className="relative gradient-bg-hero pt-32 pb-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="badge-pill mb-6 inline-block">Our Services</span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            Services Built for <span className="gradient-text">Growth</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-lg mx-auto">
            Everything you need to build, launch, and scale — under one roof.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto space-y-16">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            {...fadeUp}
            className={`flex flex-col md:flex-row gap-10 items-start ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="flex-1">
              <div className="icon-box-lg mb-5">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">{s.title}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
            <div className="flex-1 card-elevated p-8 w-full">
              <ul className="space-y-3">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="section-padding gradient-bg-subtle">
      <div className="container mx-auto text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Ready to <span className="gradient-text">Get Started</span>?
          </h2>
          <p className="mt-4 text-muted-foreground text-base">Let's discuss your project and find the perfect solution.</p>
          <Link to="/contact" className="btn-primary-gradient inline-block mt-8 px-10 py-4 text-base">
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  </main>
);

export default ServicesPage;

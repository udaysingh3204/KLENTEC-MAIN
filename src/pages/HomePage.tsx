import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, BarChart3, Globe, Bot, Palette,
  TrendingUp, Target, Rocket, Layers, ArrowRight, ChevronDown
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { icon: BarChart3, title: "Performance Marketing", desc: "Run ads that don't just spend — they scale." },
  { icon: Palette, title: "Branding & Identity", desc: "Turn your brand into something people remember." },
  { icon: Globe, title: "Website & App Development", desc: "Not just websites — high-converting digital assets." },
  { icon: Bot, title: "AI Automation", desc: "Automate your growth and operations." },
  { icon: Layers, title: "UI/UX Design", desc: "Design that doesn't just look good — it converts." },
];

const differentiators = [
  { icon: TrendingUp, title: "Data-Driven Decisions", desc: "Every move we make is backed by data, not guesswork." },
  { icon: Target, title: "Built for Conversions", desc: "Design + marketing aligned for one goal — growth." },
  { icon: Rocket, title: "Speed & Execution", desc: "We move fast, test fast, and scale what works." },
  { icon: Layers, title: "Scalable Systems", desc: "We build systems that grow with you." },
];

const caseStudies = [
  { title: "E-commerce Brand", result: "3X ROAS", detail: "In just 60 days through targeted campaigns" },
  { title: "Local Service Business", result: "5X Lead Gen", detail: "Transformed digital presence and pipeline" },
  { title: "Startup Launch", result: "0 → 10K Users", detail: "From concept to traction in record time" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const HomePage = () => (
  <main>
    {/* HERO */}
    <section className="relative min-h-screen flex items-center justify-center gradient-bg-hero overflow-hidden">
      <div className="container mx-auto px-6 pt-28 pb-20 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="badge-pill mb-8 inline-flex">
            <Zap className="w-3.5 h-3.5" />
            Digital Growth Partner
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto"
        >
          We Don't Build Websites.{" "}
          <span className="gradient-text">We Build Digital Machines.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          KLENTEC helps brands scale faster with performance marketing, conversion-focused design, and powerful development systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/contact" className="btn-primary-gradient px-8 py-3.5 text-base">
            Start a Project
          </Link>
          <Link to="/work" className="btn-secondary-clean px-8 py-3.5 text-base">
            View Our Work
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-xs text-muted-foreground"
        >
          Built for brands that want growth, not just presence.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { label: "Avg. ROAS", value: "4.2X" },
            { label: "Projects Delivered", value: "150+" },
            { label: "Client Retention", value: "95%" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="card-elevated p-6 text-center animate-float"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <p className="text-2xl font-display font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </div>
    </section>

    {/* SOCIAL PROOF */}
    <section className="divider-subtle py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          Trusted by fast-growing brands, startups, and ambitious founders.
        </p>
      </div>
    </section>

    {/* SERVICES */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading
          badge="Services"
          title="Everything You Need to Scale"
          subtitle="From strategy to execution, we build systems that drive real business growth."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-elevated p-7 group cursor-default"
            >
              <div className="icon-box mb-5 group-hover:scale-110 transition-transform duration-200">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* WHY KLENTEC */}
    <section className="section-padding gradient-bg-subtle">
      <div className="container mx-auto">
        <SectionHeading badge="Why Us" title="Why Brands Choose KLENTEC" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center p-6"
            >
              <div className="icon-box-lg mx-auto mb-5">
                <d.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-display font-bold text-foreground">{d.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CASE STUDIES */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading
          badge="Case Studies"
          title="Real Work. Real Growth."
          subtitle="We measure success in numbers, not opinions."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {caseStudies.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-elevated p-7 group"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{c.title}</p>
              <p className="text-3xl font-display font-bold gradient-text mt-3">{c.result}</p>
              <p className="mt-3 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {c.detail}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/work" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm">
            View All Case Studies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* FINAL CTA */}
    <section className="section-padding gradient-bg-subtle">
      <div className="container mx-auto text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Ready to <span className="gradient-text">Scale Your Business</span>?
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto">
            Let's build something that actually drives results.
          </p>
          <Link
            to="/contact"
            className="btn-primary-gradient inline-block mt-8 px-10 py-4 text-base"
          >
            Book a Call
          </Link>
        </motion.div>
      </div>
    </section>
  </main>
);

export default HomePage;

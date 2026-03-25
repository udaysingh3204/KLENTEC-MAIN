import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap, BarChart3, Globe, Bot, Palette, ChevronDown,
  TrendingUp, Target, Rocket, Layers, ArrowRight
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { icon: BarChart3, title: "Performance Marketing", desc: "Run ads that don't just spend — they scale.", color: "neon-blue" },
  { icon: Palette, title: "Branding & Identity", desc: "Turn your brand into something people remember.", color: "neon-purple" },
  { icon: Globe, title: "Website & App Development", desc: "Not just websites — high-converting digital assets.", color: "neon-green" },
  { icon: Bot, title: "AI Automation", desc: "Automate your growth and operations.", color: "neon-blue" },
  { icon: Layers, title: "UI/UX Design", desc: "Design that doesn't just look good — it converts.", color: "neon-purple" },
];

const differentiators = [
  { icon: TrendingUp, title: "Data-Driven Decisions", desc: "Every move we make is backed by data, not guesswork." },
  { icon: Target, title: "Built for Conversions", desc: "Design + marketing aligned for one goal — growth." },
  { icon: Rocket, title: "Speed & Execution", desc: "We move fast, test fast, and scale what works." },
  { icon: Layers, title: "Scalable Systems", desc: "We don't just deliver — we build systems that grow with you." },
];

const caseStudies = [
  { title: "E-commerce Brand", result: "3X ROAS", detail: "In just 60 days through targeted campaigns" },
  { title: "Local Service Business", result: "5X Lead Gen", detail: "Transformed digital presence and pipeline" },
  { title: "Startup Launch", result: "0 → 10K Users", detail: "From concept to traction in record time" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

const HomePage = () => (
  <main>
    {/* HERO */}
    <section className="relative min-h-screen flex items-center justify-center hero-gradient-bg grid-bg overflow-hidden">
      {/* Floating glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-blue/5 blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-6 pt-32 pb-20 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-8">
            Digital Growth Partner
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight leading-tight max-w-5xl mx-auto"
        >
          We Don't Build Websites.{" "}
          <span className="gradient-text">We Build Digital Machines.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          KLENTEC helps brands scale faster with performance marketing, conversion-focused design, and powerful development systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/contact"
            className="magnetic-btn px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold neon-glow hover:scale-105 transition-transform duration-200 text-base"
          >
            Start a Project
          </Link>
          <Link
            to="/work"
            className="magnetic-btn px-8 py-4 rounded-full glass-card text-foreground font-semibold hover:scale-105 transition-transform duration-200 text-base border border-white/10"
          >
            View Our Work
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-xs text-muted-foreground"
        >
          Built for brands that want growth, not just presence.
        </motion.p>

        {/* Floating stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: "Avg. ROAS", value: "4.2X" },
            { label: "Projects Delivered", value: "150+" },
            { label: "Client Retention", value: "95%" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card gradient-border p-6 animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
              <p className="text-2xl font-display font-bold gradient-text-blue">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-scroll-indicator" />
      </div>
    </section>

    {/* SOCIAL PROOF */}
    <section className="border-y border-white/5 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground tracking-wide">
          Trusted by fast-growing brands, startups, and ambitious founders.
        </p>
      </div>
    </section>

    {/* SERVICES */}
    <section className="section-padding">
      <div className="container mx-auto">
        <SectionHeading
          badge="Services"
          title="Everything You Need to Scale — In One Place"
          subtitle="From strategy to execution, we build systems that drive real business growth."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card gradient-border p-8 group hover:scale-[1.03] transition-transform duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:neon-glow transition-shadow duration-300">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* WHY KLENTEC */}
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <SectionHeading badge="Why Us" title="Why Brands Choose KLENTEC" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <d.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">{d.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card gradient-border p-8 group hover:scale-[1.03] transition-transform duration-300"
            >
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{c.title}</p>
              <p className="text-4xl font-display font-bold gradient-text-blue mt-3">{c.result}</p>
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
    <section className="section-padding hero-gradient-bg">
      <div className="container mx-auto text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            Ready to <span className="gradient-text">Scale Your Business</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Let's build something that actually drives results.
          </p>
          <Link
            to="/contact"
            className="magnetic-btn inline-block mt-8 px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold neon-glow hover:scale-105 transition-transform duration-200 text-base"
          >
            Book a Call
          </Link>
        </motion.div>
      </div>
    </section>
  </main>
);

export default HomePage;

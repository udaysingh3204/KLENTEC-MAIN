import { motion } from "framer-motion";
import { Crosshair, Eye, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

const timeline = [
  { year: "2022", title: "Founded", desc: "KLENTEC was born with a mission to help brands grow digitally." },
  { year: "2023", title: "Scaled Operations", desc: "Expanded team, delivered 80+ projects across industries." },
  { year: "2024", title: "AI Integration", desc: "Launched AI automation services for growth-focused brands." },
  { year: "2025", title: "Global Reach", desc: "Working with clients across 5+ countries." },
];

const AboutPage = () => (
  <main>
    <section className="relative min-h-[60vh] flex items-center justify-center hero-gradient-bg pt-32 pb-16">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            Built for the Future of <span className="gradient-text">Digital Growth</span>
          </h1>
        </motion.div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div {...fadeUp} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            KLENTEC was created with one goal — to help brands grow faster in a digital-first world.
          </p>
          <p>
            Most agencies focus on deliverables. <span className="text-foreground font-medium">We focus on outcomes.</span>
          </p>
          <p>
            We combine marketing, design, and technology to build systems that don't just look good — but perform.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Crosshair, title: "Mission", desc: "To help ambitious brands scale using powerful digital systems." },
            { icon: Eye, title: "Vision", desc: "To become a global growth partner for startups and modern businesses." },
            { icon: Zap, title: "Approach", desc: "We don't believe in guesswork. We test, optimize, and scale what works." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card gradient-border p-8 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="section-padding">
      <div className="container mx-auto max-w-2xl">
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-display font-bold text-center mb-16">
          Our <span className="gradient-text">Journey</span>
        </motion.h2>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:text-${i % 2 === 0 ? "right" : "left"}`}
            >
              <div className="hidden md:block flex-1" />
              <div className="relative z-10 w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-primary font-semibold">{t.year}</p>
                <h3 className="text-lg font-display font-bold text-foreground">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding hero-gradient-bg">
      <div className="container mx-auto text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Let's Build <span className="gradient-text">Together</span>
          </h2>
          <Link
            to="/contact"
            className="magnetic-btn inline-block mt-8 px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold neon-glow hover:scale-105 transition-transform text-base"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  </main>
);

export default AboutPage;

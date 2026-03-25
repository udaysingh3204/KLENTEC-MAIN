import { motion } from "framer-motion";
import { Crosshair, Eye, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const timeline = [
  { year: "2022", title: "Founded", desc: "KLENTEC was born with a mission to help brands grow digitally." },
  { year: "2023", title: "Scaled Operations", desc: "Expanded team, delivered 80+ projects across industries." },
  { year: "2024", title: "AI Integration", desc: "Launched AI automation services for growth-focused brands." },
  { year: "2025", title: "Global Reach", desc: "Working with clients across 5+ countries." },
];

const AboutPage = () => (
  <main>
    <section className="relative gradient-bg-hero pt-32 pb-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="badge-pill mb-6 inline-block">About Us</span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            Built for the Future of <span className="gradient-text">Digital Growth</span>
          </h1>
        </motion.div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div {...fadeUp} className="space-y-5 text-lg text-muted-foreground leading-relaxed">
          <p>KLENTEC was created with one goal — to help brands grow faster in a digital-first world.</p>
          <p>Most agencies focus on deliverables. <span className="text-foreground font-semibold">We focus on outcomes.</span></p>
          <p>We combine marketing, design, and technology to build systems that don't just look good — but perform.</p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding gradient-bg-subtle">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Crosshair, title: "Mission", desc: "To help ambitious brands scale using powerful digital systems." },
            { icon: Eye, title: "Vision", desc: "To become a global growth partner for startups and modern businesses." },
            { icon: Zap, title: "Approach", desc: "We don't believe in guesswork. We test, optimize, and scale what works." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-elevated p-8 text-center"
            >
              <div className="icon-box-lg mx-auto mb-5">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto max-w-2xl">
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-display font-bold text-center mb-14">
          Our <span className="gradient-text">Journey</span>
        </motion.h2>
        <div className="relative">
          <div className="absolute left-[15px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative flex items-start gap-6 mb-10 pl-10 md:pl-0"
            >
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 w-[30px] h-[30px] rounded-full bg-background border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="md:ml-[calc(50%+24px)]">
                <p className="text-xs text-primary font-bold">{t.year}</p>
                <h3 className="text-base font-display font-bold text-foreground">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding gradient-bg-subtle">
      <div className="container mx-auto text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl md:text-5xl font-display font-bold">
            Let's Build <span className="gradient-text">Together</span>
          </h2>
          <Link to="/contact" className="btn-primary-gradient inline-block mt-8 px-10 py-4 text-base">
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  </main>
);

export default AboutPage;

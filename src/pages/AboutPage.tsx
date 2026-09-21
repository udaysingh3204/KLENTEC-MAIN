import { motion } from "framer-motion";
import { Crosshair, Eye, Zap, Users, Award, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const timeline = [
  { year: "2021", title: "Founded", desc: "Uday Singh founded KLENTEC, working hands-on across project management, backend, and frontend — acting as founder and execution team at once." },
  { year: "Since", title: "Middle East Projects", desc: "Delivered projects for clients in the Middle East, including work with Emaar and similar large-scale developments." },
  { year: "Growth", title: "Vipul Joins as Co-Founder", desc: "Vipul Kumar Singh joined as co-founder, bringing 9+ years of project management experience working with clients across the US and globally." },
  { year: "Today", title: "A Growing Team", desc: "KLENTEC now includes WordPress developers, designers, and DevOps engineers alongside the founding team." },
];

const AboutPage = () => (
  <main>
    <SEO
      title="About Us"
      description="Meet the team behind KLENTEC — our mission, values, and approach to building digital growth systems."
      path="/about"
    />
    <section className="relative gradient-bg-hero pt-32 pb-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="badge-dreamy mb-6 inline-block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">
            Founder-Led, <span className="gradient-text">Hands-On</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            KLENTEC started five years ago with one person doing everything — project management, backend, frontend. Today it's a small, founder-led team that still works that way: hands-on, every engagement.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div {...fadeUp} className="space-y-8 text-lg text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">How KLENTEC Started</h2>
            <p>KLENTEC was founded five years ago by Uday Singh, who has acted as founder and execution team at once — hands-on across project management, backend development, and frontend development from day one. That work has included projects for clients in the Middle East, including Emaar and similar large-scale developments.</p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Our Co-Founder</h2>
            <p>Vipul Kumar Singh joined as co-founder, bringing over nine years of project management experience. He's handled projects for clients across the United States and globally, adding the delivery discipline that comes from running large engagements end to end.</p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Our Team Today</h2>
            <p>Beyond the two of us, KLENTEC includes WordPress developers, designers, and DevOps engineers — a small, specialist team rather than a large agency roster. Every engagement still gets hands-on attention from the founders.</p>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="section-padding gradient-bg-subtle">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Crosshair, title: "Mission", desc: "To help ambitious brands scale using systems that compound — not one-off campaigns." },
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
      <div className="container mx-auto">
        <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-display font-bold text-center mb-14">
          Led by the <span className="gradient-text">Founders</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="card-elevated p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-1">Uday Singh</h3>
            <p className="text-sm text-primary font-semibold mb-4">Founder</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hands-on across project management, backend, and frontend since founding KLENTEC —
              including Middle East projects such as Emaar and similar developments.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="card-elevated p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-1">Vipul Kumar Singh</h3>
            <p className="text-sm text-primary font-semibold mb-4">Co-Founder</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Over nine years of project management experience, having worked with clients across
              the United States and globally.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="section-padding gradient-bg-subtle">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {[
            { icon: Target, title: "Our Commitment", desc: "Every client interaction is guided by one principle: we only succeed when you succeed. Your revenue is our revenue." },
            { icon: Award, title: "Our Approach", desc: "We combine data science, psychology, and creativity. We test everything, measure relentlessly, and scale what works." },
            { icon: Zap, title: "Our Obsession", desc: "Growth systems that are sustainable, predictable, and scalable. We build for the long game, not quick wins." },
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
      <div className="container mx-auto text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Let's Build <span className="gradient-text">Your Growth Machine</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We're not just an agency. We're a growth partner obsessed with your success. Whether you're a 5-person startup or a 500-person company, if you want to dominate your market, let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="btn-primary-gradient px-10 py-4 text-base">
              🚀 Let's Start Growing
            </Link>
            <Link to="/services" className="btn-secondary-outline px-10 py-4 text-base">
              Explore Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </main>
);

export default AboutPage;

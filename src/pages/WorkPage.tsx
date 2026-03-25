import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { useState } from "react";

const caseStudies = [
  {
    title: "E-commerce Brand",
    category: "Performance Marketing",
    result: "3X ROAS",
    icon: TrendingUp,
    problem: "The client struggled with low conversions and poor ad performance across Meta and Google.",
    solution: "We rebuilt their funnel, redesigned the landing pages, and launched targeted ad campaigns with retargeting.",
    metrics: ["3X ROAS in 60 days", "200% increase in conversions", "50% lower cost per lead"],
  },
  {
    title: "Local Service Business",
    category: "Full Package",
    result: "5X Lead Gen",
    icon: Target,
    problem: "A service business had no digital presence and relied solely on referrals for lead generation.",
    solution: "We built a high-converting website, created a brand identity, and ran local ad campaigns.",
    metrics: ["5X increase in leads", "80% lower cost per acquisition", "Brand recognition in target market"],
  },
  {
    title: "Startup Launch",
    category: "Development & Marketing",
    result: "0 → 10K Users",
    icon: Users,
    problem: "A SaaS startup needed to go from concept to market with a product and user acquisition strategy.",
    solution: "We designed and developed the platform, then executed a launch marketing campaign.",
    metrics: ["10K users in 90 days", "Product-market fit validated", "Featured in 3 publications"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

const WorkPage = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main>
      <section className="relative min-h-[60vh] flex items-center justify-center hero-gradient-bg pt-32 pb-16">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-6">
              Our Work
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
              Proof Over <span className="gradient-text">Promises</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              We don't just talk — we show results.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto space-y-8">
          {caseStudies.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card gradient-border overflow-hidden cursor-pointer"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.category}</p>
                    <h3 className="text-xl font-display font-bold text-foreground">{c.title}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-display font-bold gradient-text-blue">{c.result}</span>
                  <ArrowRight className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${expanded === i ? "rotate-90" : ""}`} />
                </div>
              </div>

              <motion.div
                initial={false}
                animate={{ height: expanded === i ? "auto" : 0, opacity: expanded === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/5 pt-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Problem</h4>
                    <p className="text-sm text-muted-foreground">{c.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Solution</h4>
                    <p className="text-sm text-muted-foreground">{c.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Results</h4>
                    <ul className="space-y-1">
                      {c.metrics.map((m) => (
                        <li key={m} className="text-sm text-accent">✓ {m}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-padding hero-gradient-bg">
        <div className="container mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Want Results Like <span className="gradient-text">These</span>?
            </h2>
            <Link
              to="/contact"
              className="magnetic-btn inline-block mt-8 px-10 py-4 rounded-full bg-primary text-primary-foreground font-semibold neon-glow hover:scale-105 transition-transform text-base"
            >
              Book a Call
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default WorkPage;

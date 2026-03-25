import { motion } from "framer-motion";
import { Search, Wrench, Rocket, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  { icon: Search, step: "01", title: "Understand", desc: "We deep dive into your business, audience, and goals." },
  { icon: Wrench, step: "02", title: "Build", desc: "We design, develop, and structure your growth engine." },
  { icon: Rocket, step: "03", title: "Launch", desc: "We deploy campaigns, funnels, and systems." },
  { icon: TrendingUp, step: "04", title: "Scale", desc: "We analyze, optimize, and multiply results." },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const HowItWorksSection = () => (
  <section className="section-padding gradient-bg-subtle">
    <div className="container mx-auto">
      <SectionHeading
        badge="Process"
        title="How We Turn Ideas Into Scalable Systems"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative text-center p-6"
          >
            <div className="text-5xl font-display font-extrabold text-primary/10 mb-2">{s.step}</div>
            <div className="icon-box mx-auto mb-4">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/3 -right-3 w-6 h-px bg-border" />
            )}
          </motion.div>
        ))}
      </div>
      <motion.p
        {...fadeUp}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="text-center mt-10 text-muted-foreground font-medium"
      >
        Simple process. <span className="gradient-text font-bold">Powerful execution.</span>
      </motion.p>
    </div>
  </section>
);

export default HowItWorksSection;

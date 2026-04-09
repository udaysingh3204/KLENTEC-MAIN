import { motion } from "framer-motion";
import { Search, Wrench, Rocket, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  { icon: Search, step: "01", title: "Understand", desc: "We deep dive into your business, audience, and goals." },
  { icon: Wrench, step: "02", title: "Build", desc: "We design, develop, and structure your growth engine." },
  { icon: Rocket, step: "03", title: "Launch", desc: "We deploy campaigns, funnels, and systems." },
  { icon: TrendingUp, step: "04", title: "Scale", desc: "We analyze, optimize, and multiply results." },
];

const HowItWorksSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <SectionHeading badge="Process" title="How We Turn Ideas Into Scalable Systems" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative text-center group"
          >
            <div className="text-6xl font-display font-extrabold text-embossed mb-4 transition-all duration-300 group-hover:text-primary/20">
              {s.step}
            </div>
            <div className="icon-dreamy-lg mx-auto mb-5">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground">{s.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 -right-4 w-8 h-px bg-border" />
            )}
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-14 text-muted-foreground font-medium"
      >
        Simple process. <span className="gradient-text font-bold">Powerful execution.</span>
      </motion.p>
    </div>
  </section>
);

export default HowItWorksSection;

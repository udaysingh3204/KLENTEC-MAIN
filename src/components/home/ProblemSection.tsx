import { motion } from "framer-motion";
import { TrendingDown, AlertCircle } from "lucide-react";
import creative1 from "@/assets/creative-1.jpg";

const ProblemSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={creative1}
            alt="Abstract orbs"
            loading="lazy"
            width={800}
            height={600}
            className="rounded-3xl w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-dreamy mb-6 inline-block">The Reality Check</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground leading-tight">
            Your Growth is Stuck.{" "}
            <span className="gradient-text">And You Don't Know Why.</span>
          </h2>
          <div className="mt-10 space-y-4 text-muted-foreground text-base leading-relaxed">
            <div className="flex gap-3">
              <TrendingDown className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p><strong className="text-foreground">Inconsistent leads?</strong> Your website looks great, but nobody's buying. Ads cost too much for what they return.</p>
            </div>
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p><strong className="text-foreground">Scattered efforts?</strong> Your design, marketing, and operations don't talk to each other. Everyone's working in silos.</p>
            </div>
            <div className="flex gap-3">
              <TrendingDown className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p><strong className="text-foreground">No strategy?</strong> You're hiring agencies that promise results, but they hand you a bill and disappear. No follow-through.</p>
            </div>
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p><strong className="text-foreground">Burning cash?</strong> Every dollar spent on marketing feels like a gamble. You can't track what's actually working.</p>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-primary/5 border border-primary/20">
            <p className="text-foreground font-semibold text-lg">
              💡 <strong>The Truth:</strong> Growth isn't about more ads or a prettier website. <span className="gradient-text">It's about building a system that works.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProblemSection;

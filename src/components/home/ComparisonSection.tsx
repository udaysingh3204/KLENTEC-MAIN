import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const traditional = [
  "Focus on deliverables",
  "Slow execution",
  "No real tracking",
  "Generic strategies",
];

const klentec = [
  "Focus on results",
  "Fast & agile",
  "Data-driven decisions",
  "Custom growth systems",
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const ComparisonSection = () => (
  <section className="section-padding gradient-bg-subtle">
    <div className="container mx-auto">
      <SectionHeading badge="Compare" title="KLENTEC vs Traditional Agencies" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <motion.div {...fadeUp} transition={{ duration: 0.4 }} className="card-elevated p-7">
          <h3 className="text-lg font-display font-bold text-muted-foreground mb-5">Traditional Agencies</h3>
          <ul className="space-y-3">
            {traditional.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <X className="w-4 h-4 text-destructive shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.4, delay: 0.1 }} className="card-elevated p-7 border-primary/30 shadow-lg shadow-primary/5">
          <h3 className="text-lg font-display font-bold gradient-text mb-5">KLENTEC</h3>
          <ul className="space-y-3">
            {klentec.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <motion.p {...fadeUp} transition={{ delay: 0.3 }} className="text-center mt-10 text-muted-foreground">
        You don't need another agency. <span className="font-semibold text-foreground">You need a growth partner.</span>
      </motion.p>
    </div>
  </section>
);

export default ComparisonSection;

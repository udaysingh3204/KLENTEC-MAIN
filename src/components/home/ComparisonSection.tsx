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

const ComparisonSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <SectionHeading badge="Compare" title="KLENTEC vs Traditional Agencies" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-dreamy p-8"
        >
          <h3 className="text-lg font-display font-bold text-muted-foreground mb-6">Traditional Agencies</h3>
          <ul className="space-y-4">
            {traditional.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <X className="w-4 h-4 text-destructive shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-dreamy p-8 border-primary/20"
          style={{ boxShadow: "0 8px 40px hsl(260 65% 55% / 0.08)" }}
        >
          <h3 className="text-lg font-display font-bold gradient-text mb-6">KLENTEC</h3>
          <ul className="space-y-4">
            {klentec.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12 text-muted-foreground"
      >
        You don't need another agency. <span className="font-semibold text-foreground">You need a growth partner.</span>
      </motion.p>
    </div>
  </section>
);

export default ComparisonSection;

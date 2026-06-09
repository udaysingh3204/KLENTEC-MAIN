import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const comparisons = [
  {
    traditional: "6+ months to first results",
    klentec: "90 days to measurable ROI",
  },
  {
    traditional: "Monthly email reports",
    klentec: "Weekly live performance dashboard",
  },
  {
    traditional: "Rotating junior team members",
    klentec: "Dedicated senior strategist",
  },
  {
    traditional: "Manual processes & spreadsheets",
    klentec: "OpenAI, n8n, Make.com automation",
  },
  {
    traditional: "Locked-in retainers, no flexibility",
    klentec: "Flexible + performance-based options",
  },
  {
    traditional: "Email communication",
    klentec: "Dedicated Slack + weekly strategy calls",
  },
];

const ComparisonSection = () => (
  <section className="section-padding gradient-bg-subtle">
    <div className="container mx-auto">
      <SectionHeading badge="Compare" title="KLENTEC vs Traditional Agencies" subtitle="Specific, quantified differences that matter for your growth." />

      <div className="max-w-4xl mx-auto">
        {comparisons.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            {/* Traditional */}
            <div className="card-dreamy p-6 border-l-4 border-destructive/40 bg-destructive/[0.02]">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{row.traditional}</p>
              </div>
            </div>

            {/* KLENTEC */}
            <div className="card-dreamy p-6 border-l-4 border-primary/60 bg-primary/[0.02]">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-foreground">{row.klentec}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-12 text-muted-foreground"
      >
        You don't need another agency. <span className="font-semibold text-foreground">You need a growth partner obsessed with your revenue.</span>
      </motion.p>
    </div>
  </section>
);

export default ComparisonSection;

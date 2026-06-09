import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const auditPoints = [
  { icon: AlertCircle, text: "Website conversion analysis" },
  { icon: CheckCircle2, text: "Ad spend efficiency review" },
  { icon: CheckCircle2, text: "SEO gap & opportunity analysis" },
  { icon: CheckCircle2, text: "Competitor positioning audit" },
  { icon: CheckCircle2, text: "Funnel drop-off identification" },
  { icon: CheckCircle2, text: "Growth opportunity scorecard" },
];

const GrowthAuditSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="card-elevated p-12 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden border border-primary/20"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/[0.05] pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">Limited to 5 free audits/month</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-2">
            Get a Free <span className="gradient-text">Growth Audit</span>
          </h2>

          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Conducted by a senior strategist. Delivered within 48 hours. Takes you 15 minutes to complete.
          </p>

          {/* Audit checklist */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {auditPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 text-left px-4 py-2 rounded-lg bg-muted/30 border border-border/50"
              >
                <point.icon className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">{point.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact#audit"
              className="btn-primary-gradient inline-flex items-center gap-2 px-8 py-4 text-base"
            >
              Claim Your Free Audit <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-muted-foreground">
              ✓ No credit card · ✓ No commitment · ✓ Actionable insights
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default GrowthAuditSection;

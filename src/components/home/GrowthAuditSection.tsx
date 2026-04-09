import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const GrowthAuditSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="card-dreamy p-12 md:p-16 text-center max-w-3xl mx-auto relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-primary/[0.03] pointer-events-none" />
        <div className="relative z-10">
          <span className="badge-dreamy mb-6 inline-block">Free Offer</span>
          <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-foreground">
            Get a Free <span className="gradient-text">Growth Audit</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground max-w-md mx-auto">
            We'll analyze your business and show you exactly where you're losing money.
          </p>
          <Link
            to="/contact"
            className="btn-dreamy inline-flex items-center gap-2 mt-10 text-base"
          >
            Get Free Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default GrowthAuditSection;

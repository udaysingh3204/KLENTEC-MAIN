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
        transition={{ duration: 0.5 }}
        className="card-elevated p-10 md:p-14 text-center max-w-3xl mx-auto border-primary/20"
      >
        <span className="badge-pill mb-5 inline-block">Free Offer</span>
        <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-foreground">
          Get a Free <span className="gradient-text">Growth Audit</span>
        </h2>
        <p className="mt-4 text-base text-muted-foreground max-w-md mx-auto">
          We'll analyze your business and show you exactly where you're losing money.
        </p>
        <Link
          to="/contact"
          className="btn-primary-gradient inline-flex items-center gap-2 mt-8 px-8 py-3.5 text-base"
        >
          Get Free Audit <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default GrowthAuditSection;

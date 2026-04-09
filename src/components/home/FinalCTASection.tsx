import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTASection = () => (
  <section className="section-padding relative overflow-hidden">
    {/* Background elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
    </div>

    <div className="container mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight leading-tight">
          This Isn't Just a Website Upgrade.{" "}
          <span className="gradient-text">It's a Business Upgrade.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          If you're ready to scale, we're ready to build.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact" className="btn-dreamy px-12 py-5 text-base">
            Start Your Project
          </Link>
          <Link to="/contact" className="btn-ghost px-12 py-5 text-base">
            Book a Call
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTASection;

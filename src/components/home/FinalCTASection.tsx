import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const FinalCTASection = () => (
  <section className="section-padding gradient-bg-subtle">
    <div className="container mx-auto text-center">
      <motion.div {...fadeUp}>
        <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight leading-tight">
          This Isn't Just a Website Upgrade.{" "}
          <span className="gradient-text">It's a Business Upgrade.</span>
        </h2>
        <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto">
          If you're ready to scale, we're ready to build.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/contact" className="btn-primary-gradient px-10 py-4 text-base">
            Start Your Project
          </Link>
          <Link to="/contact" className="btn-secondary-clean px-10 py-4 text-base">
            Book a Call
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FinalCTASection;

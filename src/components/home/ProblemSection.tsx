import { motion } from "framer-motion";

const ProblemSection = () => (
  <section className="section-padding">
    <div className="container mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <span className="badge-pill mb-6 inline-block">The Problem</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground leading-tight">
          Most Businesses Don't Have a Growth Problem.{" "}
          <span className="gradient-text">They Have a System Problem.</span>
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-8 space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed"
      >
        <p>You've tried ads. You've built a website. Maybe even hired an agency.</p>
        <p>But nothing scales consistently.</p>
        <p>That's because growth isn't about isolated efforts — it's about building a <strong className="text-foreground">complete system</strong>.</p>
        <p className="text-foreground font-semibold font-display text-lg md:text-xl mt-6">
          At KLENTEC, we don't fix parts. We build machines.
        </p>
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;

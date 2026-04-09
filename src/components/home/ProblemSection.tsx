import { motion } from "framer-motion";
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
          <span className="badge-dreamy mb-6 inline-block">The Problem</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground leading-tight">
            Most Businesses Don't Have a Growth Problem.{" "}
            <span className="gradient-text">They Have a System Problem.</span>
          </h2>
          <div className="mt-8 space-y-4 text-muted-foreground text-base leading-relaxed">
            <p>You've tried ads. You've built a website. Maybe even hired an agency.</p>
            <p>But nothing scales consistently.</p>
            <p>That's because growth isn't about isolated efforts — it's about building a <strong className="text-foreground">complete system</strong>.</p>
          </div>
          <p className="text-foreground font-semibold font-display text-lg mt-8">
            At KLENTEC, we don't fix parts. We build machines.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProblemSection;

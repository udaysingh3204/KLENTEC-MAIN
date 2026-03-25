import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const caseStudies = [
  { title: "E-commerce Brand", result: "3X ROAS", detail: "In just 60 days through targeted campaigns" },
  { title: "Local Service Business", result: "5X Lead Gen", detail: "Transformed digital presence and pipeline" },
  { title: "Startup Launch", result: "0 → 10K Users", detail: "From concept to traction in record time" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const CaseStudiesSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <SectionHeading
        badge="Case Studies"
        title="Real Work. Real Growth."
        subtitle="We measure success in numbers, not opinions."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {caseStudies.map((c, i) => (
          <motion.div
            key={c.title}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="card-elevated p-7 group"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{c.title}</p>
            <p className="text-3xl font-display font-bold gradient-text mt-3">{c.result}</p>
            <p className="mt-3 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {c.detail}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link to="/work" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm">
          View All Case Studies <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default CaseStudiesSection;

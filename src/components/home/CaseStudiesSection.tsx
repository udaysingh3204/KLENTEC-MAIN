import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import creative3 from "@/assets/creative-3.jpg";

const caseStudies = [
  { title: "E-commerce Brand", result: "3X ROAS", detail: "In just 60 days through targeted campaigns" },
  { title: "Local Service Business", result: "5X Lead Gen", detail: "Transformed digital presence and pipeline" },
  { title: "Startup Launch", result: "0 → 10K Users", detail: "From concept to traction in record time" },
];

const CaseStudiesSection = () => (
  <section className="section-padding gradient-bg-soft">
    <div className="container mx-auto">
      <SectionHeading
        badge="Case Studies"
        title="Real Work. Real Growth."
        subtitle="We measure success in numbers, not opinions."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          {caseStudies.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-dreamy p-7 group"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{c.title}</p>
              <p className="text-3xl font-display font-bold gradient-text mt-2">{c.result}</p>
              <p className="mt-3 text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {c.detail}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={creative3}
            alt="Creative shapes"
            loading="lazy"
            width={800}
            height={600}
            className="rounded-3xl w-full"
          />
        </motion.div>
      </div>
      <div className="text-center mt-12">
        <Link to="/work" className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm">
          View All Case Studies <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default CaseStudiesSection;

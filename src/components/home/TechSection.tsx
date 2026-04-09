import { motion } from "framer-motion";
import { BarChart3, Bot, Cloud, Settings, Zap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const capabilities = [
  { icon: BarChart3, label: "Advanced Analytics & Tracking" },
  { icon: Bot, label: "AI-Powered Automation" },
  { icon: Cloud, label: "Scalable Cloud Infrastructure" },
  { icon: Settings, label: "Conversion Optimization Tools" },
  { icon: Zap, label: "Marketing Automation Systems" },
];

const TechSection = () => (
  <section className="section-padding gradient-bg-soft">
    <div className="container mx-auto">
      <SectionHeading
        badge="Technology"
        title="Powered by Modern Technology"
        subtitle="We use the same tools and systems trusted by top global brands."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {capabilities.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card-dreamy p-6 text-center group"
          >
            <div className="icon-dreamy mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <c.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">{c.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-10 text-sm text-muted-foreground"
      >
        Technology is our backbone. <span className="font-semibold text-foreground">Growth is the outcome.</span>
      </motion.p>
    </div>
  </section>
);

export default TechSection;

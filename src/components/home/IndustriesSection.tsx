import { motion } from "framer-motion";
import { ShoppingCart, Building2, GraduationCap, HeartPulse, Store, Rocket } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const industries = [
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Building2, label: "Real Estate" },
  { icon: GraduationCap, label: "Education & EdTech" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Store, label: "Local Businesses" },
  { icon: Rocket, label: "Startups & SaaS" },
];

const IndustriesSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <SectionHeading badge="Industries" title="Built for Every Ambitious Industry" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="card-dreamy p-6 text-center group cursor-default"
          >
            <div className="icon-dreamy mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <ind.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">{ind.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-10 text-sm text-muted-foreground"
      >
        If growth matters, <span className="font-semibold text-foreground">we can help.</span>
      </motion.p>
    </div>
  </section>
);

export default IndustriesSection;

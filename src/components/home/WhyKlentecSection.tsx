import { motion } from "framer-motion";
import { TrendingUp, Target, Rocket, Layers } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const differentiators = [
  { icon: TrendingUp, title: "Data-Driven Decisions", desc: "Every move we make is backed by data, not guesswork." },
  { icon: Target, title: "Built for Conversions", desc: "Design + marketing aligned for one goal — growth." },
  { icon: Rocket, title: "Speed & Execution", desc: "We move fast, test fast, and scale what works." },
  { icon: Layers, title: "Scalable Systems", desc: "We build systems that grow with you." },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const WhyKlentecSection = () => (
  <section className="section-padding gradient-bg-subtle">
    <div className="container mx-auto">
      <SectionHeading badge="Why Us" title="Why Brands Choose KLENTEC" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {differentiators.map((d, i) => (
          <motion.div
            key={d.title}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="text-center p-6"
          >
            <div className="icon-box-lg mx-auto mb-5">
              <d.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-base font-display font-bold text-foreground">{d.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyKlentecSection;

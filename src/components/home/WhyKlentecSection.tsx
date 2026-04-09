import { motion } from "framer-motion";
import { TrendingUp, Target, Rocket, Layers } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import creative2 from "@/assets/creative-2.jpg";

const differentiators = [
  { icon: TrendingUp, title: "Data-Driven Decisions", desc: "Every move we make is backed by data, not guesswork." },
  { icon: Target, title: "Built for Conversions", desc: "Design + marketing aligned for one goal — growth." },
  { icon: Rocket, title: "Speed & Execution", desc: "We move fast, test fast, and scale what works." },
  { icon: Layers, title: "Scalable Systems", desc: "We build systems that grow with you." },
];

const WhyKlentecSection = () => (
  <section className="section-padding gradient-bg-soft">
    <div className="container mx-auto">
      <SectionHeading badge="Why Us" title="Why Brands Choose KLENTEC" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-dreamy p-7 text-center"
            >
              <div className="icon-dreamy mx-auto mb-4">
                <d.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-display font-bold text-foreground">{d.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={creative2}
            alt="Digital network"
            loading="lazy"
            width={800}
            height={600}
            className="rounded-3xl w-full"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhyKlentecSection;

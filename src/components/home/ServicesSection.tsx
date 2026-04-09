import { motion } from "framer-motion";
import { BarChart3, Globe, Bot, Palette, Layers } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { icon: BarChart3, title: "Performance Marketing", desc: "Run ads that don't just spend — they scale." },
  { icon: Palette, title: "Branding & Identity", desc: "Turn your brand into something people remember." },
  { icon: Globe, title: "Website & App Dev", desc: "Not just websites — high-converting digital assets." },
  { icon: Bot, title: "AI Automation", desc: "Automate your growth and operations." },
  { icon: Layers, title: "UI/UX Design", desc: "Design that doesn't just look good — it converts." },
];

const ServicesSection = () => (
  <section className="section-padding gradient-bg-soft">
    <div className="container mx-auto">
      <SectionHeading
        badge="Services"
        title="Everything You Need to Scale"
        subtitle="From strategy to execution, we build systems that drive real business growth."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card-dreamy p-8 group cursor-default"
          >
            <div className="icon-dreamy mb-6 group-hover:scale-110 transition-transform duration-300">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-display font-bold text-foreground">{s.title}</h3>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;

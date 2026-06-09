import { motion } from "framer-motion";
import { TrendingUp, Target, Rocket, Layers, Users, Zap, BarChart3, Shield } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import creative2 from "@/assets/creative-2.jpg";

const differentiators = [
  { icon: TrendingUp, title: "Data-Driven Growth", desc: "Every strategy backed by analytics. We don't guess — we measure, optimize, and scale." },
  { icon: Target, title: "Full-Stack Execution", desc: "Design + Development + Marketing + Automation. One team. One vision. Zero coordination chaos." },
  { icon: Rocket, title: "90-Day Results", desc: "Most agencies take 6+ months. We deliver measurable growth in 90 days or less." },
  { icon: Zap, title: "AI-Powered Automation", desc: "Let robots handle the repetitive work. We build systems that save you thousands monthly." },
  { icon: Users, title: "Dedicated Account Manager", desc: "You get a real person. Not a rotating team. Weekly check-ins, strategy reviews, real accountability." },
  { icon: Shield, title: "Transparent Reporting", desc: "No black boxes. You see exactly what's working, what's not, and why. Monthly dashboards with actionable insights." },
];

const WhyKlentecSection = () => (
  <section className="section-padding gradient-bg-soft">
    <div className="container mx-auto">
      <SectionHeading badge="Why Us" title="Why High-Growth Brands Choose KLENTEC" subtitle="We're not an agency that does everything. We're a growth machine built for one thing: making your business unstoppable." />
      <div className="grid grid-cols-1 gap-12 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 text-center"
      >
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Most agencies talk about results. We <strong className="text-foreground">show them</strong> in 90 days or we don't charge you.
        </p>
      </motion.div>
    </div>
  </section>
);

export default WhyKlentecSection;

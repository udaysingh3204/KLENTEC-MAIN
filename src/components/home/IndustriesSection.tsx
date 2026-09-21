import { motion } from "framer-motion";
import { ShoppingCart, Building2, GraduationCap, HeartPulse, Store, Rocket } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const industries = [
  {
    icon: ShoppingCart,
    label: "E-commerce",
    description: "Conversion optimization, funnel design, checkout acceleration, inventory automation, marketing automation",
    result: "Conversion-focused"
  },
  {
    icon: Building2,
    label: "Real Estate",
    description: "CRM automation, lead scoring, property showcase optimization, agent tools, automated follow-ups",
    result: "CRM & lead tools"
  },
  {
    icon: GraduationCap,
    label: "EdTech & Courses",
    description: "Course platform design, enrollment funnel, student engagement, completion optimization, community tools",
    result: "Enrollment-focused"
  },
  {
    icon: HeartPulse,
    label: "Healthcare & Telemedicine",
    description: "Patient acquisition, appointment scheduling, HIPAA-compliant systems, telehealth platform optimization",
    result: "Compliant by design"
  },
  {
    icon: Store,
    label: "Local & SMB",
    description: "Local SEO, Google Business optimization, community marketing, location-based ads, reputation management",
    result: "Local-first strategy"
  },
  {
    icon: Rocket,
    label: "Startups & SaaS",
    description: "Product launches, go-to-market strategy, investor pitch decks, founding team support, rapid scaling",
    result: "Launch-ready builds"
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const IndustriesSection = () => (
  <section className="section-padding gradient-bg-subtle">
    <div className="container mx-auto">
      <SectionHeading badge="Industries" title="Built for Every Ambitious Industry" subtitle="Strategy and execution tailored to how your specific industry actually converts." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.label}
            {...fadeUp}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="card-elevated p-7 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                <ind.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-display font-bold text-foreground">{ind.label}</h3>
                <p className="text-xs text-primary font-semibold mt-1">{ind.result}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{ind.description}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        {...fadeUp}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center p-8 rounded-2xl bg-primary/5 border border-primary/10"
      >
        <p className="text-base font-semibold text-foreground mb-2">Not your industry listed?</p>
        <p className="text-sm text-muted-foreground">
          Every industry has its own bottleneck. If yours isn't listed, <span className="font-semibold text-primary">talk to us anyway.</span>
        </p>
      </motion.div>
    </div>
  </section>
);

export default IndustriesSection;

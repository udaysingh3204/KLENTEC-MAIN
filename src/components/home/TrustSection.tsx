import { motion } from "framer-motion";
import { Shield, Eye, Handshake } from "lucide-react";

const values = [
  { icon: Shield, title: "Transparency", desc: "No hidden fees, no surprises — just honest work." },
  { icon: Eye, title: "Communication", desc: "You're always in the loop on progress and results." },
  { icon: Handshake, title: "Long-term Partnerships", desc: "We're not here for one project — we're here for your growth." },
];

const TrustSection = () => (
  <section className="section-padding gradient-bg-soft">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="badge-dreamy mb-5 inline-block">Trust</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground">
          Built on Trust. <span className="gradient-text">Backed by Results.</span>
        </h2>
        <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto">
          No false promises. No shortcuts. Just real growth.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center p-6"
          >
            <div className="icon-dreamy-lg mx-auto mb-5">
              <v.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-base font-display font-bold text-foreground">{v.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;

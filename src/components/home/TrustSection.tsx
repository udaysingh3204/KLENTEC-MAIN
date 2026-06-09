import { motion } from "framer-motion";
import { Shield, Eye, Handshake, TrendingUp, Clock, Users } from "lucide-react";

const values = [
  { icon: Shield, title: "100% Transparent Reporting", desc: "Monthly dashboards showing exactly what's working, revenue impact, and next steps. No jargon. No BS." },
  { icon: TrendingUp, title: "Results-Based Accountability", desc: "We succeed when you succeed. Our fees align with your growth, not just hours billed." },
  { icon: Clock, title: "Dedicated Account Manager", desc: "One real person who knows your business inside-out. Not a rotating team. Not a chatbot." },
  { icon: Handshake, title: "Partnership Mindset", desc: "We're not vendors. We're growth partners. Your wins are our wins. We stick around for the long game." },
  { icon: Eye, title: "Weekly Communication", desc: "Strategy calls every week. Zero ghosts. Zero delays. You always know what's happening." },
  { icon: Users, title: "150+ Happy Clients", desc: "We've worked with startups, SMBs, and enterprises. 95% retention rate because we actually deliver." },
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
        <span className="badge-dreamy mb-5 inline-block">Why We're Different</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground">
          We Don't Just Talk Growth.<span className="gradient-text"> We Live It.</span>
        </h2>
        <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
          Every client is treated like a partner. Every decision is data-backed. Every result is measurable. Here's what sets us apart:
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-dreamy p-7 text-center hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <v.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-base font-display font-bold text-foreground">{v.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;

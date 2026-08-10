import { motion } from "framer-motion";
import { Star, Shield, Award, TrendingUp } from "lucide-react";

const SocialProofBanner = () => {
  const logos = [
    "TechNova",
    "RetailMax",
    "ConsultPro",
    "FreshStart",
    "HealthPlus",
    "FinFlow",
    "EduSmart",
    "PropFlow",
  ];

  const testimonialCount = 47;

  return (
    <section className="py-12 sm:py-16 border-t border-border/30">
      <div className="container mx-auto px-6">
        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Star, label: "4.9/5 Rating", value: `${testimonialCount} Reviews` },
            { icon: TrendingUp, label: "4.2x Avg ROAS", value: "For our clients" },
            { icon: Award, label: "150+ Clients", value: "Successfully served" },
            { icon: Shield, label: "10+ Years", value: "Industry expertise" },
          ].map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="card-dreamy flex items-center gap-3 p-4"
              >
                <div className="icon-dreamy shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{badge.label}</div>
                  <div className="font-semibold text-foreground">{badge.value}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client logos */}
        <div>
          <p className="text-center text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-[0.2em]">
            Trusted by ambitious brands
          </p>
          <motion.div
            className="flex gap-6 justify-center items-center flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {logos.map((logo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 rounded-2xl bg-card border border-border/40 hover:border-primary/30 transition-all"
              >
                <span className="font-semibold text-muted-foreground">{logo}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 divider-soft">
          <p className="text-center text-muted-foreground text-sm">
            <span className="text-foreground font-semibold">Join our growing community</span> of
            companies that have transformed their digital presence. Let's build something
            remarkable together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBanner;

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
  const averageRating = 4.9;

  return (
    <section className="py-12 sm:py-16 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 transition"
              >
                <Icon className="w-8 h-8 text-purple-400 flex-shrink-0" />
                <div>
                  <div className="text-sm text-slate-400">{badge.label}</div>
                  <div className="font-semibold text-white">{badge.value}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client logos */}
        <div>
          <p className="text-center text-sm font-semibold text-slate-400 mb-8 uppercase tracking-wide">
            Trusted by ambitious brands
          </p>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-8 justify-center items-center flex-wrap"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {logos.map((logo, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition"
                >
                  <span className="font-semibold text-slate-300">{logo}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-center text-slate-400 text-sm">
            <span className="text-white font-semibold">Join our growing community</span> of
            companies that have transformed their digital presence. Let's build something
            remarkable together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBanner;

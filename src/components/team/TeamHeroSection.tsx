import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamHeroProps {
  title: string;
  subtitle: string;
  description: string;
  stats?: { label: string; value: string }[];
  gradient: string;
}

const TeamHeroSection = ({
  title,
  subtitle,
  description,
  stats = [],
  gradient,
}: TeamHeroProps) => {
  return (
    <section className={`relative min-h-[550px] flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full">
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              {subtitle}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
            {title}
          </h1>

          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {stats.length > 0 && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <p className="text-white/80 text-xs font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div
            className="pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-6 rounded-lg group"
            >
              Join Our Team
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamHeroSection;

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface ClientResult {
  company: string;
  industry: string;
  metric: string;
  value: string;
  timeline: string;
  description: string;
}

interface ServiceResultsSectionProps {
  results: ClientResult[];
  title?: string;
  subtitle?: string;
  color: string;
}

const ServiceResultsSection = ({
  results,
  title = "Real Results",
  subtitle = "See what similar clients have achieved",
  color,
}: ServiceResultsSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Results grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {results.map((result, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-xl p-8 overflow-hidden bg-gradient-to-br ${color} hover:shadow-2xl transition`}
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {result.company}
                    </h3>
                    <p className="text-sm text-white/80">
                      {result.industry}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-white/80" />
                </div>

                {/* Main metric */}
                <div className="mb-6">
                  <div className="text-4xl font-bold text-white mb-2">
                    {result.value}
                  </div>
                  <p className="text-white/90 text-sm font-semibold">
                    {result.metric}
                  </p>
                  <p className="text-white/70 text-xs mt-1">
                    {result.timeline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-white/85 text-sm leading-relaxed border-t border-white/20 pt-6">
                  {result.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Average metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 bg-slate-950 border border-slate-800 rounded-xl p-8 text-center"
        >
          <p className="text-slate-400 text-sm mb-4">
            Average results across all clients using this service
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Avg. ROI", value: "2.8x", icon: "📈" },
              { label: "Time to Results", value: "3-6 months", icon: "⏱️" },
              { label: "Client Retention", value: "92%", icon: "🎯" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceResultsSection;

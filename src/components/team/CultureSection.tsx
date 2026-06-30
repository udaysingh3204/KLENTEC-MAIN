import { motion } from "framer-motion";
import { Zap, Users, Heart, Rocket, Brain, Leaf } from "lucide-react";

interface CultureValue {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface CultureSectionProps {
  values: CultureValue[];
  title?: string;
  subtitle?: string;
}

const CultureSection = ({
  values,
  title = "Our Culture & Values",
  subtitle = "What makes KLENTEC different",
}: CultureSectionProps) => {
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

  const defaultValues: CultureValue[] = values.length > 0 ? values : [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Ship Fast, Learn Faster",
      description: "We move quickly and reward initiative. We celebrate learning from mistakes and iterate constantly.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Small, Senior Team",
      description: "Real ownership from day one. No junior grunts here — everyone is experienced and empowered.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "People-First Culture",
      description: "Mentorship, growth, and respect. We invest in our team and celebrate wins together.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Client Success Obsessed",
      description: "We measure ourselves by client ROI. Your success is our success, full stop.",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Think Big, Execute Smart",
      description: "Strategic thinking meets pragmatic execution. We're not afraid to challenge the status quo.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainable Growth",
      description: "We don't burn out. Sustainable pace, work-life balance, and long-term thinking.",
    },
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Values grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {defaultValues.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative p-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/30 transition group"
            >
              {/* Icon */}
              <div className="inline-block p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mb-4 group-hover:scale-110 transition">
                <div className="text-white">
                  {value.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed">
                {value.description}
              </p>

              {/* Accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 text-center text-slate-400"
        >
          <p className="text-lg">
            <span className="text-white font-semibold">We're hiring!</span> If our values resonate with you, let's talk.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CultureSection;

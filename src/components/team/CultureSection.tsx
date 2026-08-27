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
      icon: <Zap className="w-7 h-7" />,
      title: "Ship Fast, Learn Faster",
      description: "We move quickly and reward initiative. We celebrate learning from mistakes and iterate constantly.",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Small, Senior Team",
      description: "Real ownership from day one. No junior grunts here — everyone is experienced and empowered.",
    },
    {
      icon: <Heart className="w-7 h-7" />,
      title: "People-First Culture",
      description: "Mentorship, growth, and respect. We invest in our team and celebrate wins together.",
    },
    {
      icon: <Rocket className="w-7 h-7" />,
      title: "Client Success Obsessed",
      description: "We measure ourselves by client ROI. Your success is our success, full stop.",
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "Think Big, Execute Smart",
      description: "Strategic thinking meets pragmatic execution. We're not afraid to challenge the status quo.",
    },
    {
      icon: <Leaf className="w-7 h-7" />,
      title: "Sustainable Growth",
      description: "We don't burn out. Sustainable pace, work-life balance, and long-term thinking.",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              className="card-dreamy p-8"
            >
              <div className="icon-dreamy mb-4">
                <div className="text-primary">
                  {value.icon}
                </div>
              </div>

              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {value.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 text-center text-muted-foreground"
        >
          <p className="text-lg">
            <span className="text-foreground font-semibold">We're hiring!</span> If our values resonate with you, let's talk.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CultureSection;

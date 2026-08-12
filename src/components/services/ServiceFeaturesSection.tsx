import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  items: string[];
}

interface ServiceFeaturesSectionProps {
  features: Feature[];
  title?: string;
}

const ServiceFeaturesSection = ({
  features,
  title = "What's Included",
}: ServiceFeaturesSectionProps) => {
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
    <section className="section-padding">
      <div className="container mx-auto">
        {/* Section header */}
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
            Complete breakdown of everything you'll receive as part of this service package.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card-dreamy p-8"
            >
              {/* Feature title */}
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">
                {feature.description}
              </p>

              {/* Items list */}
              <ul className="space-y-3">
                {feature.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceFeaturesSection;

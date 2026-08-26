import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  duration?: string;
}

interface ServiceProcessSectionProps {
  steps: ProcessStep[];
  title?: string;
  color: string;
}

const ServiceProcessSection = ({
  steps,
  title = "Our Process",
  color,
}: ServiceProcessSectionProps) => {
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
            A clear, structured path from kickoff to launch — no guesswork, no surprises.
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border/40 transform -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`lg:grid lg:grid-cols-2 lg:gap-8 relative ${
                  index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                }`}
              >
                {/* Content */}
                <div
                  className={`lg:col-span-1 ${
                    index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <motion.div
                    whileHover={{ x: index % 2 === 0 ? -10 : 10 }}
                    className="card-dreamy p-8"
                  >
                    {/* Step number and title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-2xl font-display font-bold text-white">
                          {step.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-semibold text-foreground">
                          {step.title}
                        </h3>
                        {step.duration && (
                          <p className="text-sm text-muted-foreground">
                            {step.duration}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Timeline dot and spacer */}
                <div
                  className={`hidden lg:flex lg:col-span-1 items-center justify-center ${
                    index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${color} ring-4 ring-background absolute left-1/2 transform -translate-x-1/2 z-10`} />
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center py-4">
                    <ArrowRight className="w-6 h-6 text-muted-foreground/50 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcessSection;

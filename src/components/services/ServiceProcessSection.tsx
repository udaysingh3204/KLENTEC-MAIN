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
            Here's how we deliver exceptional results for your business.
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 transform -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                    className="bg-slate-800 border border-slate-700 rounded-xl p-8 hover:border-slate-600 transition"
                  >
                    {/* Step number and title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-2xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">
                          {step.title}
                        </h3>
                        {step.duration && (
                          <p className="text-sm text-slate-400">
                            {step.duration}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 leading-relaxed">
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
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${color} ring-4 ring-slate-900 absolute left-1/2 transform -translate-x-1/2 z-10`} />
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center py-4">
                    <ArrowRight className="w-6 h-6 text-slate-600 rotate-90" />
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

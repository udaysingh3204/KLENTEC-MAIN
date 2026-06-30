import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  icon?: React.ReactNode;
  benefits?: string[];
  ctaText?: string;
  gradient: string;
}

const ServiceHeroSection = ({
  title,
  subtitle,
  description,
  benefits = [],
  ctaText = "Schedule Consultation",
  gradient,
}: ServiceHeroProps) => {
  return (
    <section className={`relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtitle */}
          <div className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full">
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              {subtitle}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Benefits */}
          {benefits.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <p className="text-white font-semibold text-sm">{benefit}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* CTA */}
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
              {ctaText}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceHeroSection;

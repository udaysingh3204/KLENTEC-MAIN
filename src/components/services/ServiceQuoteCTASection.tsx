import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";

interface ServiceQuoteCTASectionProps {
  serviceName: string;
  color: string;
  points?: string[];
}

const ServiceQuoteCTASection = ({
  serviceName,
  color,
  points = [
    "Scoped to your actual goals, not a fixed template",
    "Transparent proposal — no hidden line items",
    "A senior strategist on the call, not a salesperson",
  ],
}: ServiceQuoteCTASectionProps) => {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center bg-gradient-to-br ${color}`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-16 -mb-16" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6">
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-[0.2em]">
                Custom Pricing
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Every {serviceName} Engagement Is Scoped to You
            </h2>
            <p className="text-white/85 mb-8 leading-relaxed">
              Scope and investment vary too much project to project for a fixed price
              list to mean anything. Tell us what you're trying to achieve and we'll
              put together a proposal within 48 hours — no obligation.
            </p>

            <ul className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 mb-8 text-sm text-white/90">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  {point}
                </li>
              ))}
            </ul>

            <CTAButton
              type="lead-form"
              label="Get a Custom Quote"
              source={`${serviceName} Quote CTA`}
              variant="primary"
              className="bg-none bg-white text-slate-900 hover:bg-slate-100"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceQuoteCTASection;

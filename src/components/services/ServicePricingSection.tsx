import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { PriceDisplay } from "@/components/PriceDisplay";
import { CTAButton } from "@/components/CTAButton";
import { BuyServiceButton } from "@/components/BuyServiceButton";

interface PricingTier {
  name: string;
  price: string;
  originalPrice?: string;
  showDiscount?: boolean;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  serviceId?: string;
  numericPrice?: number;
}

interface ServicePricingSectionProps {
  tiers: PricingTier[];
  title?: string;
  color: string;
  serviceName?: string;
}

const ServicePricingSection = ({
  tiers,
  title = "Flexible Pricing",
  color,
  serviceName = "Service",
}: ServicePricingSectionProps) => {
  return (
    <section className="py-20 bg-slate-950">
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
            Choose the package that best fits your business needs. All plans include
            our quality guarantee and dedicated support.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-xl overflow-hidden transition-all ${
                tier.highlighted
                  ? `bg-gradient-to-br ${color} shadow-2xl ring-2 ring-offset-2 ring-offset-slate-950`
                  : "bg-slate-900 border border-slate-800"
              }`}
            >
              {/* Badge for highlighted tier */}
              {tier.highlighted && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-sm font-semibold">
                  POPULAR
                </div>
              )}

              <div className="p-8 sm:p-10">
                {/* Tier name */}
                <h3 className={`text-2xl font-bold mb-2 ${
                  tier.highlighted ? "text-white" : "text-white"
                }`}>
                  {tier.name}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-6 ${
                  tier.highlighted ? "text-white/90" : "text-slate-400"
                }`}>
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  {tier.showDiscount && tier.originalPrice ? (
                    <PriceDisplay
                      originalPrice={tier.originalPrice}
                      newPrice={tier.price}
                      label="Limited Time Offer"
                      showBadge={true}
                      size="md"
                    />
                  ) : (
                    <div className={`text-4xl font-bold mb-1 ${
                      tier.highlighted ? "text-white" : "text-white"
                    }`}>
                      {tier.price}
                    </div>
                  )}
                  <div className={`text-sm mt-2 ${
                    tier.highlighted ? "text-white/80" : "text-slate-400"
                  }`}>
                    {tier.period}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        tier.highlighted ? "text-white" : "text-green-400"
                      }`} />
                      <span className={`text-sm ${
                        tier.highlighted ? "text-white/90" : "text-slate-300"
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {tier.serviceId && tier.numericPrice ? (
                  <BuyServiceButton
                    serviceId={tier.serviceId}
                    serviceName={tier.name}
                    amount={tier.numericPrice}
                    label={tier.cta}
                    variant={tier.highlighted ? "primary" : "secondary"}
                    className={`w-full justify-center text-base py-3 ${
                      tier.highlighted
                        ? "bg-white text-purple-600 hover:bg-slate-100"
                        : ""
                    }`}
                  />
                ) : (
                  <CTAButton
                    type="lead-form"
                    label={tier.cta}
                    source={tier.name}
                    variant={tier.highlighted ? "primary" : "secondary"}
                    className={`w-full justify-center text-base py-3 ${
                      tier.highlighted
                        ? "bg-white text-purple-600 hover:bg-slate-100"
                        : ""
                    }`}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-12 text-slate-400 text-sm"
        >
          <p>💡 Not sure which plan is right for you? <span className="text-white font-semibold">Schedule a free consultation</span> and we'll recommend the best option.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePricingSection;

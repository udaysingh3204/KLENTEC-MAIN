import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
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
}: ServicePricingSectionProps) => {
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
            Choose the package that best fits your business needs. All plans include
            our quality guarantee and dedicated support.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl overflow-hidden transition-all ${
                tier.highlighted
                  ? `bg-gradient-to-br ${color} shadow-2xl ring-2 ring-offset-2 ring-offset-background`
                  : "card-dreamy"
              }`}
            >
              {/* Badge for highlighted tier */}
              {tier.highlighted && (
                <div className="absolute top-0 right-0 bg-black/20 text-white px-4 py-1 text-sm font-semibold">
                  POPULAR
                </div>
              )}

              <div className="p-8 sm:p-10">
                {/* Tier name */}
                <h3 className={`text-2xl font-display font-semibold mb-2 ${
                  tier.highlighted ? "text-white" : "text-foreground"
                }`}>
                  {tier.name}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-6 ${
                  tier.highlighted ? "text-white/90" : "text-muted-foreground"
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
                    <div className={`text-4xl font-display font-bold mb-1 ${
                      tier.highlighted ? "text-white" : "text-foreground"
                    }`}>
                      {tier.price}
                    </div>
                  )}
                  <div className={`text-sm mt-2 ${
                    tier.highlighted ? "text-white/80" : "text-muted-foreground"
                  }`}>
                    {tier.period}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        tier.highlighted ? "text-white" : "text-primary"
                      }`} />
                      <span className={`text-sm ${
                        tier.highlighted ? "text-white/90" : "text-muted-foreground"
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
                        ? "bg-none bg-white text-slate-900 hover:bg-slate-100"
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
                        ? "bg-none bg-white text-slate-900 hover:bg-slate-100"
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
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-12 text-muted-foreground text-sm"
        >
          <p>💡 Not sure which plan is right for you? <span className="text-foreground font-semibold">Schedule a free consultation</span> and we'll recommend the best option.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePricingSection;

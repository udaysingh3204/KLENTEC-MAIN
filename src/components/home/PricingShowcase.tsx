import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { PriceDisplay } from "@/components/PriceDisplay";
import { CTAButton } from "@/components/CTAButton";
import { Link } from "react-router-dom";
import { useRegionalPrice } from "@/hooks/useRegionalPrice";
import { serviceRegionalPricing } from "@/config/regionalConfig";
import { CurrencySelector } from "@/components/CurrencySelector";

const PricingShowcase = () => {
  const { formatPrice, getRawPrice, selectedRegion } = useRegionalPrice();

  // Get regional pricing data
  const regionalPrices = serviceRegionalPricing[selectedRegion];

  // Use actual service keys from the config
  const starterPrice = regionalPrices["landing-page"] || 18750;
  const enterprisePrice = regionalPrices["business-website"] || 43750;

  const pricingTiers = [
    {
      title: "24-Hour Landing Page",
      description: "Perfect for startups and quick launches",
      originalPrice: formatPrice(Math.floor(starterPrice / 1.25)),
      newPrice: formatPrice(starterPrice),
      includes: [
        "1-2 section landing page",
        "Hero + CTA sections",
        "Email capture form",
        "Mobile responsive",
        "Basic analytics",
      ],
      icon: "⚡",
      popular: false,
      link: "/services/24-hour-web-dev",
    },
    {
      title: "Enterprise Speed Website",
      description: "Complete business website in 24 hours",
      originalPrice: formatPrice(Math.floor(enterprisePrice / 1.25)),
      newPrice: formatPrice(enterprisePrice),
      includes: [
        "5 complete pages",
        "Hero + Services + Team + Blog + Contact",
        "Advanced form integrations",
        "Email automation (3 sequences)",
        "WhatsApp integration",
        "Admin dashboard",
      ],
      icon: "🚀",
      popular: true,
      link: "/services/24-hour-web-dev",
    },
    {
      title: "Growth Accelerator Package",
      description: "Full digital ecosystem for scaling",
      originalPrice: formatPrice(Math.floor((regionalPrices["ecom-ads"] || 43750) / 1.25)),
      newPrice: formatPrice(regionalPrices["ecom-ads"] || 43750),
      includes: [
        "8+ branded pages",
        "E-commerce ready",
        "CRM integration",
        "Advanced automation",
        "Team portal",
        "Analytics dashboard",
        "API integrations (3)",
      ],
      icon: "💎",
      popular: false,
      link: "/services/24-hour-web-dev",
    },
    {
      title: "Digital Marketing Plan",
      description: "Strategic marketing to drive leads",
      customQuote: true,
      includes: [
        "Content strategy",
        "Reels & shorts creation",
        "Post designing",
        "Captions & hashtags",
        "Story management",
        "Monthly reporting",
      ],
      icon: "📈",
      popular: false,
      link: "/services/digital-marketing",
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="badge-dreamy mb-5 inline-flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" />
            Limited Time Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground">
            Transparent, Flexible Pricing
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            All prices now include premium features at discounted rates. Choose what fits your business needs.
          </p>

          {/* Currency selector — scoped to pricing, not the global nav */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="text-sm text-muted-foreground">Show prices in</span>
            <div className="w-56">
              <CurrencySelector />
            </div>
          </div>
        </motion.div>

        {/* Pricing cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
                tier.popular
                  ? "p-[1.5px] bg-gradient-to-br from-primary to-[hsl(var(--purple-glow))] lg:scale-105"
                  : "card-dreamy"
              }`}
            >
              <div className={tier.popular ? "relative rounded-[calc(1.5rem-1.5px)] bg-card h-full" : ""}>
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/15 border border-primary/30">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-semibold text-primary">POPULAR</span>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  {/* Icon & title */}
                  <div className="mb-4">
                    <span className="text-3xl mb-3 block">{tier.icon}</span>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      {tier.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tier.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6 pt-4 border-t border-border/40">
                    {tier.customQuote ? (
                      <div>
                        <span className="badge-pill mb-3 inline-block normal-case tracking-normal">
                          Custom Pricing
                        </span>
                        <p className="text-2xl font-display font-bold text-foreground">
                          Scoped to your goals
                        </p>
                      </div>
                    ) : (
                      <PriceDisplay
                        originalPrice={tier.originalPrice}
                        newPrice={tier.newPrice}
                        label="Limited Time"
                        showBadge={true}
                        size="md"
                      />
                    )}
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 mb-6">
                    {tier.includes.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 bg-primary/15 text-primary">
                          ✓
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <CTAButton
                    type="lead-form"
                    label={tier.customQuote ? "Get a Custom Quote" : "Get Started"}
                    source={tier.title}
                    variant={tier.popular ? "primary" : "secondary"}
                    className="w-full justify-center text-base py-3"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Need a custom package? Let's talk about your specific requirements.
          </p>
          <Link to="/contact" className="btn-ghost inline-flex items-center gap-2">
            Schedule a Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingShowcase;

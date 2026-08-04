import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { PriceDisplay } from "@/components/PriceDisplay";
import { CTAButton } from "@/components/CTAButton";
import { Link } from "react-router-dom";
import { useRegionalPrice } from "@/hooks/useRegionalPrice";
import { serviceRegionalPricing } from "@/config/regionalConfig";

const PricingShowcase = () => {
  const { formatPrice, getRawPrice, selectedRegion } = useRegionalPrice();

  // Get regional pricing data
  const regionalPrices = serviceRegionalPricing[selectedRegion];

  // Use actual service keys from the config
  const starterPrice = regionalPrices["landing-page"] || 18750;
  const enterprisePrice = regionalPrices["business-website"] || 43750;
  const socialPrice = regionalPrices["social-starter"] || 9999;

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
      originalPrice: formatPrice(Math.floor(socialPrice / 1.25)) + "/month",
      newPrice: formatPrice(socialPrice) + "/month",
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
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
              LIMITED TIME PRICING
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Transparent, Flexible Pricing
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            All prices now include premium features at discounted rates. Choose what fits your business needs.
          </p>
        </motion.div>

        {/* Pricing cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-2xl overflow-hidden transition-all ${
                tier.popular
                  ? "bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl ring-2 ring-offset-2 ring-offset-slate-950 lg:scale-105"
                  : "bg-slate-900 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-semibold text-white">POPULAR</span>
                </div>
              )}

              <div className={`p-6 sm:p-8 ${tier.popular ? "text-white" : ""}`}>
                {/* Icon & title */}
                <div className="mb-4">
                  <span className="text-3xl mb-3 block">{tier.icon}</span>
                  <h3 className={`text-xl font-bold mb-2 ${
                    tier.popular ? "text-white" : "text-white"
                  }`}>
                    {tier.title}
                  </h3>
                  <p className={`text-sm ${
                    tier.popular ? "text-white/90" : "text-slate-400"
                  }`}>
                    {tier.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="mb-6 pt-4 border-t border-slate-700/50">
                  <PriceDisplay
                    originalPrice={tier.originalPrice}
                    newPrice={tier.newPrice}
                    label="Limited Time"
                    showBadge={true}
                    size="md"
                  />
                </div>

                {/* Features list */}
                <ul className="space-y-3 mb-6">
                  {tier.includes.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 ${
                        tier.popular
                          ? "bg-white/30 text-white"
                          : "bg-purple-500/30 text-purple-400"
                      }`}>
                        ✓
                      </span>
                      <span className={`text-sm ${
                        tier.popular ? "text-white/95" : "text-slate-300"
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <CTAButton
                  type="lead-form"
                  label="Get Started"
                  source={tier.title}
                  variant={tier.popular ? "primary" : "secondary"}
                  className={`w-full justify-center text-base py-3 ${
                    tier.popular
                      ? "bg-white text-purple-600 hover:bg-slate-100"
                      : ""
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 mb-4">
            Need a custom package? Let's talk about your specific requirements.
          </p>
          <Link to="/contact">
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:border-purple-500 hover:text-purple-400 font-semibold"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingShowcase;

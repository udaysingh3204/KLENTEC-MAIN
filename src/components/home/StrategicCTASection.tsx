import { motion } from "framer-motion";
import { Clock, Zap, TrendingUp, CheckCircle } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";

const StrategicCTASection = () => {
  const ctaOptions = [
    {
      icon: Clock,
      title: "Book Free Strategy Call",
      description: "15-minute consultation with our lead strategist",
      benefits: ["Personalized strategy", "Zero commitment", "Actionable insights"],
      cta: "Schedule Call",
      href: "/contact",
      primary: true,
    },
    {
      icon: TrendingUp,
      title: "Get Free Growth Audit",
      description: "Comprehensive analysis of your digital presence",
      benefits: ["Website audit", "Competitor analysis", "Growth opportunities"],
      cta: "Claim Audit",
      href: "/contact#audit",
      primary: false,
    },
    {
      icon: Zap,
      title: "Chat with Expert",
      description: "Get answers to your questions instantly",
      benefits: ["Live support", "Expert advice", "No wait time"],
      cta: "Start Chat",
      href: "https://wa.me/919557630336",
      primary: false,
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground">
            Ready to Scale Your Business?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Choose the option that works best for you. All start with zero
            commitment and zero credit card required.
          </p>
        </motion.div>

        {/* CTA Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {ctaOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={
                  option.primary
                    ? "rounded-3xl p-8 bg-gradient-to-br from-[hsl(var(--purple-mid))] to-[hsl(var(--purple-dark))] shadow-[0_8px_40px_hsl(260_65%_55%/0.25)]"
                    : "card-dreamy p-8"
                }
              >
                <div className={`icon-dreamy mb-4 ${option.primary ? "bg-white/15" : ""}`}>
                  <Icon className={`w-6 h-6 ${option.primary ? "text-white" : "text-primary"}`} />
                </div>

                <h3 className={`text-xl font-display font-semibold mb-2 ${option.primary ? "text-white" : "text-foreground"}`}>
                  {option.title}
                </h3>

                <p className={`text-sm mb-6 ${option.primary ? "text-white/85" : "text-muted-foreground"}`}>
                  {option.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2 mb-8">
                  {option.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-2 text-sm ${option.primary ? "text-white/90" : "text-muted-foreground"}`}
                    >
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {option.primary ? (
                  <CTAButton
                    type="strategy-call"
                    label={option.cta}
                    source="Homepage CTA"
                    variant="primary"
                    className="w-full justify-center text-base py-3 bg-none bg-white text-[hsl(var(--purple-dark))] hover:bg-white/90"
                  />
                ) : option.href.includes("wa.me") ? (
                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost w-full flex items-center justify-center"
                  >
                    {option.cta}
                  </a>
                ) : (
                  <CTAButton
                    type="growth-audit"
                    label={option.cta}
                    source="Homepage CTA"
                    variant="secondary"
                    className="w-full justify-center text-base py-3"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Social proof for CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-muted-foreground text-sm"
        >
          <p>
            🎯 <span className="text-foreground font-semibold">Join 150+ brands</span> that trust
            us with their growth. <span className="text-foreground">Average response time: 2 hours</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StrategicCTASection;

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, Zap, TrendingUp, CheckCircle } from "lucide-react";

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
      href: "https://wa.me/919876543210",
      primary: false,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Ready to Scale Your Business?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
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
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`rounded-xl p-8 transition-all hover:scale-105 ${
                  option.primary
                    ? "bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20"
                    : "bg-slate-900 border border-slate-800 hover:border-purple-500/50"
                }`}
              >
                <Icon
                  className={`w-10 h-10 mb-4 ${
                    option.primary ? "text-white" : "text-purple-400"
                  }`}
                />

                <h3 className={`text-xl font-bold mb-2 ${
                  option.primary ? "text-white" : "text-white"
                }`}>
                  {option.title}
                </h3>

                <p className={`text-sm mb-6 ${
                  option.primary ? "text-white/90" : "text-slate-400"
                }`}>
                  {option.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2 mb-8">
                  {option.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-2 text-sm ${
                        option.primary
                          ? "text-white/90"
                          : "text-slate-300"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className={`w-full font-semibold ${
                    option.primary
                      ? "bg-white text-purple-600 hover:bg-slate-100"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                  asChild
                >
                  <a href={option.href}>{option.cta}</a>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Social proof for CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center text-slate-400 text-sm"
        >
          <p>
            🎯 <span className="text-white font-semibold">Join 150+ brands</span> that trust
            us with their growth. <span className="text-white">Average response time: 2 hours</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StrategicCTASection;

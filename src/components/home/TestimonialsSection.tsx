import { motion } from "framer-motion";
import { Star, TrendingUp, Zap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const testimonials = [
  {
    quote: "KLENTEC transformed our brand visibility in 60 days. Their team understood our goals and delivered beyond expectations. We saw a 320% increase in qualified leads.",
    name: "Rahul Sharma",
    role: "Founder, TechNova",
    metric: "320% Lead Growth",
    image: "🚀"
  },
  {
    quote: "We were losing clients to competitors. KLENTEC's AI automation strategy helped us reclaim market position. Our customer retention jumped from 65% to 94%.",
    name: "Priya Sharma",
    role: "CEO, EdTech Startup",
    metric: "94% Retention Rate",
    image: "📈"
  },
  {
    quote: "Their systems changed how we scale. In 6 months, we went from 10 to 50 active projects with zero operational overhead increase.",
    name: "Rahul Mehta",
    role: "Director, Real Estate Firm",
    metric: "5x Project Growth",
    image: "🏆"
  },
  {
    quote: "KLENTEC's approach to conversion optimization increased our revenue by 285%. They don't just talk strategy—they execute flawlessly.",
    name: "Amit Verma",
    role: "CMO, SaaS Company",
    metric: "285% Revenue Increase",
    image: "💎"
  },
  {
    quote: "Working with KLENTEC felt like hiring a senior strategist and execution team. They handled everything from brand positioning to lead nurturing campaigns.",
    name: "Neha Kapoor",
    role: "Founder, Fintech Startup",
    metric: "Top 10 Fintech Brand",
    image: "⚡"
  },
  {
    quote: "The ROAS we achieved with KLENTEC was 4.2x. Most agencies promise results, but they actually delivered. Transparent, professional, and results-driven.",
    name: "Vikram Singh",
    role: "CEO, E-commerce Brand",
    metric: "4.2x ROAS",
    image: "✨"
  },
];

const TestimonialsSection = () => (
  <section className="section-padding bg-gradient-to-b from-transparent via-primary/5 to-transparent">
    <div className="container mx-auto">
      <SectionHeading badge="Testimonials" title="Real Results from Real Clients" subtitle="See how KLENTEC transforms businesses across industries" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative card-dreamy p-8 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden"
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Metric Badge */}
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary">{t.metric}</span>
              </div>

              {/* Quote */}
              <p className="text-foreground text-sm leading-relaxed font-medium mb-6">"{t.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-border/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xl">
                  {t.image}
                </div>
                <div>
                  <p className="text-sm font-display font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {[
          { label: "Happy Clients", value: "150+" },
          { label: "Avg ROI", value: "4.2x" },
          { label: "Retention Rate", value: "95%" },
          { label: "Years Experience", value: "8+" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl font-display font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TestimonialsSection;

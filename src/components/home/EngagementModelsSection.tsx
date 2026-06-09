import { motion } from "framer-motion";
import { Check, Zap, Target, TrendingUp } from "lucide-react";

const models = [
  {
    name: "Project-Based",
    icon: Target,
    description: "Perfect for specific initiatives or one-time projects.",
    price: "₹50K - ₹10L+",
    best: "Website redesigns, campaigns, brand launches",
    features: [
      "Fixed timeline and budget",
      "Dedicated project team",
      "Daily standups & progress tracking",
      "Final delivery & handoff",
    ],
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Monthly Retainer",
    icon: TrendingUp,
    description: "Ongoing partnership for consistent growth.",
    price: "₹50K - ₹5L+/month",
    best: "Social media, content, optimization",
    features: [
      "Dedicated account manager",
      "Flexible scope & priorities",
      "Weekly strategy calls",
      "Performance dashboard",
      "All-inclusive pricing",
    ],
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Performance-Based",
    icon: Zap,
    description: "We only win when you win. Revenue-aligned pricing.",
    price: "% of incremental revenue",
    best: "Lead generation, e-commerce scaling",
    features: [
      "No risk model",
      "Aligned incentives",
      "Transparent metrics",
      "Scaling as you grow",
      "Results guaranteed",
    ],
    color: "from-emerald-500 to-teal-600",
  },
];

const technologies = [
  { category: "Frontend", items: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Firebase", "Supabase"] },
  { category: "Marketing", items: ["HubSpot", "Klaviyo", "Zapier", "Segment", "Google Analytics"] },
  { category: "Design", items: ["Figma", "Adobe Suite", "Framer", "Webflow", "Design Systems"] },
  { category: "AI/Automation", items: ["OpenAI", "Midjourney", "Make.com", "n8n", "Custom Models"] },
  { category: "E-commerce", items: ["Shopify", "WooCommerce", "Stripe", "Supabase", "Custom Builds"] },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const EngagementModelsSection = () => (
  <>
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="badge-dreamy mb-5 inline-block">Flexible Engagement</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground">
            Work With Us <span className="gradient-text">Your Way</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            Whether you need a one-time project, ongoing support, or a results-based partnership — we have a model that works for your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-elevated overflow-hidden relative"
            >
              <div className={`h-1 w-full bg-gradient-to-r ${model.color}`} />

              <div className="p-8">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${model.color} flex items-center justify-center mb-6`}>
                  <model.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-display font-bold text-foreground mb-2">{model.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{model.description}</p>

                <div className="mb-6 pb-6 border-b border-border">
                  <p className="text-3xl font-display font-bold gradient-text mb-2">{model.price}</p>
                  <p className="text-xs text-muted-foreground font-medium">Best for: {model.best}</p>
                </div>

                <ul className="space-y-3">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding gradient-bg-subtle">
      <div className="container mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="badge-dreamy mb-5 inline-block">Tech Stack</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground">
            Built With Modern <span className="gradient-text">Technology</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto">
            We use cutting-edge tools and frameworks to build scalable, maintainable solutions that grow with your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.category}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-dreamy p-8"
            >
              <h3 className="text-lg font-display font-bold text-foreground mb-4">{tech.category}</h3>
              <div className="flex flex-wrap gap-2">
                {tech.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default EngagementModelsSection;

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Code,
  Palette,
  BarChart3,
  Share2,
  Cpu,
  ArrowRight,
} from "lucide-react";

const EnterpriseServicesShowcase = () => {
  const services = [
    {
      icon: BarChart3,
      title: "Digital Marketing",
      description: "Drive qualified leads and measurable revenue growth",
      services: [
        "PPC Campaigns (4.2x ROAS avg)",
        "SEO & Content Strategy",
        "Social Media Management",
        "Email Marketing Automation",
      ],
      color: "from-blue-500 to-cyan-500",
      results: "580% organic growth",
    },
    {
      icon: Code,
      title: "Web & App Development",
      description: "High-performance solutions that convert visitors to customers",
      services: [
        "Custom Website Development",
        "Mobile App Development",
        "E-commerce Platforms",
        "API Integration & Automation",
      ],
      color: "from-purple-500 to-pink-500",
      results: "65% avg conversion increase",
    },
    {
      icon: Palette,
      title: "Design & Branding",
      description: "Create memorable brand experiences that stand out",
      services: [
        "Brand Strategy & Identity",
        "UI/UX Design",
        "Web & App Design",
        "Marketing Collateral",
      ],
      color: "from-orange-500 to-red-500",
      results: "4x brand recall improvement",
    },
    {
      icon: Zap,
      title: "Automation & Integration",
      description: "Streamline operations and eliminate manual workflows",
      services: [
        "Marketing Automation",
        "CRM Implementation",
        "WhatsApp Business Integration",
        "Workflow Optimization",
      ],
      color: "from-green-500 to-emerald-500",
      results: "68% lead response rate",
    },
    {
      icon: Share2,
      title: "Strategy & Consulting",
      description: "Expert guidance for digital transformation and growth",
      services: [
        "Growth Strategy Planning",
        "Digital Audit & Analysis",
        "Conversion Rate Optimization",
        "Tech Stack Consultation",
      ],
      color: "from-indigo-500 to-purple-500",
      results: "2.8x blended ROI",
    },
    {
      icon: Cpu,
      title: "Managed Services",
      description: "Ongoing support and optimization for sustained growth",
      services: [
        "Monthly Retainers",
        "Performance Ad Management",
        "Content Creation",
        "24/7 Technical Support",
      ],
      color: "from-yellow-500 to-orange-500",
      results: "15+ years avg retention",
    },
  ];

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
            Complete Suite of Services
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            From strategy to execution, we provide end-to-end solutions that deliver
            measurable results. Each service is optimized for enterprise-grade quality.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const [colorStart, colorEnd] = service.color.split(" ");
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="relative group rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative p-6 sm:p-8">
                  {/* Icon */}
                  <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${service.color} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title & description */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">
                    {service.description}
                  </p>

                  {/* Service list */}
                  <ul className="space-y-2 mb-6">
                    {service.services.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r ${service.color}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Results badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${service.color} text-white mb-4`}>
                    {service.results}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-400 hover:text-purple-300 group/btn"
                  >
                    Learn more
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-6">
            Not sure which service is right for you?
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Book Free Strategy Call
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterpriseServicesShowcase;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
      results: "15+ years avg retention",
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
          className="text-center mb-16"
        >
          <span className="badge-dreamy mb-5 inline-block">What We Do</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-foreground">
            Complete Suite of Services
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            From strategy to execution, we provide end-to-end solutions that deliver
            measurable results. Each service is optimized for enterprise-grade quality.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="card-dreamy p-6 sm:p-8"
              >
                <div className="icon-dreamy-lg mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.services.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                <span className="badge-pill mb-4 inline-block normal-case tracking-normal">
                  {service.results}
                </span>

                <div>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Not sure which service is right for you?
          </p>
          <Link to="/contact" className="btn-dreamy inline-flex items-center gap-2">
            Book Free Strategy Call
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterpriseServicesShowcase;

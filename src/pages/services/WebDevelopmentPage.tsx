import ServiceHeroSection from "@/components/services/ServiceHeroSection";
import ServiceFeaturesSection from "@/components/services/ServiceFeaturesSection";
import ServiceProcessSection from "@/components/services/ServiceProcessSection";
import ServiceResultsSection from "@/components/services/ServiceResultsSection";
import ServiceQuoteCTASection from "@/components/services/ServiceQuoteCTASection";

const WebDevelopmentPage = () => {
  const features = [
    {
      title: "Custom Web Apps",
      description: "Built to your exact specifications",
      items: ["React/Next.js applications", "Real-time data sync", "Scalable architecture", "Mobile-responsive design"],
    },
    {
      title: "E-Commerce Platforms",
      description: "End-to-end shopping solutions",
      items: ["Product catalog management", "Payment gateway integration", "Inventory management", "Order tracking system"],
    },
    {
      title: "API Development",
      description: "Robust backend infrastructure",
      items: ["REST & GraphQL APIs", "Database design & optimization", "Authentication & security", "Rate limiting & caching"],
    },
    {
      title: "Performance Optimization",
      description: "Lightning-fast user experience",
      items: ["Code splitting & lazy loading", "CDN integration", "Database query optimization", "Image optimization"],
    },
    {
      title: "Security & Compliance",
      description: "Enterprise-grade protection",
      items: ["SSL/TLS encryption", "GDPR compliance", "PCI DSS for payments", "Regular security audits"],
    },
    {
      title: "Maintenance & Support",
      description: "Long-term reliability",
      items: ["24/7 monitoring", "Bug fixes & patches", "Performance reporting", "Feature updates"],
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Requirements & Design",
      description: "We understand your vision, create wireframes, and design the user interface.",
      duration: "Week 1-2",
    },
    {
      number: "2",
      title: "Architecture Planning",
      description: "Design scalable backend architecture, database schema, and API structure.",
      duration: "Week 2-3",
    },
    {
      number: "3",
      title: "Frontend Development",
      description: "Build responsive, fast, and intuitive user interfaces with React/Next.js.",
      duration: "Week 3-6",
    },
    {
      number: "4",
      title: "Backend Development",
      description: "Develop robust APIs, databases, and business logic with Node.js/Python.",
      duration: "Week 4-7",
    },
    {
      number: "5",
      title: "Testing & QA",
      description: "Comprehensive testing: unit, integration, e2e, performance, and security.",
      duration: "Week 7-8",
    },
    {
      number: "6",
      title: "Deployment & Launch",
      description: "Deploy to production, monitor, and provide 30-day support guarantee.",
      duration: "Week 8-9",
    },
  ];

  const results = [
    {
      company: "TechNova",
      industry: "SaaS",
      metric: "Performance",
      value: "2.3s",
      timeline: "6 months",
      description: "Built full-featured SaaS platform with real-time collaboration. Page load time: 2.3s. 99.9% uptime.",
    },
    {
      company: "RetailMax",
      industry: "E-commerce",
      metric: "Conversion",
      value: "65%",
      timeline: "3 months",
      description: "Complete e-commerce redesign improved conversion rate by 65% through UX optimization.",
    },
    {
      company: "FinFlow",
      industry: "Fintech",
      metric: "Users",
      value: "50K",
      timeline: "8 months",
      description: "Developed scalable fintech platform handling 50K+ monthly active users securely.",
    },
    {
      company: "EduSmart",
      industry: "EdTech",
      metric: "Uptime",
      value: "99.95%",
      timeline: "ongoing",
      description: "Learning management system supporting 100K+ students with 99.95% uptime SLA.",
    },
    {
      company: "PropFlow",
      industry: "Real Estate",
      metric: "Speed",
      value: "1.8s",
      timeline: "4 months",
      description: "Real estate marketplace redesigned for speed. 1.8s load time. 40% bounce rate reduction.",
    },
    {
      company: "HealthPlus",
      industry: "Healthcare",
      metric: "Secure",
      value: "HIPAA",
      timeline: "ongoing",
      description: "HIPAA-compliant healthcare portal with patient data protection and 24/7 availability.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <ServiceHeroSection
        title="Build Scalable, High-Performance Web Applications"
        subtitle="Web Development"
        description="Custom web applications built with modern technologies. From MVPs to enterprise platforms, we deliver fast, secure, and scalable solutions."
        benefits={["65% Conversion Increase", "2.3s Load Time", "99.9% Uptime"]}
        ctaText="Start Your Project"
        gradient="from-indigo-600 to-purple-600"
      />

      <ServiceFeaturesSection
        title="Web Development Services"
        features={features}
      />

      <ServiceProcessSection
        title="Our Development Process"
        steps={steps}
        color="from-indigo-500 to-purple-500"
      />

      <ServiceResultsSection
        title="Projects We've Delivered"
        subtitle="Real applications serving thousands of users"
        results={results}
        color="from-indigo-500 to-purple-500"
      />

      <ServiceQuoteCTASection serviceName="Web Development" color="from-indigo-500 to-purple-500" />
    </main>
  );
};

export default WebDevelopmentPage;

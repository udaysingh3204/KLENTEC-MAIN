import ServiceHeroSection from "@/components/services/ServiceHeroSection";
import ServiceFeaturesSection from "@/components/services/ServiceFeaturesSection";
import ServiceProcessSection from "@/components/services/ServiceProcessSection";
import ServiceResultsSection from "@/components/services/ServiceResultsSection";
import ServiceQuoteCTASection from "@/components/services/ServiceQuoteCTASection";

const ManagedServicesPage = () => {
  const features = [
    {
      title: "Campaign Management",
      description: "Hands-off advertising management",
      items: ["Daily bid & budget optimization", "Audience targeting & testing", "Ad creative testing & iteration", "Performance monitoring & reporting"],
    },
    {
      title: "Content Production",
      description: "Consistent quality content",
      items: ["Blog post writing (2-4 per month)", "Social media content creation", "Email newsletter production", "Video script writing"],
    },
    {
      title: "Technical Maintenance",
      description: "Website reliability & security",
      items: ["24/7 uptime monitoring", "Security patching & updates", "Performance optimization", "Backup & disaster recovery"],
    },
    {
      title: "Analytics & Reporting",
      description: "Actionable performance insights",
      items: ["Weekly performance reports", "Monthly strategy reviews", "Custom dashboard creation", "KPI tracking & optimization"],
    },
    {
      title: "Team Support",
      description: "Training and best practices",
      items: ["Team training & onboarding", "Knowledge base creation", "Process documentation", "Ongoing support & guidance"],
    },
    {
      title: "Strategic Planning",
      description: "Continuous improvement",
      items: ["Quarterly strategy reviews", "A/B testing roadmap", "Competitive analysis", "Growth opportunity identification"],
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Onboarding",
      description: "Audit current setup, understand goals, and transition knowledge.",
      duration: "Week 1-2",
    },
    {
      number: "2",
      title: "Setup & Configuration",
      description: "Configure systems, set up automations, and establish dashboards.",
      duration: "Week 2-3",
    },
    {
      number: "3",
      title: "Baseline Establishment",
      description: "Establish current performance metrics and optimization baselines.",
      duration: "Week 3-4",
    },
    {
      number: "4",
      title: "Active Management",
      description: "Daily optimization, weekly reporting, and monthly strategy sessions.",
      duration: "Month 2+",
    },
    {
      number: "5",
      title: "Continuous Improvement",
      description: "Ongoing testing, optimization, and strategy refinement.",
      duration: "Ongoing",
    },
  ];

  const results = [
    {
      company: "RetailMax",
      industry: "E-commerce",
      metric: "Retention",
      value: "15+ yrs",
      timeline: "ongoing",
      description: "Long-term managed services partnership. Consistent 15% YoY growth maintained for 15+ years.",
    },
    {
      company: "TechNova",
      industry: "SaaS",
      metric: "Ad Spend ROI",
      value: "4.2x",
      timeline: "ongoing",
      description: "Managed campaign optimization maintained 4.2x ROAS consistently quarter after quarter.",
    },
    {
      company: "FinFlow",
      industry: "Fintech",
      metric: "Availability",
      value: "99.95%",
      timeline: "ongoing",
      description: "Managed technical services ensured 99.95% uptime with proactive monitoring.",
    },
    {
      company: "HealthPlus",
      industry: "Healthcare",
      metric: "Reporting",
      value: "100%",
      timeline: "ongoing",
      description: "Monthly reporting with actionable recommendations maintained 100% client satisfaction.",
    },
    {
      company: "ConsultPro",
      industry: "Services",
      metric: "Growth",
      value: "18%",
      timeline: "annual",
      description: "Managed services partnership delivered consistent 18% YoY revenue growth.",
    },
    {
      company: "EduSmart",
      industry: "EdTech",
      metric: "Support",
      value: "24/7",
      timeline: "ongoing",
      description: "24/7 technical support and management ensured zero service interruptions.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <ServiceHeroSection
        title="Ongoing Management for Consistent Growth"
        subtitle="Managed Services"
        description="Professional ongoing management so you can focus on your core business. We handle campaigns, content, and technical management month after month."
        benefits={["15+ Year Partnerships", "99.95% Uptime", "4.2x ROAS Maintained"]}
        ctaText="Get Managed Services"
        gradient="from-violet-600 to-purple-600"
      />

      <ServiceFeaturesSection
        title="Managed Services Included"
        features={features}
      />

      <ServiceProcessSection
        title="Our Managed Services Onboarding"
        steps={steps}
        color="from-violet-500 to-purple-500"
      />

      <ServiceResultsSection
        title="Long-Term Partnership Success"
        subtitle="Clients we've worked with for years"
        results={results}
        color="from-violet-500 to-purple-500"
      />

      <ServiceQuoteCTASection serviceName="Managed Services" color="from-violet-500 to-purple-500" />
    </main>
  );
};

export default ManagedServicesPage;

import ServiceHeroSection from "@/components/services/ServiceHeroSection";
import ServiceFeaturesSection from "@/components/services/ServiceFeaturesSection";
import ServiceProcessSection from "@/components/services/ServiceProcessSection";
import ServicePricingSection from "@/components/services/ServicePricingSection";
import ServiceResultsSection from "@/components/services/ServiceResultsSection";
import { Button } from "@/components/ui/button";

const AutomationPage = () => {
  const features = [
    {
      title: "Marketing Automation",
      description: "Scale outreach without scaling team",
      items: ["Email automation sequences", "Lead scoring & nurturing", "Campaign trigger workflows", "Behavioral tracking & segmentation"],
    },
    {
      title: "CRM Integration",
      description: "Unified customer data platform",
      items: ["HubSpot, Salesforce, Pipedrive setup", "Data synchronization", "Custom field mapping", "Reporting & dashboards"],
    },
    {
      title: "WhatsApp Business",
      description: "Instant customer engagement",
      items: ["WhatsApp Business API setup", "Automated greeting sequences", "Template messages", "Lead qualification flows"],
    },
    {
      title: "Workflow Automation",
      description: "Eliminate repetitive tasks",
      items: ["Zapier & Make.com workflows", "Task routing & assignment", "Approval workflows", "Data transformation & mapping"],
    },
    {
      title: "E-Commerce Automation",
      description: "Streamline order management",
      items: ["Inventory sync automation", "Order fulfillment workflows", "Customer notification sequences", "Post-purchase engagement"],
    },
    {
      title: "Analytics & Reporting",
      description: "Data-driven insights",
      items: ["Custom dashboard creation", "Real-time KPI tracking", "Automated report generation", "Performance alerting systems"],
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Workflow Audit",
      description: "Map current processes and identify automation opportunities.",
      duration: "Week 1",
    },
    {
      number: "2",
      title: "Solution Design",
      description: "Design optimal automation workflows and integration architecture.",
      duration: "Week 1-2",
    },
    {
      number: "3",
      title: "Implementation",
      description: "Set up tools, configure workflows, and perform testing.",
      duration: "Week 2-4",
    },
    {
      number: "4",
      title: "Training & Handoff",
      description: "Train your team and document all processes.",
      duration: "Week 4",
    },
    {
      number: "5",
      title: "Monitoring & Optimization",
      description: "Monitor performance and optimize workflows based on data.",
      duration: "Ongoing",
    },
  ];

  const tiers = [
    {
      name: "Starter",
      price: "₹50,000",
      period: "/month",
      description: "Essential automation",
      features: [
        "1-2 automation workflows",
        "CRM setup (basic)",
        "Email automation",
        "Monthly optimization",
      ],
      highlighted: false,
      cta: "Get Started",
    },
    {
      name: "Professional",
      price: "₹120,000",
      period: "/month",
      description: "Comprehensive automation",
      features: [
        "5+ automation workflows",
        "CRM + WhatsApp integration",
        "Lead scoring & nurturing",
        "Weekly optimization calls",
        "Dedicated automation manager",
      ],
      highlighted: true,
      cta: "Automate Now",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Full automation suite",
      features: [
        "Unlimited workflows",
        "Multi-system integration",
        "Custom API development",
        "24/7 monitoring & support",
        "Dedicated automation team",
      ],
      highlighted: false,
      cta: "Schedule Call",
    },
  ];

  const results = [
    {
      company: "FreshStart",
      industry: "Fitness",
      metric: "Lead Response",
      value: "68%",
      timeline: "3 months",
      description: "WhatsApp automation increased lead engagement from 8% to 68% with instant qualification sequences.",
    },
    {
      company: "NexaComm",
      industry: "Real Estate",
      metric: "Lead Follow-up",
      value: "30sec",
      timeline: "immediate",
      description: "Automated WhatsApp greeting + CRM integration reduced response time from 4 hours to 30 seconds.",
    },
    {
      company: "ConsultPro",
      industry: "Services",
      metric: "Time Saved",
      value: "40hrs/week",
      timeline: "month 1",
      description: "Marketing automation workflows saved 40 hours weekly on lead nurturing and follow-ups.",
    },
    {
      company: "RetailMax",
      industry: "E-commerce",
      metric: "Repeat Rate",
      value: "42%",
      timeline: "6 months",
      description: "Post-purchase automation sequences increased repeat purchase rate from 12% to 42%.",
    },
    {
      company: "TechNova",
      industry: "SaaS",
      metric: "Cost Reduction",
      value: "₹15L/year",
      timeline: "ongoing",
      description: "Workflow automation reduced manual labor costs by ₹15L annually while improving accuracy.",
    },
    {
      company: "FinFlow",
      industry: "Fintech",
      metric: "Efficiency",
      value: "3.5x",
      timeline: "ongoing",
      description: "CRM + WhatsApp integration increased customer service efficiency by 3.5x.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <ServiceHeroSection
        title="Automate Repetitive Tasks, Focus on Growth"
        subtitle="Automation & Integration"
        description="Eliminate manual work with intelligent automation. From marketing workflows to CRM integration, we build systems that scale with you."
        benefits={["68% Lead Response", "40hrs/week Saved", "3.5x Efficiency"]}
        ctaText="Automate Your Workflows"
        gradient="from-orange-600 to-red-600"
      />

      <ServiceFeaturesSection
        title="Automation Services"
        features={features}
      />

      <ServiceProcessSection
        title="Our Automation Process"
        steps={steps}
        color="from-orange-500 to-red-500"
      />

      <ServicePricingSection
        title="Automation Pricing"
        tiers={tiers}
        color="from-orange-500 to-red-500"
      />

      <ServiceResultsSection
        title="Automation Success Stories"
        subtitle="Teams working smarter, not harder"
        results={results}
        color="from-orange-500 to-red-500"
      />

      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Automate?
          </h2>
          <p className="text-lg text-slate-400 mb-8">
            Let's eliminate manual work and scale your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              Start Automation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-900"
            >
              View Integrations
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AutomationPage;

import ServiceHeroSection from "@/components/services/ServiceHeroSection";
import ServiceFeaturesSection from "@/components/services/ServiceFeaturesSection";
import ServiceProcessSection from "@/components/services/ServiceProcessSection";
import ServiceQuoteCTASection from "@/components/services/ServiceQuoteCTASection";
import { SEO } from "@/components/SEO";

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

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Automation & Integration"
        description="Eliminate manual work with intelligent automation — marketing workflows, CRM integration, and WhatsApp Business."
        path="/services/automation"
      />
      <ServiceHeroSection
        title="Automate Repetitive Tasks, Focus on Growth"
        subtitle="Automation & Integration"
        description="Eliminate manual work with intelligent automation. From marketing workflows to CRM integration, we build systems that scale with you."
        benefits={["Marketing Automation", "CRM Integration", "Fewer Manual Workflows"]}
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

      <ServiceQuoteCTASection serviceName="Automation" color="from-orange-500 to-red-500" />
    </main>
  );
};

export default AutomationPage;

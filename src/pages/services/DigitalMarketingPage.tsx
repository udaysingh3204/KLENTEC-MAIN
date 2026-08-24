import ServiceHeroSection from "@/components/services/ServiceHeroSection";
import ServiceFeaturesSection from "@/components/services/ServiceFeaturesSection";
import ServiceProcessSection from "@/components/services/ServiceProcessSection";
import ServiceResultsSection from "@/components/services/ServiceResultsSection";
import ServiceQuoteCTASection from "@/components/services/ServiceQuoteCTASection";

const DigitalMarketingPage = () => {
  const features = [
    {
      title: "PPC Campaigns",
      description: "Paid advertising that converts",
      items: [
        "Google Ads & Microsoft Ads management",
        "Facebook & Instagram ad campaigns",
        "LinkedIn advertising for B2B",
        "Remarketing & conversion optimization",
        "A/B testing & bid optimization",
      ],
    },
    {
      title: "SEO & Content",
      description: "Organic growth that lasts",
      items: [
        "Technical SEO audit & fixes",
        "Keyword research & strategy",
        "Content creation & optimization",
        "Link building & authority",
        "Core Web Vitals optimization",
      ],
    },
    {
      title: "Social Media",
      description: "Build your audience & community",
      items: [
        "Social media strategy & planning",
        "Content calendar & creation",
        "Community management & engagement",
        "Paid social advertising",
        "Influencer partnerships",
      ],
    },
    {
      title: "Email Marketing",
      description: "Direct communication that sells",
      items: [
        "Email list building & segmentation",
        "Campaign design & copywriting",
        "Automation & workflows",
        "Performance tracking & optimization",
        "A/B testing & personalization",
      ],
    },
    {
      title: "Analytics & Reporting",
      description: "Data-driven decisions",
      items: [
        "Google Analytics 4 setup & tracking",
        "Conversion tracking implementation",
        "Custom dashboards & reporting",
        "Monthly performance reviews",
        "ROI analysis & recommendations",
      ],
    },
    {
      title: "Conversion Optimization",
      description: "Turn visitors into customers",
      items: [
        "Landing page optimization",
        "Funnel analysis & improvement",
        "User experience testing",
        "Copy testing & headlines",
        "Form optimization & reduction",
      ],
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Discovery & Audit",
      description: "We analyze your current digital presence, competitors, and market to create a baseline for success.",
      duration: "Week 1-2",
    },
    {
      number: "2",
      title: "Strategy Planning",
      description: "Based on our findings, we create a comprehensive digital marketing strategy with clear KPIs and milestones.",
      duration: "Week 2-3",
    },
    {
      number: "3",
      title: "Campaign Setup",
      description: "We set up all campaigns, tracking, and monitoring systems to ensure accurate data collection.",
      duration: "Week 3-4",
    },
    {
      number: "4",
      title: "Launch & Scale",
      description: "We launch campaigns with conservative budgets, test variations, and scale winners.",
      duration: "Week 4-8",
    },
    {
      number: "5",
      title: "Optimization",
      description: "Continuous testing and optimization based on data to improve performance and reduce CAC.",
      duration: "Ongoing",
    },
    {
      number: "6",
      title: "Reporting & Growth",
      description: "Weekly optimization, monthly reporting, and strategic recommendations for growth.",
      duration: "Monthly",
    },
  ];

  const results = [
    {
      company: "RetailMax",
      industry: "E-commerce",
      metric: "Revenue Growth",
      value: "4.2x",
      timeline: "12 months",
      description: "E-commerce brand increased ad ROAS from 2x to 4.2x through strategic bidding and audience refinement.",
    },
    {
      company: "TechNova",
      industry: "SaaS",
      metric: "Organic Traffic",
      value: "580%",
      timeline: "12 months",
      description: "SaaS company went from 2K to 13K monthly organic visitors through SEO and content strategy.",
    },
    {
      company: "ConsultPro",
      industry: "B2B Services",
      metric: "Lead Cost",
      value: "-68%",
      timeline: "6 months",
      description: "Consulting firm reduced cost per lead from ₹5000 to ₹1600 through audience targeting optimization.",
    },
    {
      company: "FreshStart",
      industry: "Fitness",
      metric: "Lead Response",
      value: "68%",
      timeline: "3 months",
      description: "Fitness brand improved lead engagement from 8% to 68% with automated WhatsApp follow-up sequences.",
    },
    {
      company: "HealthPlus",
      industry: "Healthcare",
      metric: "Conversion Rate",
      value: "3.5x",
      timeline: "8 months",
      description: "Healthcare provider increased consultation bookings through landing page optimization.",
    },
    {
      company: "FinFlow",
      industry: "Fintech",
      metric: "App Downloads",
      value: "250%",
      timeline: "6 months",
      description: "Fintech startup grew app downloads from 500/mo to 1,800/mo via integrated ad campaigns.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <ServiceHeroSection
        title="Drive Revenue Growth Through Digital Marketing"
        subtitle="Digital Marketing"
        description="Strategic campaigns that generate qualified leads and drive revenue. From PPC to SEO, we combine data-driven insights with creative execution to deliver measurable results."
        benefits={["4.2x Average ROAS", "580% Organic Growth", "68% Lead Response Rate"]}
        ctaText="Schedule Marketing Audit"
        gradient="from-blue-600 to-cyan-600"
      />

      <ServiceFeaturesSection
        title="Our Digital Marketing Capabilities"
        features={features}
      />

      <ServiceProcessSection
        title="Our 6-Step Digital Marketing Process"
        steps={steps}
        color="from-blue-500 to-cyan-500"
      />

      <ServiceResultsSection
        title="Client Success Stories"
        subtitle="Real results from businesses like yours"
        results={results}
        color="from-blue-500 to-cyan-500"
      />

      <ServiceQuoteCTASection serviceName="Digital Marketing" color="from-blue-500 to-cyan-500" />
    </main>
  );
};

export default DigitalMarketingPage;

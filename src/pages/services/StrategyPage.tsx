import ServiceHeroSection from "@/components/services/ServiceHeroSection";
import ServiceFeaturesSection from "@/components/services/ServiceFeaturesSection";
import ServiceProcessSection from "@/components/services/ServiceProcessSection";
import ServiceResultsSection from "@/components/services/ServiceResultsSection";
import ServiceQuoteCTASection from "@/components/services/ServiceQuoteCTASection";

const StrategyPage = () => {
  const features = [
    {
      title: "Growth Strategy",
      description: "Roadmap for scaling revenue",
      items: ["Market analysis & positioning", "Growth channel prioritization", "Customer acquisition strategy", "Revenue model optimization"],
    },
    {
      title: "Digital Transformation",
      description: "Modernize your business",
      items: ["Digital readiness assessment", "Technology stack recommendations", "Process automation planning", "Change management consulting"],
    },
    {
      title: "Conversion Optimization",
      description: "Turn visitors into customers",
      items: ["Funnel analysis & optimization", "Landing page strategy", "A/B testing roadmap", "User experience improvements"],
    },
    {
      title: "Competitive Analysis",
      description: "Outpace your competition",
      items: ["Competitive landscape mapping", "Positioning strategy", "Feature gap analysis", "Pricing strategy optimization"],
    },
    {
      title: "Business Intelligence",
      description: "Data-driven decision making",
      items: ["Analytics implementation", "Dashboard creation", "KPI definition & tracking", "Predictive analytics"],
    },
    {
      title: "Executive Coaching",
      description: "Leadership development",
      items: ["Digital leadership training", "Team alignment workshops", "Decision-making frameworks", "Change leadership coaching"],
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Discovery & Assessment",
      description: "Understand your business, goals, market position, and challenges.",
      duration: "Week 1-2",
    },
    {
      number: "2",
      title: "Analysis & Insights",
      description: "Conduct competitive analysis, market research, and performance audit.",
      duration: "Week 2-3",
    },
    {
      number: "3",
      title: "Strategy Development",
      description: "Create comprehensive strategy roadmap with tactics and KPIs.",
      duration: "Week 3-4",
    },
    {
      number: "4",
      title: "Implementation Planning",
      description: "Break strategy into phases with timeline, budget, and team requirements.",
      duration: "Week 4-5",
    },
    {
      number: "5",
      title: "Execution & Monitoring",
      description: "Support implementation and monitor progress against KPIs.",
      duration: "Ongoing",
    },
  ];

  const results = [
    {
      company: "TechNova",
      industry: "SaaS",
      metric: "Growth Rate",
      value: "3.5x",
      timeline: "12 months",
      description: "Strategic repositioning and market expansion strategy increased YoY growth from 80% to 280%.",
    },
    {
      company: "ConsultPro",
      industry: "Services",
      metric: "Revenue",
      value: "2.8x",
      timeline: "18 months",
      description: "Growth strategy and pricing optimization increased blended revenue ROI from 1.8x to 2.8x.",
    },
    {
      company: "RetailMax",
      industry: "E-commerce",
      metric: "Margin",
      value: "+28%",
      timeline: "9 months",
      description: "Digital transformation strategy improved gross margins by 28% through operational efficiency.",
    },
    {
      company: "FinFlow",
      industry: "Fintech",
      metric: "CAC",
      value: "-45%",
      timeline: "6 months",
      description: "Acquisition strategy optimization reduced customer acquisition cost by 45%.",
    },
    {
      company: "FreshStart",
      industry: "Startup",
      metric: "Funding",
      value: "₹5Cr",
      timeline: "funding round",
      description: "Strategic roadmap and market positioning helped secure Series A funding.",
    },
    {
      company: "EduSmart",
      industry: "EdTech",
      metric: "Expansion",
      value: "5 Markets",
      timeline: "12 months",
      description: "Expansion strategy enabled entry into 5 new geographic markets successfully.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <ServiceHeroSection
        title="Strategic Guidance for Digital Excellence"
        subtitle="Strategy & Consulting"
        description="Expert consulting to navigate digital transformation. From growth strategy to competitive positioning, we provide the roadmap for sustainable success."
        benefits={["2.8x Revenue Growth", "3.5x YoY Increase", "280% Margin Improvement"]}
        ctaText="Get Strategic Guidance"
        gradient="from-emerald-600 to-teal-600"
      />

      <ServiceFeaturesSection
        title="Strategy & Consulting Services"
        features={features}
      />

      <ServiceProcessSection
        title="Our Strategy Process"
        steps={steps}
        color="from-emerald-500 to-teal-500"
      />

      <ServiceResultsSection
        title="Strategic Wins"
        subtitle="Helping businesses achieve breakthrough growth"
        results={results}
        color="from-emerald-500 to-teal-500"
      />

      <ServiceQuoteCTASection serviceName="Strategy & Consulting" color="from-emerald-500 to-teal-500" />
    </main>
  );
};

export default StrategyPage;

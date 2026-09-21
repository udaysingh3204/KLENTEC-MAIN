import ServiceHeroSection from "@/components/services/ServiceHeroSection";
import ServiceFeaturesSection from "@/components/services/ServiceFeaturesSection";
import ServiceProcessSection from "@/components/services/ServiceProcessSection";
import ServiceQuoteCTASection from "@/components/services/ServiceQuoteCTASection";
import { SEO } from "@/components/SEO";

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

  return (
    <main className="min-h-screen bg-background">
      <SEO
        title="Strategy & Consulting"
        description="Growth strategy and digital transformation guidance for scaling businesses."
        path="/services/strategy"
      />
      <ServiceHeroSection
        title="Strategic Guidance for Digital Excellence"
        subtitle="Strategy & Consulting"
        description="Expert consulting to navigate digital transformation. From growth strategy to competitive positioning, we provide the roadmap for sustainable success."
        benefits={["Growth Strategy Roadmap", "Competitive Analysis", "Data-Driven Decisions"]}
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

      <ServiceQuoteCTASection serviceName="Strategy & Consulting" color="from-emerald-500 to-teal-500" />
    </main>
  );
};

export default StrategyPage;

import ServiceHeroSection from "@/components/services/ServiceHeroSection";
import ServiceFeaturesSection from "@/components/services/ServiceFeaturesSection";
import ServiceProcessSection from "@/components/services/ServiceProcessSection";
import ServiceResultsSection from "@/components/services/ServiceResultsSection";
import ServiceQuoteCTASection from "@/components/services/ServiceQuoteCTASection";

const DesignBrandingPage = () => {
  const features = [
    {
      title: "Brand Strategy",
      description: "Foundation for lasting impact",
      items: ["Brand positioning & messaging", "Competitor analysis", "Target audience research", "Brand voice & tone guidelines"],
    },
    {
      title: "Visual Identity",
      description: "Your unique visual signature",
      items: ["Logo design & variations", "Color palette development", "Typography system", "Brand guidelines documentation"],
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive experiences",
      items: ["Wireframing & prototyping", "User experience optimization", "Accessibility compliance", "Interactive prototypes"],
    },
    {
      title: "Web & Mobile Design",
      description: "Digital presence that converts",
      items: ["Responsive web design", "Mobile app UI design", "Design system creation", "High-fidelity mockups"],
    },
    {
      title: "Collateral & Print",
      description: "Cohesive brand experience",
      items: ["Business card design", "Brochure & flyer design", "Packaging design", "Marketing collateral"],
    },
    {
      title: "Design Systems",
      description: "Scalable design infrastructure",
      items: ["Component library creation", "Design tokens", "Documentation & handoff", "Figma design systems"],
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Discovery & Strategy",
      description: "Understand your vision, values, and competitive landscape.",
      duration: "Week 1",
    },
    {
      number: "2",
      title: "Concept Development",
      description: "Create 3-5 distinct brand concepts and visual directions.",
      duration: "Week 2",
    },
    {
      number: "3",
      title: "Refinement",
      description: "Refine the chosen concept and develop full visual system.",
      duration: "Week 3",
    },
    {
      number: "4",
      title: "Application Design",
      description: "Design web, mobile, and marketing materials.",
      duration: "Week 4-5",
    },
    {
      number: "5",
      title: "Documentation",
      description: "Create comprehensive brand guidelines & design system.",
      duration: "Week 5",
    },
    {
      number: "6",
      title: "Implementation Support",
      description: "Support team during brand rollout and asset delivery.",
      duration: "Ongoing",
    },
  ];

  const results = [
    {
      company: "BrandLab",
      industry: "Consumer",
      metric: "Brand Recall",
      value: "4x",
      timeline: "3 months",
      description: "Complete visual identity redesign increased brand recall by 4x in post-campaign survey.",
    },
    {
      company: "Maya Designs",
      industry: "Agency",
      metric: "Website Traffic",
      value: "280%",
      timeline: "6 months",
      description: "Portfolio redesign with new branding increased agency website traffic by 280%.",
    },
    {
      company: "TechNova",
      industry: "SaaS",
      metric: "Conversion",
      value: "+45%",
      timeline: "4 months",
      description: "New UI/UX design system increased SaaS product conversions by 45%.",
    },
    {
      company: "FreshStart",
      industry: "Startup",
      metric: "Investment",
      value: "₹2.5Cr",
      timeline: "presentation",
      description: "Complete brand identity helped startup secure Series A funding with compelling pitch deck design.",
    },
    {
      company: "RetailMax",
      industry: "E-commerce",
      metric: "CTR",
      value: "3.2x",
      timeline: "ongoing",
      description: "Marketing collateral redesign increased click-through rates by 3.2x across campaigns.",
    },
    {
      company: "HealthPlus",
      industry: "Healthcare",
      metric: "Trust",
      value: "92%",
      timeline: "post-launch",
      description: "Professional brand identity redesign increased patient trust and satisfaction to 92%.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <ServiceHeroSection
        title="Create Memorable Brand Experiences"
        subtitle="Design & Branding"
        description="Strategic brand identity and design that stands out. From logo to full visual systems, we create brands that resonate and convert."
        benefits={["4x Brand Recall", "280% Traffic Growth", "92% Trust Score"]}
        ctaText="Start Brand Journey"
        gradient="from-pink-600 to-rose-600"
      />

      <ServiceFeaturesSection
        title="Design & Branding Services"
        features={features}
      />

      <ServiceProcessSection
        title="Our Brand Design Process"
        steps={steps}
        color="from-pink-500 to-rose-500"
      />

      <ServiceResultsSection
        title="Brands We've Created"
        subtitle="Visual identities that drive business growth"
        results={results}
        color="from-pink-500 to-rose-500"
      />

      <ServiceQuoteCTASection serviceName="Design & Branding" color="from-pink-500 to-rose-500" />
    </main>
  );
};

export default DesignBrandingPage;

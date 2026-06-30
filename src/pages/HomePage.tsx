// Enterprise components (Phase 1)
import EnterpriseHeroSection from "@/components/home/EnterpriseHeroSection";
import SocialProofBanner from "@/components/home/SocialProofBanner";
import EnterpriseServicesShowcase from "@/components/home/EnterpriseServicesShowcase";
import StrategicCTASection from "@/components/home/StrategicCTASection";

// Existing sections (legacy - can be optimized later)
import LogoMarquee from "@/components/home/LogoMarquee";
import ProblemSection from "@/components/home/ProblemSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WhyKlentecSection from "@/components/home/WhyKlentecSection";
import EngagementModelsSection from "@/components/home/EngagementModelsSection";
import MetricsSection from "@/components/home/MetricsSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GrowthAuditSection from "@/components/home/GrowthAuditSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTASection from "@/components/home/FinalCTASection";

const HomePage = () => (
  <main>
    {/* Phase 1: Enterprise Foundation */}
    <EnterpriseHeroSection />
    <SocialProofBanner />
    <EnterpriseServicesShowcase />

    {/* Supporting sections */}
    <ProblemSection />
    <HowItWorksSection />
    <WhyKlentecSection />
    <EngagementModelsSection />
    <MetricsSection />
    <CaseStudiesSection />
    <ComparisonSection />
    <IndustriesSection />
    <TestimonialsSection />

    {/* Lead generation section */}
    <StrategicCTASection />

    {/* Existing sections */}
    <GrowthAuditSection />
    <FAQSection />
    <FinalCTASection />
  </main>
);

export default HomePage;

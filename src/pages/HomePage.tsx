import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WhyKlentecSection from "@/components/home/WhyKlentecSection";
import TechSection from "@/components/home/TechSection";
import MetricsSection from "@/components/home/MetricsSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrustSection from "@/components/home/TrustSection";
import GrowthAuditSection from "@/components/home/GrowthAuditSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTASection from "@/components/home/FinalCTASection";

const HomePage = () => (
  <main>
    <HeroSection />

    {/* Social Proof Strip */}
    <section className="divider-subtle py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          Trusted by fast-growing brands, startups, and ambitious founders.
        </p>
      </div>
    </section>

    <ProblemSection />
    <ServicesSection />
    <HowItWorksSection />
    <WhyKlentecSection />
    <TechSection />
    <MetricsSection />
    <CaseStudiesSection />
    <ComparisonSection />
    <IndustriesSection />
    <TestimonialsSection />
    <TrustSection />
    <GrowthAuditSection />
    <FAQSection />
    <FinalCTASection />
  </main>
);

export default HomePage;

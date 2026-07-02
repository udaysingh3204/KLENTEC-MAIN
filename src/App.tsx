import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import PublicLayout from "@/components/PublicLayout";

// Public pages
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import TeamPage from "./pages/TeamPage";
import CareersPage from "./pages/CareersPage";
import NotFound from "./pages/NotFound";

// Service pages
import DigitalMarketingPage from "./pages/services/DigitalMarketingPage";
import WebDevelopmentPage from "./pages/services/WebDevelopmentPage";
import DesignBrandingPage from "./pages/services/DesignBrandingPage";
import AutomationPage from "./pages/services/AutomationPage";
import StrategyPage from "./pages/services/StrategyPage";
import ManagedServicesPage from "./pages/services/ManagedServicesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ── Public marketing site (Navbar + Footer) ── */}
          <Route element={<PublicLayout />}>
            <Route path="/"         element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work"     element={<WorkPage />} />
            <Route path="/about"    element={<AboutPage />} />
            <Route path="/contact"  element={<ContactPage />} />
            <Route path="/blog"     element={<BlogPage />} />
            <Route path="/team"     element={<TeamPage />} />
            <Route path="/careers"  element={<CareersPage />} />

            {/* Service Pages */}
            <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
            <Route path="/services/web-development" element={<WebDevelopmentPage />} />
            <Route path="/services/design-branding" element={<DesignBrandingPage />} />
            <Route path="/services/automation" element={<AutomationPage />} />
            <Route path="/services/strategy" element={<StrategyPage />} />
            <Route path="/services/managed-services" element={<ManagedServicesPage />} />
          </Route>

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

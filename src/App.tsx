import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RegionalProvider } from "@/contexts/RegionalContext";
import { lazy, Suspense } from "react";

import PublicLayout from "@/components/PublicLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import { CookieConsent } from "@/components/CookieConsent";

// Critical pages (loaded immediately)
import NotFound from "./pages/NotFound";

// Lazy-loaded pages (loaded on demand)
const HomePage = lazy(() => import("./pages/HomePage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminResetPassword = lazy(() => import("./pages/AdminResetPassword"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));

// Admin pages (lazy loaded)
const AdminDashboardHome = lazy(() => import("./pages/admin/DashboardHome"));
const AdminLeads = lazy(() => import("./pages/admin/LeadsPage"));
const AdminReviews = lazy(() => import("./pages/admin/ReviewsPage"));
const AdminInquiries = lazy(() => import("./pages/admin/InquiriesPage"));
const AdminDocuments = lazy(() => import("./pages/admin/DocumentsPage"));

// Service pages (lazy loaded)
const DigitalMarketingPage = lazy(() => import("./pages/services/DigitalMarketingPage"));
const WebDevelopmentPage = lazy(() => import("./pages/services/WebDevelopmentPage"));
const DesignBrandingPage = lazy(() => import("./pages/services/DesignBrandingPage"));
const AutomationPage = lazy(() => import("./pages/services/AutomationPage"));
const StrategyPage = lazy(() => import("./pages/services/StrategyPage"));
const ManagedServicesPage = lazy(() => import("./pages/services/ManagedServicesPage"));
const FastTrackWebDevPage = lazy(() => import("./pages/services/FastTrackWebDevPage"));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="text-slate-400">Loading...</div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RegionalProvider>
        <Toaster />
        <Sonner />
        <Analytics />
        <BrowserRouter>
        <CookieConsent />
        <Routes>
          {/* ── Public marketing site (Navbar + Footer) ── */}
          <Route element={<PublicLayout />}>
            <Route path="/"                    element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
            <Route path="/services"            element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
            <Route path="/work"                element={<Suspense fallback={<PageLoader />}><WorkPage /></Suspense>} />
            <Route path="/about"    element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
            <Route path="/contact"  element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
            <Route path="/blog"     element={<Suspense fallback={<PageLoader />}><BlogPage /></Suspense>} />
            <Route path="/blog/:slug" element={<Suspense fallback={<PageLoader />}><BlogPostPage /></Suspense>} />
            <Route path="/team"     element={<Suspense fallback={<PageLoader />}><TeamPage /></Suspense>} />
            <Route path="/careers"  element={<Suspense fallback={<PageLoader />}><CareersPage /></Suspense>} />
            <Route path="/privacy"      element={<Suspense fallback={<PageLoader />}><PrivacyPage /></Suspense>} />
            <Route path="/terms"        element={<Suspense fallback={<PageLoader />}><TermsPage /></Suspense>} />
            <Route path="/testimonials" element={<Suspense fallback={<PageLoader />}><TestimonialsPage /></Suspense>} />
            <Route path="/faq"          element={<Suspense fallback={<PageLoader />}><FAQPage /></Suspense>} />

            {/* Service Pages */}
            <Route path="/services/digital-marketing" element={<Suspense fallback={<PageLoader />}><DigitalMarketingPage /></Suspense>} />
            <Route path="/services/web-development" element={<Suspense fallback={<PageLoader />}><WebDevelopmentPage /></Suspense>} />
            <Route path="/services/design-branding" element={<Suspense fallback={<PageLoader />}><DesignBrandingPage /></Suspense>} />
            <Route path="/services/automation" element={<Suspense fallback={<PageLoader />}><AutomationPage /></Suspense>} />
            <Route path="/services/strategy" element={<Suspense fallback={<PageLoader />}><StrategyPage /></Suspense>} />
            <Route path="/services/managed-services" element={<Suspense fallback={<PageLoader />}><ManagedServicesPage /></Suspense>} />
            <Route path="/services/24-hour-web-dev" element={<Suspense fallback={<PageLoader />}><FastTrackWebDevPage /></Suspense>} />
          </Route>

          {/* ── Admin Authentication ── */}
          <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><AdminLogin /></Suspense>} />
          <Route path="/admin/reset-password" element={<Suspense fallback={<PageLoader />}><AdminResetPassword /></Suspense>} />

          {/* ── Admin Dashboard (protected, shared layout) ── */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Suspense fallback={<PageLoader />}><AdminDashboardHome /></Suspense>} />
            <Route path="inquiries" element={<Suspense fallback={<PageLoader />}><AdminInquiries /></Suspense>} />
            <Route path="leads" element={<Suspense fallback={<PageLoader />}><AdminLeads /></Suspense>} />
            <Route path="reviews" element={<Suspense fallback={<PageLoader />}><AdminReviews /></Suspense>} />
            <Route path="documents" element={<Suspense fallback={<PageLoader />}><AdminDocuments /></Suspense>} />
          </Route>

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </RegionalProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;

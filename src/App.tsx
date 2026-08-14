import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RegionalProvider } from "@/contexts/RegionalContext";
import { lazy, Suspense } from "react";

import PublicLayout from "@/components/PublicLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Critical pages (loaded immediately)
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

// Lazy-loaded pages (loaded on demand)
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage"));
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
const AdminDashboardHome = lazy(() => import("./pages/AdminDashboardHome"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminReviews = lazy(() => import("./pages/AdminReviews"));

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
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RegionalProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          {/* ── Public marketing site (Navbar + Footer) ── */}
          <Route element={<PublicLayout />}>
            <Route path="/"                    element={<HomePage />} />
            <Route path="/services"            element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
            <Route path="/checkout"            element={<Suspense fallback={<PageLoader />}><CheckoutPage /></Suspense>} />
            <Route path="/payment/success"     element={<Suspense fallback={<PageLoader />}><PaymentSuccessPage /></Suspense>} />
            <Route path="/work"                element={<Suspense fallback={<PageLoader />}><WorkPage /></Suspense>} />
            <Route path="/about"    element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
            <Route path="/contact"  element={<ContactPage />} />
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
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ── Admin Dashboard (protected) ── */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <AdminDashboardHome />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <AdminDashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute>
                <Suspense fallback={<PageLoader />}>
                  <AdminReviews />
                </Suspense>
              </ProtectedRoute>
            }
          />

          {/* ── 404 ── */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </RegionalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

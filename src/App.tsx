import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicLayout from "@/components/PublicLayout";

// Public pages
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InquiriesPage from "./pages/admin/InquiriesPage";
import ClientsPage from "./pages/admin/ClientsPage";
import ProjectsPage from "./pages/admin/ProjectsPage";
import InvoicesPage from "./pages/admin/InvoicesPage";

// Client pages
import ClientLayout from "./pages/client/ClientLayout";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientProjectsPage from "./pages/client/ClientProjectsPage";
import ClientDeliverablesPage from "./pages/client/ClientDeliverablesPage";
import ClientInvoicesPage from "./pages/client/ClientInvoicesPage";
import ClientMessagesPage from "./pages/client/ClientMessagesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            </Route>

            {/* ── Auth ── */}
            <Route path="/login" element={<LoginPage />} />

            {/* ── Admin portal (auth guarded) ── */}
            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index           element={<AdminDashboard />} />
                <Route path="inquiries" element={<InquiriesPage />} />
                <Route path="clients"   element={<ClientsPage />} />
                <Route path="projects"  element={<ProjectsPage />} />
                <Route path="invoices"  element={<InvoicesPage />} />
              </Route>
            </Route>

            {/* ── Client portal (auth guarded) ── */}
            <Route element={<ProtectedRoute role="client" />}>
              <Route path="/client" element={<ClientLayout />}>
                <Route index                element={<ClientDashboard />} />
                <Route path="projects"      element={<ClientProjectsPage />} />
                <Route path="deliverables"  element={<ClientDeliverablesPage />} />
                <Route path="invoices"      element={<ClientInvoicesPage />} />
                <Route path="messages"      element={<ClientMessagesPage />} />
              </Route>
            </Route>

            {/* ── 404 ── */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

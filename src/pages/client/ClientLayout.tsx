import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, Download, Receipt,
  MessageCircle, LogOut, Menu, X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logoBlack from "@/assets/logo-black.png";

const navItems = [
  { icon: LayoutDashboard, label: "Overview",     to: "/client" },
  { icon: FolderOpen,      label: "My Projects",  to: "/client/projects" },
  { icon: Download,        label: "Deliverables", to: "/client/deliverables" },
  { icon: Receipt,         label: "Invoices",     to: "/client/invoices" },
  { icon: MessageCircle,   label: "Messages",     to: "/client/messages" },
];

const ClientLayout = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-border/30">
        <img src={logoBlack} alt="KLENTEC" className="h-9 w-auto" />
        <p className="text-muted-foreground text-[10px] tracking-widest uppercase mt-1.5">Client Portal</p>
      </div>

      {/* Welcome */}
      <div className="px-4 pt-5 pb-2">
        <div className="px-4 py-3 rounded-2xl bg-accent/40">
          <p className="text-xs text-muted-foreground">Logged in as</p>
          <p className="text-sm font-display font-bold text-foreground mt-0.5 truncate">
            {profile?.full_name ?? profile?.email?.split("@")[0] ?? "Client"}
          </p>
          {profile?.company && (
            <p className="text-xs text-muted-foreground truncate">{profile.company}</p>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/client"}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background:
                      "linear-gradient(135deg, hsl(260 65% 55% / 0.1), hsl(260 100% 75% / 0.06))",
                    border: "1px solid hsl(260 65% 55% / 0.12)",
                  }
                : {}
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-border/30">
        <button
          onClick={handleSignOut}
          className="sidebar-link w-full text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-full bg-card border-r border-border/40">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="lg:hidden fixed inset-y-0 left-0 w-64 z-50 flex flex-col bg-card border-r border-border/40">
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border/40 flex items-center justify-between px-6 shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 100% 70%))" }}>
              {profile?.full_name?.[0]?.toUpperCase() ?? "C"}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;

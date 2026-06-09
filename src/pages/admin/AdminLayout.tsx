import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Inbox, Users, FolderKanban,
  Receipt, LogOut, Menu, X, ChevronRight, Bell, MessageCircle, PackageOpen,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import logoWhite from "@/assets/logo-white.png";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",     to: "/admin" },
  { icon: Inbox,           label: "Inquiries",     to: "/admin/inquiries" },
  { icon: MessageCircle,   label: "Messages",      to: "/admin/messages" },
  { icon: Users,           label: "Clients",       to: "/admin/clients" },
  { icon: FolderKanban,    label: "Projects",      to: "/admin/projects" },
  { icon: PackageOpen,     label: "Deliverables",  to: "/admin/deliverables" },
  { icon: Receipt,         label: "Invoices",      to: "/admin/invoices" },
];

interface Inquiry {
  id: string;
  name: string;
  company?: string;
  email: string;
  created_at: string;
}

const AdminLayout = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newInquiries, setNewInquiries] = useState(0);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const { data: count } = await supabase
        .from("inquiries")
        .select("id", { count: "exact", head: true })
        .eq("status", "new");
      setNewInquiries(count?.length ?? 0);

      const { data: inquiries } = await supabase
        .from("inquiries")
        .select("id,name,company,email,created_at")
        .eq("status", "new")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentInquiries(inquiries ?? []);
    };
    loadNotifications();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <img src={logoWhite} alt="KLENTEC" className="h-9 w-auto" onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
          (e.target as HTMLImageElement).insertAdjacentHTML("afterend",
            '<span class="text-white font-display text-xl font-bold tracking-tight">KLENTEC</span>');
        }} />
        <p className="text-white/40 text-[10px] tracking-widest uppercase mt-1.5">Admin Portal</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background:
                      "linear-gradient(135deg, hsl(260 65% 55% / 0.8), hsl(260 60% 45% / 0.6))",
                    boxShadow: "0 4px 16px hsl(260 65% 55% / 0.25)",
                  }
                : {}
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="flex-1">{label}</span>
            {label === "Inquiries" && newInquiries > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-bold flex items-center justify-center">
                {newInquiries > 9 ? "9+" : newInquiries}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User info + logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 mb-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 100% 70%))" }}>
            {profile?.full_name?.[0]?.toUpperCase() ?? "A"}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{profile?.full_name ?? "Admin"}</p>
            <p className="text-white/40 text-[10px] truncate">{profile?.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 shrink-0 h-full"
        style={{ background: "linear-gradient(180deg, #0d0118, #100020)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="lg:hidden fixed inset-y-0 left-0 w-64 z-50 flex flex-col"
              style={{ background: "linear-gradient(180deg, #0d0118, #100020)" }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
            <span>KLENTEC</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-600 font-medium">Admin</span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <Bell className="w-4 h-4" />
                {newInquiries > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
                )}
              </button>
              {notificationOpen && recentInquiries.length > 0 && (
                <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-900">New Inquiries</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {recentInquiries.map((inquiry) => (
                      <NavLink
                        key={inquiry.id}
                        to="/admin/inquiries"
                        onClick={() => setNotificationOpen(false)}
                        className="block px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors"
                      >
                        <p className="text-sm font-medium text-slate-900">{inquiry.name}</p>
                        <p className="text-xs text-slate-500">{inquiry.company || "No company"}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(inquiry.created_at).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </NavLink>
                    ))}
                  </div>
                  <NavLink
                    to="/admin/inquiries"
                    onClick={() => setNotificationOpen(false)}
                    className="block px-4 py-3 text-center text-sm font-medium text-primary hover:bg-slate-50 transition-colors border-t border-slate-100"
                  >
                    View all inquiries →
                  </NavLink>
                </div>
              )}
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 100% 70%))" }}>
              {profile?.full_name?.[0]?.toUpperCase() ?? "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

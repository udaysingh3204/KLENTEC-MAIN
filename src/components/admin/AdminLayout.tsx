import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LayoutDashboard, Inbox, Users, Star, FileText, LogOut } from "lucide-react";
import { adminSignOut, getCurrentAdmin } from "@/services/adminAuthService";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/inquiries", label: "Inquiries", icon: Inbox, end: false },
  { to: "/admin/leads", label: "Leads", icon: Users, end: false },
  { to: "/admin/reviews", label: "Reviews", icon: Star, end: false },
  { to: "/admin/documents", label: "Documents", icon: FileText, end: false },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    getCurrentAdmin().then((user) => setEmail(user?.email || ""));
  }, []);

  const handleLogout = async () => {
    await adminSignOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <aside className="w-64 shrink-0 bg-white border-r border-slate-100 flex flex-col fixed inset-y-0 left-0 z-30">
        <div className="px-6 py-6 border-b border-slate-100">
          <span className="text-lg font-display font-bold text-slate-900">KLENTEC</span>
          <p className="text-xs text-slate-400 mt-0.5">Admin</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive
                      ? "bg-purple-50 text-purple-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-slate-100">
          {email && <p className="px-4 text-xs text-slate-400 mb-2 truncate">{email}</p>}
          <button
            onClick={handleLogout}
            className="sidebar-link w-full text-slate-600 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="pl-64">
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

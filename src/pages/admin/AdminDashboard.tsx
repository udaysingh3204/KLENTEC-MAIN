import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, FolderKanban, Inbox, IndianRupee, ArrowRight, TrendingUp, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Inquiry, Client, Project } from "@/lib/types";

/* ── helpers ─────────────────────────────────────────────── */
const fmt = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;

const statusColor: Record<string, string> = {
  new: "bg-amber-100 text-amber-700",
  contacted: "bg-blue-100 text-blue-700",
  proposal_sent: "bg-purple-100 text-purple-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-slate-100 text-slate-500",
};

const projStatusColor: Record<string, string> = {
  planning: "bg-slate-100 text-slate-600",
  active: "bg-blue-100 text-blue-700",
  review: "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
};

/* ── component ───────────────────────────────────────────── */
const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [{ data: inq }, { data: cl }, { data: pr }] = await Promise.all([
        supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("clients").select("*").order("created_at", { ascending: false }),
        supabase.from("projects").select("*,clients(company)").order("created_at", { ascending: false }).limit(5),
      ]);
      setInquiries(inq ?? []);
      setClients(cl ?? []);
      setProjects(pr ?? []);
      // Revenue = sum of total_billed
      const total = (cl ?? []).reduce((s, c) => s + (c.total_billed ?? 0), 0);
      setRevenue(total);
      setLoading(false);
    };
    load();
  }, []);

  const newInqCount = inquiries.filter((i) => i.status === "new").length;
  const activeClients = clients.filter((c) => c.status === "active").length;
  const activeProjects = projects.filter((p) => p.status === "active").length;

  const stats = [
    {
      icon: Users,
      label: "Active Clients",
      value: loading ? "—" : activeClients,
      sub: `${clients.length} total`,
      color: "from-violet-500 to-purple-600",
      link: "/admin/clients",
    },
    {
      icon: FolderKanban,
      label: "Active Projects",
      value: loading ? "—" : activeProjects,
      sub: `${projects.length} total`,
      color: "from-blue-500 to-indigo-600",
      link: "/admin/projects",
    },
    {
      icon: Inbox,
      label: "New Inquiries",
      value: loading ? "—" : newInqCount,
      sub: `${inquiries.length} recent`,
      color: "from-amber-500 to-orange-500",
      link: "/admin/inquiries",
    },
    {
      icon: IndianRupee,
      label: "Total Billed",
      value: loading ? "—" : fmt(revenue),
      sub: "all time",
      color: "from-emerald-500 to-teal-600",
      link: "/admin/invoices",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Link to={s.link} className="dash-stat-card group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 block">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-slate-900">{s.value}</p>
                <p className="text-sm font-medium text-slate-700">{s.label}</p>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {s.sub}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Inquiries + Active Projects */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recent Inquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="dash-card"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-display font-bold text-slate-900">Recent Inquiries</h2>
            <Link to="/admin/inquiries" className="text-xs text-purple-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-10">
              <Inbox className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No inquiries yet.</p>
              <p className="text-xs text-slate-300 mt-1">They'll appear here when someone fills the contact form.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {inquiries.map((inq) => (
                <Link
                  key={inq.id}
                  to="/admin/inquiries"
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{inq.name}</p>
                    <p className="text-xs text-slate-400 truncate">{inq.company ?? inq.email}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`status-badge ${statusColor[inq.status]}`}>
                      {inq.status.replace("_", " ")}
                    </span>
                    <Clock className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* Active Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="dash-card"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-display font-bold text-slate-900">Active Projects</h2>
            <Link to="/admin/projects" className="text-xs text-purple-600 hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-10">
              <FolderKanban className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No projects yet.</p>
              <p className="text-xs text-slate-300 mt-1">Add a project from the Projects page.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  to="/admin/projects"
                  className="block p-3 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-slate-800 truncate">{p.title}</p>
                    <span className={`status-badge ${projStatusColor[p.status]}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${p.progress}%`,
                          background: "linear-gradient(90deg, hsl(260 65% 55%), hsl(260 100% 70%))",
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 w-8 text-right">{p.progress}%</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;

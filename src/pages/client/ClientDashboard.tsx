import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderOpen, Receipt, MessageCircle, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { Project, Invoice, Message } from "@/lib/types";

const STATUS_CLS: Record<string, string> = {
  planning:  "bg-slate-100 text-slate-600",
  active:    "bg-blue-100 text-blue-700",
  review:    "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const INV_CLS: Record<string, string> = {
  pending:   "bg-amber-100 text-amber-700",
  paid:      "bg-emerald-100 text-emerald-700",
  overdue:   "bg-red-100 text-red-600",
  cancelled: "bg-slate-100 text-slate-500",
};

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const ClientDashboard = () => {
  const { profile } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [unread, setUnread] = useState(0);
  const [clientId, setClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (!profile) return;
        // Get client record linked to this user
        const { data: cl, error: clError } = await supabase.from("clients").select("id").eq("user_id", profile.id).single();

        if (clError) {
          console.error('Client fetch error:', clError);
          setLoading(false);
          return;
        }

        if (!cl) {
          console.warn('No client record found for user:', profile.id);
          setLoading(false);
          return;
        }

        setClientId(cl.id);

        const [{ data: pr, error: prError }, { data: inv, error: invError }, { count, error: msgError }] = await Promise.all([
          supabase.from("projects").select("*").eq("client_id", cl.id).order("created_at", { ascending: false }).limit(3),
          supabase.from("invoices").select("*").eq("client_id", cl.id).order("created_at", { ascending: false }).limit(3),
          supabase.from("messages").select("id", { count: "exact", head: true }).eq("client_id", cl.id).eq("is_admin", true).is("read_at", null),
        ]);

        if (prError) console.error('Projects error:', prError);
        if (invError) console.error('Invoices error:', invError);
        if (msgError) console.error('Messages error:', msgError);

        setProjects(pr ?? []);
        setInvoices(inv ?? []);
        setUnread(count ?? 0);
        setLoading(false);
      } catch (err) {
        console.error('Dashboard load error:', err);
        setLoading(false);
      }
    };
    load();
  }, [profile]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  return (
    <div className="space-y-10">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
        className="card-dreamy p-10 relative overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/5 pointer-events-none" />
        <div className="relative z-10">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{greeting()}</p>
          <h1 className="mt-3 text-4xl font-display font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">{firstName} 👋</h1>
          <p className="mt-3 text-muted-foreground text-base leading-relaxed">
            Welcome back to your KLENTEC client portal. Here's a quick overview of your current work.
          </p>
        </div>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: FolderOpen, label: "Active Projects", value: loading ? "—" : projects.filter(p => p.status === "active").length, link: "/client/projects", color: "from-blue-500 via-blue-600 to-indigo-600" },
          { icon: Receipt, label: "Pending Invoices", value: loading ? "—" : invoices.filter(i => i.status === "pending").length, link: "/client/invoices", color: "from-amber-500 via-orange-500 to-orange-600" },
          { icon: MessageCircle, label: "Unread Messages", value: loading ? "—" : unread, link: "/client/messages", color: unread > 0 ? "from-red-500 via-rose-500 to-rose-600" : "from-violet-500 via-purple-500 to-purple-600" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, ease: "easeOut" }}>
            <Link to={s.link} className="card-dreamy p-7 flex items-center gap-5 group block hover:-translate-y-1.5 transition-all duration-300 shadow-lg hover:shadow-2xl border border-white/10 hover:border-white/20">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0 shadow-md`}>
                <s.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-3xl font-display font-bold text-foreground">{s.value}</p>
                <p className="text-sm font-medium text-muted-foreground mt-1">{s.label}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Projects + Invoices */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Projects */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, ease: "easeOut" }}
          className="card-dreamy p-8 shadow-lg border border-white/10">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-lg font-display font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">My Projects</h2>
            <Link to="/client/projects" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-2 hover:gap-3">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}</div>
          ) : !clientId ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">Your account isn't linked to a client record yet.</p>
              <p className="text-xs text-muted-foreground mt-1">Contact your KLENTEC team to get set up.</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8">
              <FolderOpen className="w-10 h-10 text-muted mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No projects yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-border/40 bg-background/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-foreground truncate">{p.title}</p>
                    <span className={`status-badge ${STATUS_CLS[p.status]}`}>{p.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: "linear-gradient(90deg, hsl(260 65% 55%), hsl(260 100% 70%))" }} />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground">{p.progress}%</span>
                  </div>
                  {p.due_date && (
                    <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Due {new Date(p.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Invoices */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="card-dreamy p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-display font-bold text-foreground">Recent Invoices</h2>
            <Link to="/client/invoices" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">{[1,2].map(i => <div key={i} className="h-14 bg-muted rounded-xl animate-pulse" />)}</div>
          ) : invoices.length === 0 ? (
            <div className="text-center py-8">
              <Receipt className="w-10 h-10 text-muted mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No invoices yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-background/50">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">{inv.invoice_number}</p>
                    <p className="text-sm font-display font-bold text-foreground mt-0.5">{fmt(inv.amount)}</p>
                  </div>
                  <div className="text-right">
                    <span className={`status-badge ${INV_CLS[inv.status]}`}>{inv.status}</span>
                    {inv.due_date && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Due {new Date(inv.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* CTA to message */}
      {unread > 0 && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
          className="card-dreamy p-5 flex items-center gap-4 border-primary/20"
          style={{ boxShadow: "0 4px 24px hsl(260 65% 55% / 0.08)" }}>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              You have {unread} unread message{unread > 1 ? "s" : ""} from your KLENTEC team.
            </p>
          </div>
          <Link to="/client/messages" className="btn-dreamy text-sm whitespace-nowrap">
            View Messages
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default ClientDashboard;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, CalendarDays, CheckCircle2, Circle, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { Project, Milestone } from "@/lib/types";

const STATUS_CLS: Record<string, string> = {
  planning:  "bg-slate-100 text-slate-600",
  active:    "bg-blue-100 text-blue-700",
  review:    "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const STATUS_LABEL: Record<string, string> = {
  planning: "In Planning",
  active:   "Active",
  review:   "In Review",
  completed: "Completed",
};

const ClientProjectsPage = () => {
  const { profile } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [milestones, setMilestones] = useState<Record<string, Milestone[]>>({});
  const [clientId, setClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!profile) return;
      const { data: cl } = await supabase.from("clients").select("id").eq("user_id", profile.id).single();
      if (!cl) { setLoading(false); return; }
      setClientId(cl.id);

      const { data: pr } = await supabase.from("projects").select("*").eq("client_id", cl.id).order("created_at", { ascending: false });
      const projectList = pr ?? [];
      setProjects(projectList);

      // Load all milestones at once
      if (projectList.length > 0) {
        const ids = projectList.map(p => p.id);
        const { data: ms } = await supabase.from("milestones").select("*").in("project_id", ids).order("created_at");
        const grouped: Record<string, Milestone[]> = {};
        (ms ?? []).forEach(m => {
          if (!grouped[m.project_id]) grouped[m.project_id] = [];
          grouped[m.project_id].push(m);
        });
        setMilestones(grouped);
      }
      setLoading(false);
    };
    load();
  }, [profile]);

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-8 w-48 bg-muted rounded-xl animate-pulse" />
        {[1, 2].map(i => <div key={i} className="h-48 card-dreamy animate-pulse" />)}
      </div>
    );
  }

  if (!clientId) {
    return (
      <div className="card-dreamy p-12 text-center">
        <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-display font-bold text-foreground">Account not linked</h2>
        <p className="mt-2 text-muted-foreground text-sm max-w-sm mx-auto">
          Your portal account hasn't been linked to a project yet. Contact your KLENTEC team — we'll sort it quickly.
        </p>
        <a href="https://wa.me/919557630336" target="_blank" rel="noreferrer" className="btn-dreamy inline-flex items-center gap-2 mt-6 text-sm">
          Message on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">My Projects</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{projects.length} project{projects.length !== 1 ? "s" : ""} in total</p>
      </div>

      {projects.length === 0 ? (
        <div className="card-dreamy p-12 text-center">
          <FolderOpen className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-muted-foreground">No projects assigned yet.</p>
          <p className="text-xs text-muted-foreground mt-1">Your KLENTEC team will add your project soon.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((p, i) => {
            const ms = milestones[p.id] ?? [];
            const done = ms.filter(m => m.completed).length;
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} className="card-dreamy overflow-hidden">
                {/* Header */}
                <div className="p-6 pb-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <span className={`status-badge ${STATUS_CLS[p.status]} mb-2 inline-block`}>
                        {STATUS_LABEL[p.status]}
                      </span>
                      <h2 className="text-xl font-display font-bold text-foreground">{p.title}</h2>
                      {p.description && (
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-3xl font-display font-bold gradient-text">{p.progress}%</p>
                      <p className="text-xs text-muted-foreground">complete</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-5">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Progress</p>
                      {ms.length > 0 && (
                        <p className="text-xs text-muted-foreground">{done} of {ms.length} tasks done</p>
                      )}
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${p.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 + 0.3 }}
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, hsl(260 65% 55%), hsl(260 100% 70%))" }}
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  {(p.start_date || p.due_date) && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {p.start_date && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CalendarDays className="w-3.5 h-3.5" />
                          Started {new Date(p.start_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </div>
                      )}
                      {p.due_date && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          Due {new Date(p.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Milestones */}
                {ms.length > 0 && (
                  <div className="px-6 pb-6 border-t border-border/30 pt-5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Project Milestones</p>
                    <div className="space-y-2.5">
                      {ms.map((m) => (
                        <div key={m.id} className="flex items-center gap-3">
                          {m.completed
                            ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            : <Circle className="w-5 h-5 text-muted-foreground/40 shrink-0" />}
                          <p className={`text-sm ${m.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {m.title}
                          </p>
                          {m.due_date && !m.completed && (
                            <p className="ml-auto text-xs text-muted-foreground shrink-0">
                              {new Date(m.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClientProjectsPage;

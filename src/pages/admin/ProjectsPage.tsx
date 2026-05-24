import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderKanban, Plus, X, Check, Search, Pencil,
  Trash2, CalendarDays, ChevronDown, ChevronUp,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Project, Client, Milestone } from "@/lib/types";

const STATUS_OPTS = ["planning", "active", "review", "completed"] as const;
const STATUS_CLS: Record<string, string> = {
  planning:  "bg-slate-100 text-slate-600",
  active:    "bg-blue-100 text-blue-700",
  review:    "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const emptyForm = {
  client_id: "", title: "", description: "",
  status: "planning" as Project["status"],
  progress: 0, start_date: "", due_date: "",
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [milestones, setMilestones] = useState<Record<string, Milestone[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [newMilestone, setNewMilestone] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const [{ data: pr }, { data: cl }] = await Promise.all([
      supabase.from("projects").select("*,clients(company)").order("created_at", { ascending: false }),
      supabase.from("clients").select("id,company").order("company"),
    ]);
    setProjects(pr ?? []);
    setClients(cl ?? []);
    setLoading(false);
  };

  const loadMilestones = async (projectId: string) => {
    const { data } = await supabase.from("milestones").select("*").eq("project_id", projectId).order("created_at");
    setMilestones((p) => ({ ...p, [projectId]: data ?? [] }));
  };

  useEffect(() => { load(); }, []);

  const toggleExpand = async (id: string) => {
    const next = expanded === id ? null : id;
    setExpanded(next);
    if (next && !milestones[next]) await loadMilestones(next);
  };

  const openCreate = () => { setEditTarget(null); setForm(emptyForm); setError(""); setNewMilestone(""); setModalOpen(true); };
  const openEdit = (p: Project) => {
    setEditTarget(p);
    setForm({
      client_id: p.client_id, title: p.title, description: p.description ?? "",
      status: p.status, progress: p.progress,
      start_date: p.start_date ?? "", due_date: p.due_date ?? "",
    });
    setError(""); setNewMilestone(""); setModalOpen(true);
  };

  const save = async () => {
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.client_id) { setError("Select a client."); return; }
    setSaving(true);
    const payload = { ...form, progress: Number(form.progress) };
    if (editTarget) {
      const { error: err } = await supabase.from("projects").update(payload).eq("id", editTarget.id);
      if (err) { setError(err.message); setSaving(false); return; }
    } else {
      const { error: err } = await supabase.from("projects").insert(payload);
      if (err) { setError(err.message); setSaving(false); return; }
    }
    setSaving(false); setModalOpen(false); load();
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project and all its milestones?")) return;
    await supabase.from("projects").delete().eq("id", id);
    setProjects((p) => p.filter((pr) => pr.id !== id));
  };

  const addMilestone = async (projectId: string) => {
    if (!newMilestone.trim()) return;
    await supabase.from("milestones").insert({ project_id: projectId, title: newMilestone });
    setNewMilestone("");
    await loadMilestones(projectId);
  };

  const toggleMilestone = async (id: string, projectId: string, completed: boolean) => {
    await supabase.from("milestones").update({ completed: !completed }).eq("id", id);
    await loadMilestones(projectId);
  };

  const deleteMilestone = async (id: string, projectId: string) => {
    await supabase.from("milestones").delete().eq("id", id);
    await loadMilestones(projectId);
  };

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    return !q || p.title.toLowerCase().includes(q) || (p.clients?.company ?? "").toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Projects</h1>
          <p className="text-sm text-slate-500 mt-0.5">{projects.length} total · {projects.filter(p => p.status === "active").length} active</p>
        </div>
        <button onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))", boxShadow: "0 4px 16px hsl(260 65% 55% / 0.3)" }}>
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects or clients…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" />
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 bg-white rounded-2xl border border-slate-100 animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="dash-card text-center py-16">
          <FolderKanban className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No projects yet</p>
          <button onClick={openCreate} className="mt-5 btn-dreamy text-sm inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create First Project
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p, i) => {
            const ms = milestones[p.id] ?? [];
            const done = ms.filter((m) => m.completed).length;
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-display font-bold text-slate-900">{p.title}</p>
                        <span className={`status-badge ${STATUS_CLS[p.status]}`}>{p.status}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{p.clients?.company ?? "—"}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {p.due_date && (
                        <span className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {new Date(p.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                      )}
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-600 transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteProject(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => toggleExpand(p.id)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                        {expanded === p.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${p.progress}%`, background: "linear-gradient(90deg, hsl(260 65% 55%), hsl(260 100% 70%))" }} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 w-8 text-right">{p.progress}%</span>
                    {ms.length > 0 && (
                      <span className="text-xs text-slate-400">{done}/{ms.length} tasks</span>
                    )}
                  </div>
                </div>

                {/* Milestones panel */}
                <AnimatePresence>
                  {expanded === p.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="px-5 pb-5 border-t border-slate-100 pt-4">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Milestones</p>
                        <div className="space-y-2 mb-3">
                          {ms.length === 0 ? (
                            <p className="text-sm text-slate-400 italic">No milestones yet.</p>
                          ) : ms.map((m) => (
                            <div key={m.id} className="flex items-center gap-3 group">
                              <button onClick={() => toggleMilestone(m.id, p.id, m.completed)}
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${m.completed ? "border-emerald-500 bg-emerald-500" : "border-slate-300 hover:border-purple-400"}`}>
                                {m.completed && <Check className="w-3 h-3 text-white" />}
                              </button>
                              <p className={`text-sm flex-1 ${m.completed ? "line-through text-slate-400" : "text-slate-700"}`}>{m.title}</p>
                              <button onClick={() => deleteMilestone(m.id, p.id)}
                                className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400 transition-all">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input value={newMilestone} onChange={(e) => setNewMilestone(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addMilestone(p.id)}
                            placeholder="Add milestone…"
                            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" />
                          <button onClick={() => addMilestone(p.id)}
                            className="px-3 py-2 rounded-xl text-sm font-semibold text-white"
                            style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))" }}>
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
            <motion.div initial={{ scale: 0.95, y: 16, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-lg font-display font-bold text-slate-900">{editTarget ? "Edit Project" : "New Project"}</h2>
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {error && <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">{error}</div>}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Client *</label>
                  <select value={form.client_id} onChange={(e) => setForm(p => ({ ...p, client_id: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all">
                    <option value="">Select client…</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Project Title *</label>
                  <input value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Brand Identity + Website Redesign"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                    placeholder="Brief project scope…" rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Status</label>
                    <select value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value as Project["status"] }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all">
                      {STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Progress ({form.progress}%)</label>
                    <input type="range" min={0} max={100} value={form.progress}
                      onChange={(e) => setForm(p => ({ ...p, progress: Number(e.target.value) }))}
                      className="w-full mt-2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[["start_date", "Start Date"], ["due_date", "Due Date"]].map(([k, l]) => (
                    <div key={k}>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{l}</label>
                      <input type="date" value={(form as Record<string, string | number>)[k] as string}
                        onChange={(e) => setForm(p => ({ ...p, [k]: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 p-6 pt-0">
                <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={save} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))" }}>
                  {saving ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Saving…</> : <><Check className="w-4 h-4" /> {editTarget ? "Save" : "Create"}</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;

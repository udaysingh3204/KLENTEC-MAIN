import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Plus, X, Check, Search, Building2, Globe, Phone, Mail, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Client } from "@/lib/types";

const STATUS_OPTS = ["active", "paused", "completed"] as const;
const STATUS_CLS: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  paused: "bg-amber-100 text-amber-700",
  completed: "bg-slate-100 text-slate-500",
};

const INDUSTRIES = [
  "E-commerce", "SaaS", "Real Estate", "Healthcare", "Education",
  "Hospitality", "Retail", "Finance", "Marketing", "Other",
];

const emptyForm = {
  company: "", contact_name: "", contact_email: "", contact_phone: "",
  industry: "", website: "", status: "active" as Client["status"], notes: "",
};

const fmt = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : n > 0 ? `₹${(n / 1000).toFixed(0)}K` : "₹0";

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Client | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const { data } = await supabase.from("clients").select("*,profiles(full_name,email)").order("created_at", { ascending: false });
    setClients(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditTarget(null); setForm(emptyForm); setError(""); setModalOpen(true); };
  const openEdit = (c: Client) => {
    setEditTarget(c);
    setForm({
      company: c.company, contact_name: c.contact_name ?? "", contact_email: c.contact_email ?? "",
      contact_phone: c.contact_phone ?? "", industry: c.industry ?? "", website: c.website ?? "",
      status: c.status, notes: c.notes ?? "",
    });
    setError("");
    setModalOpen(true);
  };

  const save = async () => {
    if (!form.company.trim()) { setError("Company name is required."); return; }
    setSaving(true);
    if (editTarget) {
      const { error: err } = await supabase.from("clients").update(form).eq("id", editTarget.id);
      if (err) { setError(err.message); setSaving(false); return; }
    } else {
      const { error: err } = await supabase.from("clients").insert(form);
      if (err) { setError(err.message); setSaving(false); return; }
    }
    setSaving(false);
    setModalOpen(false);
    load();
  };

  const deleteClient = async (id: string) => {
    if (!confirm("Delete this client? This will also delete their projects and invoices.")) return;
    await supabase.from("clients").delete().eq("id", id);
    setClients((p) => p.filter((c) => c.id !== id));
  };

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.company.toLowerCase().includes(q) || (c.contact_email ?? "").toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Clients</h1>
          <p className="text-sm text-slate-500 mt-0.5">{clients.length} clients · {clients.filter(c => c.status === "active").length} active</p>
        </div>
        <button onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))", boxShadow: "0 4px 16px hsl(260 65% 55% / 0.3)" }}>
          <Plus className="w-4 h-4" /> Add Client
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients…"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="h-44 bg-white rounded-2xl border border-slate-100 animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="dash-card text-center py-16">
          <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No clients yet</p>
          <p className="text-slate-400 text-sm mt-1">Add your first client to get started.</p>
          <button onClick={openCreate} className="mt-5 btn-dreamy text-sm inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add First Client
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 100% 70%))" }}>
                    {c.company[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-display font-bold text-slate-900 text-sm">{c.company}</p>
                    {c.industry && <p className="text-xs text-slate-400">{c.industry}</p>}
                  </div>
                </div>
                <span className={`status-badge ${STATUS_CLS[c.status]}`}>{c.status}</span>
              </div>

              <div className="space-y-1.5 mb-4">
                {c.contact_email && (
                  <a href={`mailto:${c.contact_email}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-purple-600 transition-colors">
                    <Mail className="w-3.5 h-3.5 shrink-0" /> {c.contact_email}
                  </a>
                )}
                {c.contact_phone && (
                  <a href={`tel:${c.contact_phone}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-purple-600 transition-colors">
                    <Phone className="w-3.5 h-3.5 shrink-0" /> {c.contact_phone}
                  </a>
                )}
                {c.website && (
                  <a href={c.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-slate-500 hover:text-purple-600 transition-colors">
                    <Globe className="w-3.5 h-3.5 shrink-0" /> {c.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400">Total Billed</p>
                  <p className="font-display font-bold text-sm text-slate-800">{fmt(c.total_billed)}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(c)} className="p-2 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-600 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => deleteClient(c.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 100% 70%))" }}>
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-lg font-display font-bold text-slate-900">
                    {editTarget ? "Edit Client" : "Add New Client"}
                  </h2>
                </div>
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">{error}</div>
                )}
                {[
                  { key: "company", label: "Company / Brand *", placeholder: "TechNova Pvt. Ltd." },
                  { key: "contact_name", label: "Contact Name", placeholder: "Rahul Sharma" },
                  { key: "contact_email", label: "Contact Email", placeholder: "rahul@brand.com" },
                  { key: "contact_phone", label: "Contact Phone", placeholder: "+91 98765 43210" },
                  { key: "website", label: "Website", placeholder: "https://brand.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{field.label}</label>
                    <input value={(form as Record<string, string>)[field.key]}
                      onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" />
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Industry</label>
                    <select value={form.industry} onChange={(e) => setForm((p) => ({ ...p, industry: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all">
                      <option value="">Select…</option>
                      {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Status</label>
                    <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as Client["status"] }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all">
                      {STATUS_OPTS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Notes</label>
                  <textarea value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                    placeholder="Internal notes about this client…" rows={3} resize-none
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all resize-none" />
                </div>
              </div>

              <div className="flex gap-3 p-6 pt-0">
                <button onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={save} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))" }}>
                  {saving ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Saving…</> : <><Check className="w-4 h-4" /> {editTarget ? "Save Changes" : "Create Client"}</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientsPage;

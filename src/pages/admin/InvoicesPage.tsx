import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, Plus, X, Check, Search, IndianRupee, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Invoice, Client } from "@/lib/types";

const STATUS_OPTS = ["pending", "paid", "overdue", "cancelled"] as const;
const STATUS_CLS: Record<string, string> = {
  pending:   "bg-amber-100 text-amber-700",
  paid:      "bg-emerald-100 text-emerald-700",
  overdue:   "bg-red-100 text-red-600",
  cancelled: "bg-slate-100 text-slate-500",
};

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const emptyForm = {
  client_id: "", invoice_number: "", amount: "", description: "",
  status: "pending" as Invoice["status"], due_date: "",
};

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Invoice["status"] | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Invoice | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const [{ data: inv }, { data: cl }] = await Promise.all([
      supabase.from("invoices").select("*,clients(company)").order("created_at", { ascending: false }),
      supabase.from("clients").select("id,company").order("company"),
    ]);
    setInvoices(inv ?? []);
    setClients(cl ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditTarget(null);
    // Auto-generate invoice number
    const num = `KL-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, "0")}`;
    setForm({ ...emptyForm, invoice_number: num });
    setError(""); setModalOpen(true);
  };

  const openEdit = (inv: Invoice) => {
    setEditTarget(inv);
    setForm({
      client_id: inv.client_id, invoice_number: inv.invoice_number,
      amount: String(inv.amount), description: inv.description ?? "",
      status: inv.status, due_date: inv.due_date ?? "",
    });
    setError(""); setModalOpen(true);
  };

  const save = async () => {
    if (!form.client_id) { setError("Select a client."); return; }
    if (!form.invoice_number.trim()) { setError("Invoice number required."); return; }
    if (!form.amount || isNaN(Number(form.amount))) { setError("Valid amount required."); return; }
    setSaving(true);
    const payload = { ...form, amount: Number(form.amount) };
    if (editTarget) {
      const { error: err } = await supabase.from("invoices").update(payload).eq("id", editTarget.id);
      if (err) { setError(err.message); setSaving(false); return; }
    } else {
      const { error: err } = await supabase.from("invoices").insert(payload);
      if (err) { setError(err.message); setSaving(false); return; }
    }
    // Update client total_billed
    const clientInvs = await supabase.from("invoices").select("amount,status").eq("client_id", form.client_id).in("status", ["pending","paid"]);
    const total = (clientInvs.data ?? []).reduce((s, i) => s + i.amount, 0);
    await supabase.from("clients").update({ total_billed: total }).eq("id", form.client_id);

    setSaving(false); setModalOpen(false); load();
  };

  const deleteInvoice = async (id: string) => {
    if (!confirm("Delete this invoice?")) return;
    await supabase.from("invoices").delete().eq("id", id);
    setInvoices((p) => p.filter((i) => i.id !== id));
  };

  const markPaid = async (id: string) => {
    await supabase.from("invoices").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", id);
    setInvoices((p) => p.map((i) => i.id === id ? { ...i, status: "paid" } : i));
  };

  const filtered = invoices.filter((i) => {
    const q = search.toLowerCase();
    const matchSearch = !q || i.invoice_number.toLowerCase().includes(q) || (i.clients?.company ?? "").toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPaid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "pending").reduce((s, i) => s + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Invoices</h1>
          <p className="text-sm text-slate-500 mt-0.5">{invoices.length} total invoices</p>
        </div>
        <button onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
          style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))", boxShadow: "0 4px 16px hsl(260 65% 55% / 0.3)" }}>
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Collected", amount: totalPaid, cls: "from-emerald-500 to-teal-600" },
          { label: "Pending", amount: totalPending, cls: "from-amber-500 to-orange-500" },
          { label: "Overdue", amount: totalOverdue, cls: "from-red-500 to-rose-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 shadow-sm">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.cls} flex items-center justify-center`}>
              <IndianRupee className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xl font-display font-bold text-slate-900">{fmt(s.amount)}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search invoices…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[{ v: "all", l: "All" }, ...STATUS_OPTS.map(s => ({ v: s, l: s.charAt(0).toUpperCase() + s.slice(1) }))].map((s) => (
            <button key={s.v} onClick={() => setFilterStatus(s.v as typeof filterStatus)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${filterStatus === s.v ? "bg-purple-600 text-white border-purple-600" : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"}`}>
              {s.l}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-white rounded-2xl border border-slate-100 animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="dash-card text-center py-16">
          <Receipt className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No invoices yet</p>
          <button onClick={openCreate} className="mt-5 btn-dreamy text-sm inline-flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Invoice
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Invoice #", "Client", "Amount", "Status", "Due Date", "Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((inv) => (
                  <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-5 py-4 font-mono text-xs text-slate-700 font-semibold">{inv.invoice_number}</td>
                    <td className="px-5 py-4 font-medium text-slate-800">{inv.clients?.company ?? "—"}</td>
                    <td className="px-5 py-4 font-display font-bold text-slate-900">{fmt(inv.amount)}</td>
                    <td className="px-5 py-4">
                      <span className={`status-badge ${STATUS_CLS[inv.status]}`}>{inv.status}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs">
                      {inv.due_date ? new Date(inv.due_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {inv.status === "pending" && (
                          <button onClick={() => markPaid(inv.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition-colors whitespace-nowrap">
                            Mark Paid
                          </button>
                        )}
                        <button onClick={() => openEdit(inv)} className="p-1.5 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-600 transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteInvoice(inv.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
            <motion.div initial={{ scale: 0.95, y: 16, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-lg font-display font-bold text-slate-900">{editTarget ? "Edit Invoice" : "New Invoice"}</h2>
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {error && <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">{error}</div>}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Client *</label>
                    <select value={form.client_id} onChange={(e) => setForm(p => ({ ...p, client_id: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all">
                      <option value="">Select…</option>
                      {clients.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Invoice #</label>
                    <input value={form.invoice_number} onChange={(e) => setForm(p => ({ ...p, invoice_number: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Amount (₹)</label>
                    <input type="number" min={0} value={form.amount} onChange={(e) => setForm(p => ({ ...p, amount: e.target.value }))}
                      placeholder="25000"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Status</label>
                    <select value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value as Invoice["status"] }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all">
                      {STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Due Date</label>
                  <input type="date" value={form.due_date} onChange={(e) => setForm(p => ({ ...p, due_date: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">Description</label>
                  <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
                    placeholder="e.g. Brand Identity Package — Phase 1" rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all resize-none" />
                </div>
              </div>
              <div className="flex gap-3 p-6 pt-0">
                <button onClick={() => setModalOpen(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={save} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))" }}>
                  {saving ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Saving…</> : <><Check className="w-4 h-4" /> {editTarget ? "Save" : "Create Invoice"}</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvoicesPage;

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Inbox, ChevronDown, ChevronUp, Mail, Phone,
  MessageCircle, Search, Filter, Check, ArrowUpRight, Download, Save,
} from "lucide-react";
import { getInquiries, updateInquiryStatus, updateInquiryInternalNotes, type InquiryStatus } from "@/services/inquiryService";
import type { Inquiry } from "@/lib/types";

const exportToCsv = (rows: Inquiry[], filename: string) => {
  const headers = ["Name", "Email", "Company", "WhatsApp", "Services", "Budget", "Timeline", "Status", "Source", "Created"];
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [
    headers.join(","),
    ...rows.map((r) =>
      [r.name, r.email, r.company, r.whatsapp, r.services, r.budget, r.timeline, r.status, r.source, r.created_at]
        .map(escape)
        .join(",")
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const STATUSES: { value: InquiryStatus; label: string; cls: string }[] = [
  { value: "new",           label: "New",           cls: "bg-amber-100 text-amber-700 border-amber-200" },
  { value: "contacted",     label: "Contacted",     cls: "bg-blue-100 text-blue-700 border-blue-200" },
  { value: "proposal_sent", label: "Proposal Sent", cls: "bg-purple-100 text-purple-700 border-purple-200" },
  { value: "won",           label: "Won",           cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { value: "lost",          label: "Lost",          cls: "bg-slate-100 text-slate-500 border-slate-200" },
];

const statusMap = Object.fromEntries(STATUSES.map((s) => [s.value, s]));

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

interface InquiryBoardProps {
  title: string;
  description: string;
  /** Restrict the fetched set to these statuses (e.g. Leads = contacted/proposal_sent/won). Omit for all. */
  statusFilter?: InquiryStatus[];
  /** Show a one-click "Mark as Lead" action on "new" rows. */
  showConvertAction?: boolean;
  emptyLabel: string;
}

export const InquiryBoard = ({ title, description, statusFilter, showConvertAction, emptyLabel }: InquiryBoardProps) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<InquiryStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getInquiries(statusFilter ? { statuses: statusFilter } : undefined);
      setInquiries(data);
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateStatus = async (id: string, status: InquiryStatus) => {
    setUpdatingId(id);
    try {
      await updateInquiryStatus(id, status);
      if (statusFilter && !statusFilter.includes(status)) {
        // No longer belongs in this filtered view (e.g. moved to "lost" on the Leads board)
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      } else {
        setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const availableStatuses = statusFilter ? STATUSES.filter((s) => statusFilter.includes(s.value)) : STATUSES;

  const filtered = inquiries.filter((i) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      i.name.toLowerCase().includes(q) ||
      i.email.toLowerCase().includes(q) ||
      (i.company ?? "").toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || i.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500 mt-0.5">{description}</p>
        </div>
        <button
          onClick={() => exportToCsv(filtered, `${title.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.csv`)}
          disabled={filtered.length === 0}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:border-slate-300 transition-all disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or company…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {[{ value: "all" as const, label: "All" }, ...availableStatuses].map((s) => (
            <button
              key={s.value}
              onClick={() => setFilterStatus(s.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                filterStatus === s.value
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-white rounded-2xl border border-slate-100 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="dash-card text-center py-16">
          <Inbox className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">{emptyLabel}</p>
          <p className="text-slate-400 text-sm mt-1">
            {search || filterStatus !== "all" ? "Try adjusting your filters." : "They'll appear here automatically."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {filtered.map((inq) => (
              <motion.div
                key={inq.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
              >
                {/* Row */}
                <div
                  className="flex items-center gap-4 p-5 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 100% 70%))" }}>
                    {inq.name[0]?.toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-slate-900 text-sm">{inq.name}</p>
                      {inq.company && <p className="text-xs text-slate-400">· {inq.company}</p>}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{inq.email} · {inq.budget ?? "Budget n/a"}</p>
                  </div>

                  {showConvertAction && inq.status === "new" && (
                    <button
                      onClick={(e) => { e.stopPropagation(); updateStatus(inq.id, "contacted"); }}
                      disabled={updatingId === inq.id}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-50 shrink-0"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" /> Mark as Lead
                    </button>
                  )}

                  <span className={`status-badge border shrink-0 ${statusMap[inq.status].cls}`}>
                    {statusMap[inq.status].label}
                  </span>

                  <p className="text-xs text-slate-400 shrink-0 hidden sm:block">{timeAgo(inq.created_at)}</p>

                  {expanded === inq.id
                    ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {expanded === inq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-slate-100">
                        <div className="flex flex-wrap gap-2 mt-4 mb-5">
                          <a href={`mailto:${inq.email}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors">
                            <Mail className="w-3.5 h-3.5" /> Email
                          </a>
                          {inq.whatsapp && (
                            <a href={`https://wa.me/${inq.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 transition-colors">
                              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                            </a>
                          )}
                          {inq.whatsapp && (
                            <a href={`tel:${inq.whatsapp}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors">
                              <Phone className="w-3.5 h-3.5" /> Call
                            </a>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          {[
                            ["Services Needed", inq.services],
                            ["Business Stage", inq.stage],
                            ["Budget", inq.budget],
                            ["Timeline", inq.timeline],
                            ["Deadline", inq.deadline],
                            ["Source", inq.source],
                            ["Website", inq.link],
                          ].filter(([, v]) => v).map(([label, val]) => (
                            <div key={label as string}>
                              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{label}</p>
                              <p className="text-slate-700 mt-0.5">{val}</p>
                            </div>
                          ))}
                        </div>

                        {inq.about && (
                          <div className="mt-4">
                            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">About</p>
                            <p className="text-slate-700 text-sm mt-1 leading-relaxed">{inq.about}</p>
                          </div>
                        )}
                        {inq.goal && (
                          <div className="mt-3">
                            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Main Goal</p>
                            <p className="text-slate-700 text-sm mt-1 leading-relaxed">{inq.goal}</p>
                          </div>
                        )}
                        {inq.notes && (
                          <div className="mt-3">
                            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Additional Notes</p>
                            <p className="text-slate-700 text-sm mt-1 leading-relaxed">{inq.notes}</p>
                          </div>
                        )}

                        <InternalNotesEditor
                          inquiryId={inq.id}
                          initialValue={inq.internal_notes}
                          onSaved={(value) =>
                            setInquiries((prev) => prev.map((i) => (i.id === inq.id ? { ...i, internal_notes: value } : i)))
                          }
                        />

                        <div className="mt-5 pt-4 border-t border-slate-100">
                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">Update Status</p>
                          <div className="flex flex-wrap gap-2">
                            {STATUSES.map((s) => (
                              <button
                                key={s.value}
                                onClick={() => updateStatus(inq.id, s.value)}
                                disabled={updatingId === inq.id}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all disabled:opacity-50 ${
                                  inq.status === s.value
                                    ? `${s.cls} ring-1 ring-offset-1`
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                                }`}
                              >
                                {inq.status === s.value && <Check className="w-3 h-3" />}
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

const InternalNotesEditor = ({
  inquiryId,
  initialValue,
  onSaved,
}: {
  inquiryId: string;
  initialValue: string | null;
  onSaved: (value: string) => void;
}) => {
  const [value, setValue] = useState(initialValue || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const dirty = value !== (initialValue || "");

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateInquiryInternalNotes(inquiryId, value);
      onSaved(value);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (err) {
      console.error("Failed to save internal notes:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-4">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1.5">Internal Notes (admin only)</p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        rows={2}
        placeholder="Add a private follow-up note…"
        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
      />
      {dirty && (
        <button
          onClick={(e) => { e.stopPropagation(); handleSave(); }}
          disabled={saving}
          className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          <Save className="w-3 h-3" /> {saving ? "Saving…" : "Save Note"}
        </button>
      )}
      {saved && <p className="mt-1.5 text-xs text-emerald-600">Saved.</p>}
    </div>
  );
};

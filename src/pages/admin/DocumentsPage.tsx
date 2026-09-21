import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Upload, Download, Trash2, X, Search, Filter, Plus, Loader,
} from "lucide-react";
import {
  uploadDocument, getDocuments, deleteDocument, getDocumentDownloadUrl,
  type AdminDocument, type DocumentCategory,
} from "@/services/documentService";

const CATEGORIES: { value: DocumentCategory; label: string; cls: string }[] = [
  { value: "sop",      label: "SOP",      cls: "bg-blue-100 text-blue-700 border-blue-200" },
  { value: "prd",      label: "PRD",      cls: "bg-purple-100 text-purple-700 border-purple-200" },
  { value: "bill",     label: "Bill",     cls: "bg-amber-100 text-amber-700 border-amber-200" },
  { value: "contract", label: "Contract", cls: "bg-rose-100 text-rose-700 border-rose-200" },
  { value: "report",   label: "Report",   cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { value: "policy",   label: "Policy",   cls: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { value: "other",    label: "Other",    cls: "bg-slate-100 text-slate-600 border-slate-200" },
];
const categoryMap = Object.fromEntries(CATEGORIES.map((c) => [c.value, c]));

const formatSize = (bytes: number | null) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<AdminDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<DocumentCategory | "all">("all");
  const [showUpload, setShowUpload] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [setupNeeded, setSetupNeeded] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (err) {
      console.error("Failed to load documents:", err);
      setSetupNeeded(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (doc: AdminDocument) => {
    if (!window.confirm(`Delete "${doc.title}"? This can't be undone.`)) return;
    setDeletingId(doc.id);
    try {
      await deleteDocument(doc);
      setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
    } catch (err) {
      console.error("Failed to delete document:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = async (doc: AdminDocument) => {
    setDownloadingId(doc.id);
    try {
      const url = await getDocumentDownloadUrl(doc.file_path);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Failed to get download link:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const filtered = documents.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      d.title.toLowerCase().includes(q) ||
      d.description?.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q));
    const matchCategory = filterCategory === "all" || d.category === filterCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Documents</h1>
          <p className="text-sm text-slate-500 mt-0.5">SOPs, PRDs, bills, contracts, and everything else worth keeping on record.</p>
        </div>
        {!setupNeeded && (
          <button
            onClick={() => setShowUpload(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Upload Document
          </button>
        )}
      </div>

      {setupNeeded ? (
        <div className="dash-card text-center py-16">
          <FileText className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-700 font-medium">One-time setup needed</p>
          <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
            The Documents module needs its database table and storage bucket created first.
            Run <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs">supabase/migrations/001_documents.sql</code> in
            your Supabase SQL Editor, then refresh this page.
          </p>
        </div>
      ) : (
      <>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, description, or tag…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {[{ value: "all" as const, label: "All" }, ...CATEGORIES].map((c) => (
            <button
              key={c.value}
              onClick={() => setFilterCategory(c.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                filterCategory === c.value
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-white rounded-2xl border border-slate-100 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="dash-card text-center py-16">
          <FileText className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No documents found</p>
          <p className="text-slate-400 text-sm mt-1">
            {search || filterCategory !== "all" ? "Try adjusting your filters." : "Upload your first SOP, PRD, or bill to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence initial={false}>
            {filtered.map((doc) => (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="dash-card flex flex-col"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className={`status-badge border ${categoryMap[doc.category].cls}`}>
                    {categoryMap[doc.category].label}
                  </span>
                  <FileText className="w-4 h-4 text-slate-300 shrink-0" />
                </div>

                <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1">{doc.title}</h3>
                {doc.description && (
                  <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{doc.description}</p>
                )}

                {doc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {doc.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 text-[11px] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-[11px] text-slate-400 truncate">
                    {formatSize(doc.file_size)} · {new Date(doc.created_at).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleDownload(doc)}
                      disabled={downloadingId === doc.id}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
                      title="Download"
                    >
                      {downloadingId === doc.id ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDelete(doc)}
                      disabled={deletingId === doc.id}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      </>
      )}

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUploaded={(doc) => {
            setDocuments((prev) => [doc, ...prev]);
            setShowUpload(false);
          }}
        />
      )}
    </div>
  );
};

const UploadModal = ({ onClose, onUploaded }: { onClose: () => void; onUploaded: (doc: AdminDocument) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<DocumentCategory>("other");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Choose a file to upload.");
      return;
    }
    if (!title.trim()) {
      setError("Give the document a title.");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
      const doc = await uploadDocument({ title: title.trim(), category, description: description.trim(), tags, file });
      onUploaded(doc);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl border border-slate-100 max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <h2 className="text-lg font-display font-bold text-slate-900">Upload Document</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Client Onboarding SOP"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    category === c.value ? "bg-purple-600 text-white border-purple-600" : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="What is this document for?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Tags (comma separated, optional)</label>
            <input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. onboarding, hr, 2026"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">File</label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-4 py-6 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 hover:border-purple-300 hover:text-purple-600 transition-colors text-sm"
            >
              <Upload className="w-4 h-4" />
              {file ? file.name : "Choose a file"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 rounded-xl text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? (<><Loader className="w-4 h-4 animate-spin" /> Uploading…</>) : "Upload"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default DocumentsPage;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Download, FileText, Image, Film, Archive,
  FileCode, File, ExternalLink,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { Deliverable } from "@/lib/types";

/* Icon by file type */
const fileIcon = (type: string | null) => {
  if (!type) return File;
  if (type.startsWith("image/")) return Image;
  if (type.startsWith("video/")) return Film;
  if (type.includes("pdf") || type.includes("doc")) return FileText;
  if (type.includes("zip") || type.includes("tar")) return Archive;
  if (type.includes("html") || type.includes("js") || type.includes("css")) return FileCode;
  return File;
};

const fmtSize = (kb: number | null) => {
  if (!kb) return "";
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const ClientDeliverablesPage = () => {
  const { profile } = useAuth();
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [clientId, setClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!profile) return;
      const { data: cl } = await supabase.from("clients").select("id").eq("user_id", profile.id).single();
      if (!cl) { setLoading(false); return; }
      setClientId(cl.id);

      const { data } = await supabase
        .from("deliverables")
        .select("*,projects(title)")
        .eq("client_id", cl.id)
        .order("created_at", { ascending: false });
      setDeliverables(data ?? []);
      setLoading(false);
    };
    load();
  }, [profile]);

  const filtered = deliverables.filter(d =>
    !search || d.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-8 w-48 bg-muted rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-32 card-dreamy animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Deliverables</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {deliverables.length} file{deliverables.length !== 1 ? "s" : ""} shared with you
        </p>
      </div>

      {deliverables.length > 0 && (
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search files…"
          className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-border focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all text-sm"
        />
      )}

      {!clientId ? (
        <div className="card-dreamy p-12 text-center">
          <Download className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Account not linked yet. Contact your KLENTEC team.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-dreamy p-12 text-center">
          <Download className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">
            {search ? "No files match your search." : "No deliverables yet."}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {!search && "Your KLENTEC team will upload files here as work progresses."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((d, i) => {
            const Icon = fileIcon(d.file_type);
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-dreamy p-5 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: "linear-gradient(135deg, hsl(var(--purple-soft)), hsl(260 80% 94%))" }}>
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Info */}
                <p className="text-sm font-display font-bold text-foreground truncate" title={d.name}>
                  {d.name}
                </p>
                {d.projects?.title && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{d.projects.title}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {fmtDate(d.created_at)}{d.size_kb ? ` · ${fmtSize(d.size_kb)}` : ""}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <a
                    href={d.file_url}
                    download={d.name}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, hsl(260 65% 55%), hsl(260 60% 45%))" }}
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                  <a
                    href={d.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClientDeliverablesPage;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Upload, Trash2, Copy, Check, FileText, Image, Archive, Code, Link as LinkIcon, Search, Filter } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Deliverable {
  id: string;
  client_id: string;
  project_id?: string;
  file_name: string;
  file_type: string;
  file_url: string;
  created_at: string;
  client?: { company: string };
  project?: { title: string };
}

interface Client {
  id: string;
  company: string;
}

interface Project {
  id: string;
  title: string;
}

const AdminDeliverablesPage = () => {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("pdf");
  const [fileUrl, setFileUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [{ data: deliv }, { data: cl }, { data: proj }] = await Promise.all([
        supabase.from("deliverables").select("*,client:client_id(company),project:project_id(title)").order("created_at", { ascending: false }),
        supabase.from("clients").select("id,company").order("company"),
        supabase.from("projects").select("id,title").order("title"),
      ]);
      setDeliverables(deliv ?? []);
      setClients(cl ?? []);
      setProjects(proj ?? []);
    } catch (error) {
      console.error("Error loading deliverables:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !fileName || !fileUrl) {
      alert("Please fill in all required fields");
      return;
    }

    setUploading(true);
    try {
      const { data } = await supabase
        .from("deliverables")
        .insert({
          client_id: selectedClient,
          project_id: selectedProject || null,
          file_name: fileName,
          file_type: fileType,
          file_url: fileUrl,
        })
        .select("*,client:client_id(company),project:project_id(title)")
        .single();

      if (data) {
        setDeliverables([data, ...deliverables]);
        setFileName("");
        setFileUrl("");
        setFileType("pdf");
        setSelectedProject("");
      }
    } catch (error) {
      console.error("Error uploading deliverable:", error);
      alert("Failed to upload deliverable");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this deliverable?")) return;

    try {
      await supabase.from("deliverables").delete().eq("id", id);
      setDeliverables(deliverables.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Error deleting deliverable:", error);
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="w-5 h-5 text-blue-500" />;
      case "video":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "code":
        return <Code className="w-5 h-5 text-green-500" />;
      case "zip":
        return <Archive className="w-5 h-5 text-orange-500" />;
      case "link":
        return <LinkIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredDeliverables = deliverables.filter((d) => {
    const matchesSearch =
      d.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.client?.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.project?.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || d.file_type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Deliverables</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload and manage client deliverable files.</p>
      </div>

      {/* Upload Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated p-8 border border-border"
      >
        <h2 className="text-lg font-display font-bold text-foreground mb-6">Upload New Deliverable</h2>
        <form onSubmit={handleUpload} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Client *</label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/15 text-sm"
              >
                <option value="">Select client...</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Project (Optional)</label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/15 text-sm"
              >
                <option value="">Select project...</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">File Name *</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="e.g., Design System v2, Brand Guidelines..."
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/15 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">File Type *</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/15 text-sm"
              >
                <option value="pdf">PDF</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="code">Code</option>
                <option value="zip">ZIP Archive</option>
                <option value="link">External Link</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">File URL *</label>
              <input
                type="url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://example.com/file.pdf or paste Supabase Storage URL"
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/15 text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">Upload to Supabase Storage or paste a public URL</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-semibold text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload Deliverable"}
          </button>
        </form>
      </motion.div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by file name, client, or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/15 text-sm"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/15 text-sm"
        >
          <option value="all">All Types</option>
          <option value="pdf">PDF</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
          <option value="code">Code</option>
          <option value="zip">Archives</option>
          <option value="link">Links</option>
        </select>
      </div>

      {/* Deliverables Table */}
      <div className="card-elevated overflow-hidden">
        {filteredDeliverables.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No deliverables found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border/50 bg-muted/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">File</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Client / Project</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredDeliverables.map((d) => (
                  <tr key={d.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{d.file_name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      <div>{d.client?.company}</div>
                      {d.project && <div className="text-xs text-muted-foreground/70">{d.project.title}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getFileIcon(d.file_type)}
                        <span className="text-xs font-medium text-foreground capitalize">{d.file_type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(d.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleCopyLink(d.file_url)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Copy link"
                        >
                          {copied === d.file_url ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(d.id)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-destructive/60 hover:text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="text-sm text-muted-foreground text-center">
        Showing {filteredDeliverables.length} of {deliverables.length} deliverables
      </div>
    </div>
  );
};

export default AdminDeliverablesPage;

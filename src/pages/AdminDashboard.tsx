import { useState, useEffect } from "react";
import { getLeads, getLeadStats, updateLeadStatus } from "@/services/leadService";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Phone, Building2, MessageSquare, CheckCircle, Clock, X } from "lucide-react";

interface Lead {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest: string;
  message: string;
  status: string;
  created_at: string;
}

interface Stats {
  total: number;
  new: number;
  contacted: number;
  converted: number;
  closed: number;
}

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, contacted: 0, converted: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    loadData();
  }, [filter]);

  const loadData = async () => {
    try {
      setLoading(true);
      const leadsData = await getLeads({
        status: filter !== "all" ? filter : undefined,
        limit: 100,
      });
      const statsData = await getLeadStats();
      setLeads(leadsData || []);
      setStats(statsData);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await updateLeadStatus(leadId, newStatus as any);
      await loadData();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Lead Management Dashboard</h1>
          <p className="text-slate-400">Track and manage all incoming leads</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {[
            { label: "Total Leads", value: stats.total, color: "from-blue-600 to-blue-500", icon: "📊" },
            { label: "New", value: stats.new, color: "from-green-600 to-green-500", icon: "✨" },
            { label: "Contacted", value: stats.contacted, color: "from-purple-600 to-purple-500", icon: "📞" },
            { label: "Converted", value: stats.converted, color: "from-pink-600 to-pink-500", icon: "🎉" },
            { label: "Closed", value: stats.closed, color: "from-slate-600 to-slate-500", icon: "✓" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl bg-gradient-to-br ${stat.color} p-6 text-white`}
            >
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["all", "new", "contacted", "converted", "closed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === status
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Leads Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400">Loading leads...</div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center text-slate-400">No leads found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-800 transition-colors">
                      <td className="px-6 py-4 text-sm text-white">{lead.full_name}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{lead.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{lead.service_interest}</td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium bg-slate-700 text-white border-0 cursor-pointer`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{formatDate(lead.created_at)}</td>
                      <td className="px-6 py-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedLead(lead)}
                          className="border-slate-600 text-slate-300 hover:bg-slate-800"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 rounded-2xl border border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">Lead Details</h2>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Name & Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Full Name</p>
                    <p className="text-lg font-semibold text-white">{selectedLead.full_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Status</p>
                    <select
                      value={selectedLead.status}
                      onChange={(e) => {
                        handleStatusChange(selectedLead.id, e.target.value);
                        setSelectedLead({ ...selectedLead, status: e.target.value });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 text-white border border-slate-700"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-blue-500" />
                    <a href={`mailto:${selectedLead.email}`} className="text-blue-400 hover:text-blue-300">
                      {selectedLead.email}
                    </a>
                  </div>
                  {selectedLead.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-green-500" />
                      <a href={`tel:${selectedLead.phone}`} className="text-green-400 hover:text-green-300">
                        {selectedLead.phone}
                      </a>
                    </div>
                  )}
                  {selectedLead.company && (
                    <div className="flex items-center gap-3">
                      <Building2 size={18} className="text-purple-500" />
                      <span className="text-slate-300">{selectedLead.company}</span>
                    </div>
                  )}
                </div>

                {/* Service & Message */}
                <div>
                  <p className="text-sm text-slate-400 mb-2">Service Interest</p>
                  <p className="text-white font-medium">{selectedLead.service_interest}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-400 mb-2">Message</p>
                  <p className="text-slate-300 whitespace-pre-wrap">{selectedLead.message}</p>
                </div>

                {/* Meta */}
                <div className="pt-4 border-t border-slate-700 text-xs text-slate-400">
                  <p>Submitted: {formatDate(selectedLead.created_at)}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => window.open(`mailto:${selectedLead.email}`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Send Email
                  </Button>
                  <Button
                    onClick={() => window.open(`https://wa.me/${selectedLead.phone?.replace(/\D/g, "")}`)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    disabled={!selectedLead.phone}
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;

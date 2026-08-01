import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeadSource {
  source: string;
  count: number;
  percentage: number;
  color: string;
}

export const LeadSourceChart = () => {
  // Simulated lead sources - in production this would come from database
  const leadSources: LeadSource[] = [
    { source: "Homepage CTA", count: 28, percentage: 28, color: "from-blue-500 to-cyan-500" },
    { source: "Services Page", count: 24, percentage: 24, color: "from-purple-500 to-pink-500" },
    { source: "24-Hour Web Dev", count: 20, percentage: 20, color: "from-green-500 to-emerald-500" },
    { source: "FAQ Page", count: 15, percentage: 15, color: "from-orange-500 to-red-500" },
    { source: "Testimonials", count: 10, percentage: 10, color: "from-yellow-500 to-orange-500" },
    { source: "Other", count: 3, percentage: 3, color: "from-slate-500 to-slate-600" },
  ];

  const handleExportLeads = () => {
    // Export leads data as CSV
    const csv = "Source,Count,Percentage\n" +
      leadSources.map(s => `${s.source},${s.count},${s.percentage}%`).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lead-sources.csv";
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Lead Sources</h3>
          <p className="text-sm text-slate-400">Where your leads are coming from</p>
        </div>
        <Button
          onClick={handleExportLeads}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Export
        </Button>
      </div>

      {/* Lead Source List */}
      <div className="space-y-4">
        {leadSources.map((source, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center gap-4"
          >
            {/* Source name */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-white">{source.source}</p>
                <p className="text-xs font-semibold text-slate-400">
                  {source.count} ({source.percentage}%)
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${source.percentage}%` }}
                  transition={{ delay: idx * 0.1 + 0.5, duration: 0.8 }}
                  className={`h-full bg-gradient-to-r ${source.color}`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-700 flex gap-6">
        <div>
          <p className="text-xs text-slate-500 mb-1">Total Leads</p>
          <p className="text-2xl font-bold text-white">100</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Top Source</p>
          <p className="text-2xl font-bold text-blue-400">Homepage (28%)</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Conversion Avg</p>
          <p className="text-2xl font-bold text-purple-400">24%</p>
        </div>
      </div>
    </motion.div>
  );
};

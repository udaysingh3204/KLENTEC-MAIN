import { motion } from "framer-motion";
import { TrendingUp, Users, Mail, Star, Eye, Zap } from "lucide-react";

interface AnalyticsOverviewProps {
  totalLeads: number;
  totalReviews: number;
  avgRating: number;
}

export const AnalyticsOverview = ({
  totalLeads,
  totalReviews,
  avgRating,
}: AnalyticsOverviewProps) => {
  // Calculate estimated metrics based on leads and reviews
  const conversionRate = totalLeads > 0 ? ((totalReviews / totalLeads) * 100).toFixed(1) : "0";
  const avgLeadValue = 15000; // ₹15,000 average service value
  const estimatedRevenue = totalLeads * avgLeadValue;
  const leadQuality = avgRating > 4 ? "Excellent" : avgRating > 3 ? "Good" : "Fair";

  const metrics = [
    {
      label: "Total Leads",
      value: totalLeads,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      trend: "+12%",
      description: "This month",
    },
    {
      label: "Client Reviews",
      value: totalReviews,
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      trend: "+8%",
      description: "This month",
    },
    {
      label: "Avg Rating",
      value: Number(avgRating).toFixed(1),
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      trend: "5⭐",
      description: "Client satisfaction",
      suffix: "/5",
    },
    {
      label: "Conversion Rate",
      value: conversionRate,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      trend: "Lead → Review",
      description: "Review conversion",
      suffix: "%",
    },
    {
      label: "Est. Revenue",
      value: `₹${(estimatedRevenue / 100000).toFixed(1)}L`,
      icon: Mail,
      color: "from-indigo-500 to-purple-500",
      trend: "+15%",
      description: "Based on avg service value",
    },
    {
      label: "Lead Quality",
      value: leadQuality,
      icon: Eye,
      color: "from-rose-500 to-pink-500",
      trend: Number(avgRating).toFixed(1),
      description: "Rating-based assessment",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Analytics Overview</h2>
        <p className="text-slate-400">Real-time performance metrics and insights</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all group"
            >
              {/* Icon & Trend */}
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${metric.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded">
                  {metric.trend}
                </div>
              </div>

              {/* Label & Value */}
              <p className="text-sm font-medium text-slate-400 mb-2">{metric.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-white">{metric.value}</p>
                {metric.suffix && <p className="text-sm text-slate-500">{metric.suffix}</p>}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 mt-3">{metric.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-2xl"
      >
        <h3 className="text-white font-semibold mb-4">Key Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0" />
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Lead Quality:</span> {leadQuality} performance based on {avgRating > 3.5 ? "strong" : "moderate"} customer satisfaction ratings
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-pink-400 rounded-full mt-1.5 flex-shrink-0" />
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Conversion Rate:</span> {conversionRate}% of leads become satisfied clients (review providers)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-white">Revenue Potential:</span> Estimated ₹{(estimatedRevenue / 100000).toFixed(1)}L from {totalLeads} leads at ₹{avgLeadValue.toLocaleString("en-IN")} avg value
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, FileText, MessageSquare, Star, BarChart3, Settings, ChevronRight } from "lucide-react";
import { adminSignOut, getCurrentAdmin } from "@/services/adminAuthService";
import { getLeads } from "@/services/leadService";
import { getReviews, getReviewStats } from "@/services/reviewService";
import { Button } from "@/components/ui/button";
import { AnalyticsOverview } from "@/components/admin/AnalyticsOverview";
import { LeadSourceChart } from "@/components/admin/LeadSourceChart";

interface AdminStats {
  totalLeads: number;
  totalReviews: number;
  avgRating: number;
  blogPosts: number;
  caseStudies: number;
}

const AdminDashboardHome = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<any>(null);
  const [stats, setStats] = useState<AdminStats>({
    totalLeads: 0,
    totalReviews: 0,
    avgRating: 0,
    blogPosts: 0,
    caseStudies: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentAdmin();
      if (!user) {
        navigate("/admin/login");
        return;
      }
      setAdmin(user);
      await loadStats();
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const loadStats = async () => {
    try {
      const leads = await getLeads({ limit: 1000 });
      const reviews = await getReviews(1000);
      const reviewStats = await getReviewStats();

      setStats({
        totalLeads: leads?.length || 0,
        totalReviews: reviews?.length || 0,
        avgRating: (reviewStats?.avgRating as unknown as number) || 0,
        blogPosts: 0, // Will be implemented in Phase 2
        caseStudies: 0, // Will be implemented in Phase 3
      });
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await adminSignOut();
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  const menuItems = [
    {
      label: "Leads",
      icon: MessageSquare,
      path: "/admin/leads",
      count: stats.totalLeads,
      color: "from-blue-600 to-cyan-600",
      description: "Manage incoming leads",
    },
    {
      label: "Reviews",
      icon: Star,
      path: "/admin/reviews",
      count: stats.totalReviews,
      color: "from-yellow-600 to-orange-600",
      description: "Manage client reviews",
    },
    {
      label: "Blog",
      icon: FileText,
      path: "/admin/blog",
      count: stats.blogPosts,
      color: "from-purple-600 to-pink-600",
      description: "Manage blog posts (Coming Soon)",
      disabled: true,
    },
    {
      label: "Case Studies",
      icon: BarChart3,
      path: "/admin/case-studies",
      count: stats.caseStudies,
      color: "from-green-600 to-emerald-600",
      description: "Manage case studies (Coming Soon)",
      disabled: true,
    },
    {
      label: "Analytics",
      icon: BarChart3,
      path: "/admin/analytics",
      count: 0,
      color: "from-indigo-600 to-purple-600",
      description: "View analytics (Coming Soon)",
      disabled: true,
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
      count: 0,
      color: "from-slate-600 to-slate-700",
      description: "Configure admin settings",
      disabled: true,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 text-sm">Welcome back, {admin?.email}</p>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Enhanced Analytics */}
        <AnalyticsOverview
          totalLeads={stats.totalLeads}
          totalReviews={stats.totalReviews}
          avgRating={stats.avgRating}
        />

        {/* Lead Source Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <LeadSourceChart />
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-6 text-white"
          >
            <p className="text-sm font-medium text-white/80 mb-2">Total Leads</p>
            <p className="text-4xl font-bold">{stats.totalLeads}</p>
            <p className="text-xs text-white/60 mt-2">Active inquiries</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl p-6 text-white"
          >
            <p className="text-sm font-medium text-white/80 mb-2">Total Reviews</p>
            <p className="text-4xl font-bold">{stats.totalReviews}</p>
            <p className="text-xs text-white/60 mt-2">Average: {Number(stats.avgRating).toFixed(1)}/5</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white"
          >
            <p className="text-sm font-medium text-white/80 mb-2">Blog Posts</p>
            <p className="text-4xl font-bold">{stats.blogPosts}</p>
            <p className="text-xs text-white/60 mt-2">Coming in Phase 2</p>
          </motion.div>
        </div>

        {/* Menu Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => !item.disabled && navigate(item.path)}
                  className={`rounded-xl border transition-all cursor-pointer group ${
                    item.disabled
                      ? "bg-slate-900/30 border-slate-800 opacity-50 cursor-not-allowed"
                      : "bg-slate-900 border-slate-800 hover:border-slate-600 hover:shadow-lg hover:shadow-purple-500/10"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`bg-gradient-to-br ${item.color} p-3 rounded-lg`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      {!item.disabled && (
                        <ChevronRight
                          size={20}
                          className="text-slate-500 group-hover:text-purple-500 transition-colors"
                        />
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{item.label}</h3>
                    <p className="text-sm text-slate-400 mb-4">{item.description}</p>

                    {!item.disabled && (
                      <div className="text-2xl font-bold text-slate-300">{item.count}</div>
                    )}
                    {item.disabled && (
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        Coming Soon
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-800/30 rounded-xl"
        >
          <p className="text-slate-300">
            <span className="font-semibold">📊 Dashboard Features:</span> Manage leads, reviews, blog posts, case studies, and analytics. All features are organized in one place for easy access.
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default AdminDashboardHome;

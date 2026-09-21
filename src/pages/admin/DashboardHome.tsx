import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Inbox, Users, Star, FileText, ArrowRight } from "lucide-react";
import { getInquiryStats } from "@/services/inquiryService";
import { getReviewStats } from "@/services/reviewService";
import { getDocuments } from "@/services/documentService";

interface Stats {
  totalInquiries: number;
  newInquiries: number;
  totalLeads: number;
  totalReviews: number;
  avgRating: number;
  totalDocuments: number;
}

const DashboardHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    totalInquiries: 0,
    newInquiries: 0,
    totalLeads: 0,
    totalReviews: 0,
    avgRating: 0,
    totalDocuments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [documentsReady, setDocumentsReady] = useState(true);

  useEffect(() => {
    const load = async () => {
      // Each stat is fetched independently so one failure (e.g. the
      // documents table not existing yet, pre-migration) never blocks the rest.
      const [inquiryStats, reviewStats, documents] = await Promise.all([
        getInquiryStats().catch((err) => { console.error("Failed to load inquiry stats:", err); return null; }),
        getReviewStats().catch((err) => { console.error("Failed to load review stats:", err); return null; }),
        getDocuments().catch((err) => { console.error("Failed to load documents:", err); setDocumentsReady(false); return null; }),
      ]);

      setStats({
        totalInquiries: inquiryStats?.total ?? 0,
        newInquiries: inquiryStats?.new ?? 0,
        totalLeads: inquiryStats?.leads ?? 0,
        totalReviews: reviewStats?.totalReviews ?? 0,
        avgRating: Number(reviewStats?.avgRating) || 0,
        totalDocuments: documents?.length ?? 0,
      });
      setLoading(false);
    };
    load();
  }, []);

  const cards = [
    {
      label: "Inquiries",
      icon: Inbox,
      count: stats.totalInquiries,
      sub: `${stats.newInquiries} new`,
      path: "/admin/inquiries",
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Leads",
      icon: Users,
      count: stats.totalLeads,
      sub: "Contacted or further",
      path: "/admin/leads",
      color: "text-purple-600 bg-purple-50",
    },
    {
      label: "Reviews",
      icon: Star,
      count: stats.totalReviews,
      sub: stats.totalReviews > 0 ? `${stats.avgRating.toFixed(1)} avg rating` : "No reviews yet",
      path: "/admin/reviews",
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Documents",
      icon: FileText,
      count: stats.totalDocuments,
      sub: documentsReady ? "SOPs, PRDs, bills & more" : "Run the setup SQL first",
      path: "/admin/documents",
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-0.5">Overview of inquiries, leads, reviews, and documents.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.label}
              onClick={() => navigate(card.path)}
              className="dash-card text-left hover:border-slate-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
              <p className="text-3xl font-display font-bold text-slate-900">
                {loading ? "—" : card.count}
              </p>
              <p className="text-sm text-slate-500 mt-1">{card.label}</p>
              <p className="text-xs text-slate-400 mt-2">{card.sub}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHome;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Shield, Award, TrendingUp } from "lucide-react";
import { getReviewStats } from "@/services/reviewService";

const SocialProofBanner = () => {
  const [reviewStats, setReviewStats] = useState<{ totalReviews: number; avgRating: number | string }>({
    totalReviews: 0,
    avgRating: 0,
  });

  useEffect(() => {
    getReviewStats()
      .then((stats) => setReviewStats({ totalReviews: stats.totalReviews, avgRating: stats.avgRating }))
      .catch(() => {});
  }, []);

  const badges = [
    {
      icon: Star,
      label: reviewStats.totalReviews > 0 ? `${reviewStats.avgRating}/5 Rating` : "Client Reviews",
      value:
        reviewStats.totalReviews > 0
          ? `${reviewStats.totalReviews} Review${reviewStats.totalReviews === 1 ? "" : "s"}`
          : "Read what clients say",
    },
    { icon: TrendingUp, label: "4.2x Avg ROAS", value: "For our clients" },
    { icon: Award, label: "150+ Clients", value: "Successfully served" },
    { icon: Shield, label: "10+ Years", value: "Industry expertise" },
  ];

  return (
    <section className="py-12 sm:py-16 border-t border-border/30">
      <div className="container mx-auto px-6">
        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="card-dreamy flex items-center gap-3 p-4"
              >
                <div className="icon-dreamy shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{badge.label}</div>
                  <div className="font-semibold text-foreground">{badge.value}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 divider-soft">
          <p className="text-center text-muted-foreground text-sm">
            <span className="text-foreground font-semibold">Join our growing community</span> of
            companies that have transformed their digital presence. Let's build something
            remarkable together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProofBanner;

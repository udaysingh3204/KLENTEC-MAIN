import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getReviews, getReviewStats } from "@/services/reviewService";
import { Button } from "@/components/ui/button";

interface Review {
  id?: string;
  name: string;
  email: string;
  rating: number;
  review_text: string;
  created_at?: string;
}

export const TestimonialsPreview = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ totalReviews: 0, avgRating: 0, ratingDistribution: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const reviewsData = await getReviews(6); // Get top 6 reviews
        const statsData = await getReviewStats();
        setReviews(reviewsData);
        setStats(statsData);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return null;
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
              ⭐ Loved by 150+ Brands
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real feedback from companies that transformed their digital presence with us
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 flex flex-col md:flex-row items-center justify-center gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-1">{stats.totalReviews}+</div>
            <div className="text-slate-400">Total Reviews</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-slate-700"></div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="text-4xl font-bold text-yellow-400">
                {Number(stats.avgRating).toFixed(1)}
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.round(Number(stats.avgRating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-600"
                    }
                  />
                ))}
              </div>
            </div>
            <div className="text-slate-400">Average Rating</div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/50 transition-all overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-600"
                      }
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-sm mb-4 line-clamp-3 italic">
                  "{review.review_text}"
                </p>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-700/50">
                  <p className="font-semibold text-white text-sm">{review.name}</p>
                  <p className="text-slate-500 text-xs">{review.email}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-slate-400 mb-6">
            Ready to join hundreds of satisfied clients?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/testimonials">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-2 group">
                View All Testimonials
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="border border-slate-600 text-slate-300 hover:border-purple-500 hover:text-purple-400 font-semibold px-8 py-3 rounded-lg transition-all">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

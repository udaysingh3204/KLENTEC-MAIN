import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { getReviews, getReviewStats, Review } from "@/services/reviewService";

export const ReviewsDisplay = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ totalReviews: 0, avgRating: 0, ratingDistribution: {} });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getReviews(20);
        setReviews(data);
        const reviewStats = await getReviewStats();
        setStats(reviewStats);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();

    // Auto-rotate reviews every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(reviews.length, 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  if (loading) {
    return <div className="text-center text-muted-foreground">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return <div className="text-center text-muted-foreground">No reviews yet. Be the first!</div>;
  }

  const currentReview = reviews[currentIndex];

  return (
    <div className="space-y-12">
      {/* Stats Bar */}
      <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-8 px-6 card-dreamy">
        <div className="text-center">
          <div className="text-4xl font-display font-bold text-foreground">{stats.totalReviews}</div>
          <div className="text-muted-foreground text-sm">Total Reviews</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="text-3xl font-display font-bold text-amber-500">{stats.avgRating}</div>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.round(stats.avgRating as unknown as number) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}
                />
              ))}
            </div>
          </div>
          <div className="text-muted-foreground text-sm">Average Rating</div>
        </div>
      </div>

      {/* Featured Review Carousel */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="card-dreamy p-8"
      >
        {/* Rating Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className={i < currentReview.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-lg text-foreground/90 mb-6 italic">"{currentReview.review_text}"</p>

        {/* Author */}
        <div>
          <p className="font-semibold text-foreground">{currentReview.name}</p>
          <p className="text-muted-foreground text-sm">{currentReview.email}</p>
        </div>

        {/* Date */}
        <p className="text-xs text-muted-foreground/70 mt-4">
          {new Date(currentReview.created_at || "").toLocaleDateString()}
        </p>
      </motion.div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30 w-2"
            }`}
          />
        ))}
      </div>

      {/* Reviews Grid */}
      <div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-8">All Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-dreamy p-6 hover:border-primary/40 transition-all"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}
                  />
                ))}
              </div>
              <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{review.review_text}</p>
              <p className="font-medium text-foreground text-sm">{review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

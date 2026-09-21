import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Star } from "lucide-react";
import { getReviews, deleteReview, Review } from "@/services/reviewService";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviews(100);
      setReviews(data);
    } catch (err) {
      setError("Failed to load reviews");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        setDeleteLoading(reviewId);
        await deleteReview(reviewId);
        setReviews(reviews.filter((r) => r.id !== reviewId));
      } catch (err) {
        setError("Failed to delete review");
        console.error(err);
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-900">Reviews</h1>
          <p className="text-sm text-slate-500 mt-0.5">{reviews.length} total</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-white rounded-2xl border border-slate-100 animate-pulse" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="dash-card text-center py-16">
          <Star className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No reviews yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="dash-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}
                        />
                      ))}
                    </div>
                    <p className="font-semibold text-slate-900 mb-1">{review.name}</p>
                    <p className="text-sm text-slate-500 mb-3">{review.email}</p>
                    <p className="text-slate-700">{review.review_text}</p>
                    <p className="text-xs text-slate-400 mt-3">
                      {new Date(review.created_at || "").toLocaleDateString()} at{" "}
                      {new Date(review.created_at || "").toLocaleTimeString()}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(review.id || "")}
                    disabled={deleteLoading === review.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors disabled:opacity-50 shrink-0"
                  >
                    <Trash2 size={14} />
                    {deleteLoading === review.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getReviews, deleteReview, Review } from "@/services/reviewService";
import { Button } from "@/components/ui/button";
import { Trash2, LogOut, Star } from "lucide-react";
import { motion } from "framer-motion";

const ADMIN_TOKEN = "klentec_admin_2024_secret";

const AdminReviews = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  // Check if already authenticated
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken === ADMIN_TOKEN) {
      setAuthenticated(true);
      loadReviews();
    } else {
      setLoading(false);
    }
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token === ADMIN_TOKEN) {
      localStorage.setItem("adminToken", token);
      setAuthenticated(true);
      setToken("");
      loadReviews();
    } else {
      setError("Invalid admin token");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAuthenticated(false);
    navigate("/");
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

  // Login Page
  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 rounded-2xl border border-slate-800 p-8 max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400 mb-8">Reviews Management</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg"
            >
              Login
            </Button>
          </form>
        </motion.div>
      </main>
    );
  }

  // Reviews Management Page
  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Reviews Management</h1>
            <p className="text-slate-400">Total: {reviews.length} reviews</p>
          </div>
          <Button
            onClick={handleLogout}
            className="bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center text-slate-400">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-slate-400">No reviews yet</div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Rating */}
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-600"
                          }
                        />
                      ))}
                    </div>

                    {/* Name & Email */}
                    <p className="font-semibold text-white mb-1">{review.name}</p>
                    <p className="text-sm text-slate-400 mb-3">{review.email}</p>

                    {/* Review Text */}
                    <p className="text-slate-300 mb-3">{review.review_text}</p>

                    {/* Date */}
                    <p className="text-xs text-slate-500">
                      {new Date(review.created_at || "").toLocaleDateString()} at{" "}
                      {new Date(review.created_at || "").toLocaleTimeString()}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <Button
                    onClick={() => handleDelete(review.id || "")}
                    disabled={deleteLoading === review.id}
                    className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 whitespace-nowrap"
                  >
                    <Trash2 size={18} />
                    {deleteLoading === review.id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminReviews;

import { useState } from "react";
import { Star, Loader } from "lucide-react";
import { submitReview } from "@/services/reviewService";
import { Button } from "@/components/ui/button";

export const ReviewForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || rating === 0 || !review) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await submitReview({
        name,
        email,
        rating,
        review_text: review,
      });

      setSuccess(true);
      setName("");
      setEmail("");
      setRating(0);
      setReview("");

      if (onSuccess) onSuccess();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to submit review. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Rating Stars */}
      <div>
        <label className="block text-sm font-semibold text-white mb-3">
          Rating
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRating(r)}
              className="transition-all"
            >
              <Star
                size={32}
                className={`${
                  r <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-600"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <textarea
        placeholder="Share your experience..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={5}
        className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
      />

      {/* Error Message */}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Success Message */}
      {success && (
        <p className="text-green-400 text-sm">
          ✅ Thank you! Your review has been posted.
        </p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </Button>
    </form>
  );
};

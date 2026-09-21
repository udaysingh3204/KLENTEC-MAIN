import { useState } from "react";
import { Star, Loader } from "lucide-react";
import { submitReview } from "@/services/reviewService";
import { Button } from "@/components/ui/button";
import { HoneypotField } from "@/components/HoneypotField";
import { useSpamGuard } from "@/hooks/useSpamGuard";

export const ReviewForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const { isLikelyBot } = useSpamGuard();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const inputClasses =
    "px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || rating === 0 || !review) {
      setError("Please fill in all fields");
      return;
    }

    if (isLikelyBot(honeypot)) {
      // Silently pretend success — never tip off a bot that it was caught.
      setSuccess(true);
      setName("");
      setEmail("");
      setRating(0);
      setReview("");
      setTimeout(() => setSuccess(false), 3000);
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
      <HoneypotField value={honeypot} onChange={setHoneypot} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          maxLength={100}
          className={inputClasses}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
        />
      </div>

      {/* Rating Stars */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">
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
                className={r <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}
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
        minLength={10}
        maxLength={2000}
        className={`w-full resize-none ${inputClasses}`}
      />

      {error && <p className="text-destructive text-sm">{error}</p>}

      {success && (
        <p className="text-emerald-500 text-sm">
          Thank you! Your review has been posted.
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="btn-primary-gradient w-full flex items-center justify-center gap-2"
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

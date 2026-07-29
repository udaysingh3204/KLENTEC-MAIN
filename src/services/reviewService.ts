import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface Review {
  id?: string;
  name: string;
  email: string;
  rating: number;
  review_text: string;
  created_at?: string;
}

/**
 * Submit a new review - auto-approved
 */
export const submitReview = async (review: Review) => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          name: review.name,
          email: review.email,
          rating: review.rating,
          review_text: review.review_text,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    console.log("Review submitted:", data?.[0]?.id);
    return { success: true, reviewId: data?.[0]?.id };
  } catch (err) {
    console.error("Review submission error:", err);
    throw err;
  }
};

/**
 * Get all approved reviews (public)
 */
export const getReviews = async (limit: number = 50) => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
    return [];
  }
};

/**
 * Get reviews by rating
 */
export const getReviewsByRating = async (rating: number) => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("rating", rating)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error("Failed to fetch reviews by rating:", err);
    return [];
  }
};

/**
 * Get review statistics
 */
export const getReviewStats = async () => {
  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("rating, id");

    if (error) throw error;

    const reviews = data || [];
    const totalReviews = reviews.length;
    const avgRating =
      totalReviews > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
        : 0;

    const ratingDistribution = {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    };

    return { totalReviews, avgRating, ratingDistribution };
  } catch (err) {
    console.error("Failed to get review stats:", err);
    return { totalReviews: 0, avgRating: 0, ratingDistribution: {} };
  }
};

/**
 * Delete review (admin only)
 */
export const deleteReview = async (reviewId: string) => {
  try {
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Failed to delete review:", err);
    throw err;
  }
};

/**
 * Subscribe to real-time review updates
 */
export const subscribeToReviews = (callback: (review: Review) => void) => {
  const subscription = supabase
    .from("reviews")
    .on("*", (payload) => {
      if (payload.eventType === "INSERT") {
        callback(payload.new as Review);
      }
    })
    .subscribe();

  return subscription;
};

"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquare, User, Calendar, Send } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const ReviewItem = ({ review }) => (
  <div className="bg-cream/40 rounded-2xl p-6 border border-border/30 mb-4 transition-all hover:bg-white hover:shadow-lg hover:scale-[1.02]">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
          {review.userName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>{review.userName}</h4>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < review.rating ? "text-secondary fill-secondary" : "text-border fill-transparent"}
              />
            ))}
          </div>
        </div>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-text/40 font-medium">
        {review.date}
      </span>
    </div>
    <p className="text-sm text-text/70 leading-relaxed italic">
      &ldquo;{review.comment}&rdquo;
    </p>
  </div>
);

const ReviewForm = ({ onReviewSubmit }) => {
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !comment) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newReview = {
        id: Date.now(),
        userName,
        rating,
        comment,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      
      onReviewSubmit(newReview);
      setUserName("");
      setComment("");
      setRating(5);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="bg-cream border border-border/50 rounded-2xl p-6 lg:p-8">
      <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
        <MessageSquare size={20} className="text-primary" />
        Leave a Review
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-text/60 font-bold mb-2"> Your Rating </label>
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <button
                  type="button"
                  key={ratingValue}
                  className="transition-all transform hover:scale-110"
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={24}
                    className={`${
                      ratingValue <= (hover || rating) ? "text-secondary fill-secondary" : "text-border fill-transparent"
                    } transition-colors duration-200`}
                  />
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-text/60 font-bold mb-2"> Your Name </label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-white border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="e.g. Priya Sharma"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-text/60 font-bold mb-2"> Your Thoughts </label>
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full bg-white border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              placeholder="Tell us about the fit, fabric, and overall experience..."
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-primary w-full justify-center group ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Submit Review
              <Send size={16} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default function ReviewSection({ productId, initialRating, initialReviews }) {
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Load from localStorage on mount
    const savedReviews = localStorage.getItem(`reviews_${productId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      // Mock initial reviews if any
      const mockReviews = [
        {
          id: 1,
          userName: "Meera K.",
          rating: 5,
          comment: "The stitching is absolute perfection. Fits like a dream and the fabric quality is top-notch!",
          date: "May 12, 2024",
        },
        {
          id: 2,
          userName: "Ananya S.",
          rating: 4,
          comment: "Beautiful design. The color is slightly more earthy than in the pictures, but I love it even more.",
          date: "April 20, 2024",
        }
      ];
      setReviews(mockReviews);
    }
  }, [productId]);

  const handleReviewSubmit = (newReview) => {
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : initialRating;

  return (
    <section className="py-20 bg-white" id="customer-reviews">
      <div className="container-boutique">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Summary & Stats */}
          <div className="w-full lg:w-1/3">
            <AnimatedSection>
              <h2 className="text-3xl font-black mb-6" style={{ fontFamily: "var(--font-heading)" }}>Customer Reviews</h2>
              <div className="flex items-center gap-4 mb-8">
                <div className="text-6xl font-black text-dark" style={{ fontFamily: "var(--font-heading)" }}>{averageRating}</div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(averageRating) ? "text-secondary fill-secondary" : "text-border fill-transparent"}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-text/60 font-bold uppercase tracking-widest">{reviews.length} Genuine Reviews</p>
                </div>
              </div>

              {/* Add form here */}
              <ReviewForm onReviewSubmit={handleReviewSubmit} />
            </AnimatedSection>
          </div>

          {/* Reviews List */}
          <div className="w-full lg:w-2/3">
            <AnimatedSection delay={200}>
              <div className="flex items-center justify-between mb-8 border-b border-border/40 pb-4">
                <h3 className="text-lg font-bold tracking-tight text-text">Latest Feedback</h3>
              </div>
              
              <div className="space-y-2">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                  ))
                ) : (
                  <div className="text-center py-12 bg-cream/30 rounded-2xl border border-dashed border-border">
                    <p className="text-text/50 italic">No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star, Quote, Loader2 } from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" });
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  return (
    <>
      <section className="bg-secondary py-8 lg:py-12" id="reviews-hero">
        <div className="container-boutique text-center">
          <AnimatedSection>
            <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
              Client Reviews
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold mt-3 mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
            >
              Love from Our Clients
            </h1>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Read what our wonderful clients have to say about their experience
              with Sathyas Boutique and our premium fashion collections.
            </p>

            {/* Statistics Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-12 max-w-4xl mx-auto">
              <div className="bg-white px-4 py-6 md:py-8 rounded-2xl flex flex-col items-center justify-center border border-border/50 shadow-sm transition-transform duration-300 hover:scale-105">
                <span className="block text-4xl md:text-5xl font-bold text-primary mb-2" style={{ fontFamily: "var(--font-heading)" }}>500+</span>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold text-center">Trusted Customers</span>
              </div>
              <div className="bg-white px-4 py-6 md:py-8 rounded-2xl flex flex-col items-center justify-center border border-border/50 shadow-sm transition-transform duration-300 hover:scale-105">
                <span className="block text-4xl md:text-5xl font-bold text-primary mb-2" style={{ fontFamily: "var(--font-heading)" }}>1000+</span>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold text-center">Orders Delivered</span>
              </div>
              <div className="bg-white px-4 py-6 md:py-8 rounded-2xl flex flex-col items-center justify-center border border-border/50 shadow-sm transition-transform duration-300 hover:scale-105">
                <span className="block text-4xl md:text-5xl font-bold text-primary mb-2" style={{ fontFamily: "var(--font-heading)" }}>100%</span>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-text-muted font-bold text-center">Quality Assured</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8 lg:py-12 bg-background border-t border-white/10" id="reviews-grid">
        <div className="container-boutique">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary mb-4" size={40} />
              <p className="text-text-light italic">Reading the love stories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {reviews.map((review, index) => (
                <AnimatedSection key={review.id} delay={(index % 3) * 100}>
                  <div className="group relative bg-transparent p-6 md:p-8 rounded-2xl border-2 border-border/40 transition-all duration-300 hover:border-primary/50 hover:scale-105 hover:shadow-lg h-full flex flex-col">
                    {/* Decorative Quote Icon */}
                    <div className="absolute top-6 right-6 text-primary/5 group-hover:text-primary/10 transition-colors">
                      <Quote size={50} fill="currentColor" />
                    </div>
                    
                    {/* Star Rating Hidden per User Request */}
                    
                    {/* Feedback Text */}
                    {review.text && review.text !== "Photo Review" && !review.text.startsWith('http') && (
                      <p className="text-sm md:text-base text-text leading-relaxed mb-6 font-medium italic relative z-10">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    )}

                    {/* Review Photo / Screenshot */}
                    {((review.avatar && review.avatar.startsWith('http')) || (review.text && review.text.startsWith('http'))) && (
                      <div className="relative mb-4 rounded-xl overflow-hidden border border-border/20 shadow-md group-hover:shadow-lg transition-all duration-500 flex-grow">
                        <img 
                          src={review.avatar && review.avatar.startsWith('http') ? review.avatar : review.text} 
                          alt="Customer Review" 
                          className="w-full h-full object-cover max-h-[600px] bg-white transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

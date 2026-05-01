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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {reviews.map((review, index) => (
                <AnimatedSection key={review.id} delay={(index % 3) * 100}>
                  <div className="group bg-white rounded-[2rem] overflow-hidden border border-border/40 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full shadow-sm">
                    {/* Review Photo / Screenshot - Standardized Aspect Ratio */}
                    {((review.avatar && review.avatar.startsWith('http')) || (review.text && review.text.startsWith('http'))) && (
                      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
                        <img 
                          src={review.avatar && review.avatar.startsWith('http') ? review.avatar : review.text} 
                          alt="Customer Review" 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        
                        {/* Decorative Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                           <div className="flex items-center gap-1.5 text-white/90">
                              <Star size={16} fill="currentColor" className="text-yellow-400" />
                              <span className="text-sm font-bold uppercase tracking-widest">Happy Client</span>
                           </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Optional Feedback Text - Compact display if exists */}
                    {review.text && review.text !== "Photo Review" && !review.text.startsWith('http') && (
                      <div className="p-6 md:p-8 flex-grow">
                         <Quote size={24} className="text-primary/20 mb-4" fill="currentColor" />
                         <p className="text-sm md:text-base text-text leading-relaxed font-medium italic">
                           &ldquo;{review.text}&rdquo;
                         </p>
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

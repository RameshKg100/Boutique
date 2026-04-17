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
      <section className="bg-cream py-16 lg:py-20" id="reviews-hero">
        <div className="container-boutique text-center">
          <AnimatedSection>
            <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
              Client Reviews
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold mt-3 mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              Love from Our Clients
            </h1>
            <p className="text-text-light max-w-xl mx-auto">
              Read what our wonderful clients have to say about their experience
              with Sashaa Boutiques and our premium fashion collections.
            </p>

            {/* Statistics Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-8 pt-6 border-t border-border/60 max-w-4xl mx-auto">
              <div className="text-center group p-4 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 border border-transparent hover:border-border/30">
                <span className="block text-4xl md:text-5xl font-bold text-dark mb-2 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "var(--font-heading)" }}>500+</span>
                <span className="text-xs md:text-sm uppercase tracking-[0.15em] text-text-light font-semibold group-hover:text-dark transition-colors duration-300">Trusted Customers</span>
              </div>
              <div className="text-center group p-4 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 border border-transparent hover:border-border/30">
                <span className="block text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "var(--font-heading)" }}>1000+</span>
                <span className="text-xs md:text-sm uppercase tracking-[0.15em] text-text-light font-semibold group-hover:text-dark transition-colors duration-300">Orders Delivered</span>
              </div>
              <div className="text-center group p-4 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 border border-transparent hover:border-border/30">
                <span className="block text-4xl md:text-5xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "var(--font-heading)" }}>100%</span>
                <span className="text-xs md:text-sm uppercase tracking-[0.15em] text-text-light font-semibold group-hover:text-dark transition-colors duration-300">Quality Assured</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white border-t border-border/10" id="reviews-grid">
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
                  <div className="group relative bg-transparent p-6 md:p-8 rounded-2xl border-2 border-border/40 transition-all duration-300 hover:border-primary/50 h-full flex flex-col">
                    {/* Decorative Quote Icon */}
                    <div className="absolute top-6 right-6 text-primary/5 group-hover:text-primary/10 transition-colors">
                      <Quote size={50} fill="currentColor" />
                    </div>
                    
                    <div className="mb-4 relative z-10 text-primary">
                      <Quote size={20} fill="currentColor" />
                    </div>
                    
                    <p className="text-sm md:text-base text-text leading-relaxed mb-6 font-medium italic relative z-10">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-border/50 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-md flex-shrink-0 border-2 border-primary/20 bg-cream overflow-hidden">
                        {review.avatar && review.avatar.startsWith("http") ? (
                          <img 
                            src={review.avatar} 
                            alt={review.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                          />
                        ) : (
                          <span className="text-sm font-black text-primary tracking-tighter">
                            {review.avatar}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-dark tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                          {review.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] uppercase tracking-widest text-text-light font-bold">
                            {review.location}
                          </span>
                        </div>
                      </div>
                    </div>
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

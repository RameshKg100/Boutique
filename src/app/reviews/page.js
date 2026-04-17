"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { reviews } from "@/data/reviews";
import { Star, Quote } from "lucide-react";

export default function ReviewsPage() {
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 mt-10 pt-8 border-t border-border/60 max-w-4xl mx-auto">
              <div className="text-center group p-6 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-2 border border-transparent hover:border-border/30">
                <span className="block text-4xl md:text-5xl font-bold text-dark mb-2 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "var(--font-heading)" }}>500+</span>
                <span className="text-xs md:text-sm uppercase tracking-[0.15em] text-text-light font-semibold group-hover:text-dark transition-colors duration-300">Trusted Customers</span>
              </div>
              <div className="text-center group p-6 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-2 border border-transparent hover:border-border/30">
                <span className="block text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "var(--font-heading)" }}>1000+</span>
                <span className="text-xs md:text-sm uppercase tracking-[0.15em] text-text-light font-semibold group-hover:text-dark transition-colors duration-300">Orders Delivered</span>
              </div>
              <div className="text-center group p-6 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-2 border border-transparent hover:border-border/30">
                <span className="block text-4xl md:text-5xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "var(--font-heading)" }}>100%</span>
                <span className="text-xs md:text-sm uppercase tracking-[0.15em] text-text-light font-semibold group-hover:text-dark transition-colors duration-300">Quality Assured</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 lg:py-24" id="reviews-grid">
        <div className="container-boutique">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((review, index) => (
              <AnimatedSection key={review.id} delay={(index % 3) * 100}>
                <div className="bg-white rounded-2xl p-8 card-hover border border-border/30 h-full relative">
                  <div className="absolute top-6 right-6 text-cream">
                    <Quote size={40} fill="currentColor" />
                  </div>
                  
                  <div className="mb-6 relative z-10 text-primary/40">
                    <Quote size={24} fill="currentColor" />
                  </div>
                  
                  <p className="text-sm text-text-light leading-relaxed mb-8 italic relative z-10">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-border/50 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-md flex-shrink-0"
                         style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}>
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark" style={{ fontFamily: "var(--font-heading)" }}>
                        {review.name}
                      </p>
                      <p className="text-xs text-text-light">
                        {review.location}
                      </p>
                      <p className="text-[10px] text-primary font-medium mt-0.5">
                        {review.product}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Star, Quote, Loader2, X, ZoomIn, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const openLightbox = (url) => {
    setSelectedImage(url);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {/* Lightbox / Zoom Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-12 cursor-zoom-out"
          >
            <motion.button 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors z-50"
            >
              <X size={24} />
            </motion.button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Review Zoom" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl cursor-default select-none border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-5">
              {reviews.map((review, index) => {
                const imageUrl = review.avatar && review.avatar.startsWith('http') ? review.avatar : review.text;
                const hasImage = imageUrl && imageUrl.startsWith('http');

                return (
                  <AnimatedSection key={review.id} delay={(index % 6) * 50}>
                    <div 
                      className={`group bg-white rounded-2xl overflow-hidden border border-border/40 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full shadow-sm ${hasImage ? 'cursor-zoom-in' : ''}`}
                      onClick={() => hasImage && openLightbox(imageUrl)}
                    >
                      {/* Review Photo / Screenshot - Standardized Aspect Ratio */}
                      {hasImage && (
                        <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
                          <img 
                            src={imageUrl} 
                            alt="Customer Review" 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          
                          {/* Decorative Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                             <div className="flex items-center justify-between w-full">
                               <div className="flex items-center gap-1 text-white/90">
                                  <Star size={12} fill="currentColor" className="text-yellow-400" />
                                  <span className="text-[10px] font-black uppercase tracking-widest">Client Love</span>
                               </div>
                               <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                  <Maximize2 size={14} />
                               </div>
                             </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Optional Feedback Text */}
                      {review.text && review.text !== "Photo Review" && !review.text.startsWith('http') && (
                        <div className="p-3 md:p-4 flex-grow">
                           <Quote size={16} className="text-primary/20 mb-2" fill="currentColor" />
                           <p className="text-xs md:text-[13px] text-text leading-relaxed font-medium italic">
                             &ldquo;{review.text}&rdquo;
                           </p>
                        </div>
                      )}
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

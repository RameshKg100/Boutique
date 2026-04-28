"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

// Fallback static images (used if no images are in the database)
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next
  const [heroImages, setHeroImages] = useState(FALLBACK_IMAGES);

  // Fetch images from DB on mount
  useEffect(() => {
    async function fetchHeroImages() {
      try {
        const res = await fetch("/api/hero-images", { cache: "no-store" });
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const activeImages = data
            .filter((img) => img.active)
            .sort((a, b) => a.display_order - b.display_order)
            .map((img) => img.url);
          if (activeImages.length > 0) {
            setHeroImages(activeImages);
            setCurrentIndex(0);
          }
        }
      } catch (err) {
        console.warn("Using fallback hero images:", err.message);
      }
    }
    fetchHeroImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000); // 4 seconds interval for a calm feel
    return () => clearInterval(timer);
  }, [heroImages]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
    }),
    center: {
      zIndex: 1,
      x: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
    })
  };

  return (
    <div className="relative overflow-hidden w-full h-full bg-cream group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { 
              duration: 1.5, // Slower, smoother transition
              ease: [0.45, 0, 0.55, 1] // Custom cubic-bezier for a very smooth "gliding" effect
            }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={heroImages[currentIndex]}
            alt={`Sashaa Boutiques - Featured Collection ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`transition-all duration-500 rounded-sm shadow-sm ${
              index === currentIndex
                ? "w-8 h-1.5 bg-white scale-110"
                : "w-2 h-1.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

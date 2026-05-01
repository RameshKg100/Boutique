"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const shopImages = [
  "/uploads/Shop Images/IMG-20260501-WA0039.jpg.jpeg",
  "/uploads/Shop Images/IMG-20260501-WA0040.jpg.jpeg",
  "/uploads/Shop Images/IMG-20260501-WA0042.jpg.jpeg",
  "/uploads/Shop Images/IMG-20260501-WA0043.jpg.jpeg",
  "/uploads/Shop Images/IMG-20260501-WA0044.jpg.jpeg",
];

export default function ShopImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shopImages.length);
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + shopImages.length) % shopImages.length);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : direction > 0 ? "-100%" : 0,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto aspect-[16/9] overflow-hidden rounded-xl shadow-lg bg-secondary/30 group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={shopImages[currentIndex]}
            alt={`Sathyas Boutique Shop - ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={slidePrev}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={slideNext}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {shopImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "w-6 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to shop image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

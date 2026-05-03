"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/uploads/Blue full pleated Maxi (1).jpeg",
  "/uploads/Blue full pleated Maxi (2).jpeg",
  "/uploads/Blue full pleated Maxi (3).jpeg",
  "/uploads/Blue full pleated Maxi (4).jpeg",
  "/uploads/Blue full pleated Maxi (5).jpeg",
];

export default function OverlappingGallery() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with middle image

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto pt-0 pb-8 px-4">
      <div className="relative h-[400px] md:h-[550px] flex items-center justify-center perspective-1000 overflow-hidden md:overflow-visible">
        {images.map((image, index) => {
          // Calculate distance from current index
          let offset = index - currentIndex;
          
          // Handle wrap-around for distances
          if (offset > 2) offset -= images.length;
          if (offset < -2) offset += images.length;

          // Only show images within distance of 2
          const isVisible = Math.abs(offset) <= 2;
          if (!isVisible) return null;

          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                x: offset * 180, // Horizontal spread
                scale: 1 - Math.abs(offset) * 0.15, // Shrink as it goes to sides
                zIndex: 10 - Math.abs(offset), // Stack middle on top
                rotateY: offset * -15, // Rotate away from center
                opacity: 1 - Math.abs(offset) * 0.3, // Fade out
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute w-[250px] md:w-[350px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
              onClick={() => setCurrentIndex(index)}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={image}
                alt={`Collection item ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-6">
                 <span className="text-white font-medium text-lg">View Design</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-6 mt-12">
        <button
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-md"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

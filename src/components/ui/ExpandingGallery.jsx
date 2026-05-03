"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const images = [
  { id: 1, src: "/uploads/Blue full pleated Maxi (1).jpeg", title: "Elegant Blue" },
  { id: 2, src: "/uploads/Blue full pleated Maxi (2).jpeg", title: "Timeless Grace" },
  { id: 3, src: "/uploads/Blue full pleated Maxi (3).jpeg", title: "Modern Ethnic" },
  { id: 4, src: "/uploads/Blue full pleated Maxi (4).jpeg", title: "Classic Style" },
  { id: 5, src: "/uploads/Blue full pleated Maxi (5).jpeg", title: "Floral Bloom" },
];

export default function ExpandingGallery() {
  const [expandedIndex, setExpandedIndex] = useState(2); // Middle one expanded by default

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <div className="flex flex-row h-[600px] gap-2 md:gap-3 overflow-hidden">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={false}
            animate={{
              flex: expandedIndex === index ? 4 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onMouseEnter={() => setExpandedIndex(index)}
            onClick={() => setExpandedIndex(index)}
            className="relative cursor-pointer overflow-hidden rounded-2xl group border border-white/10 shadow-lg"
          >
            <img
              src={image.src}
              alt={image.title}
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Minimal Overlay for depth */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-500 ${expandedIndex === index ? 'opacity-100' : 'opacity-40'}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

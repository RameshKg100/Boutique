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
      <div className="flex flex-col md:flex-row h-[500px] md:h-[600px] gap-2 md:gap-3 overflow-hidden">
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
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${expandedIndex === index ? 'opacity-100' : 'opacity-40 group-hover:opacity-60'}`} />
            
            {/* Title - Rotated when collapsed, horizontal when expanded */}
            <div className={`absolute bottom-0 left-0 w-full p-6 transition-all duration-500 ${expandedIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-primary text-xs uppercase tracking-widest font-bold mb-2 block">Premium Collection</span>
              <h3 className="text-white text-2xl font-bold font-heading">{image.title}</h3>
            </div>

            {/* Vertical title for collapsed state (optional but nice) */}
            {expandedIndex !== index && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <span className="text-white/60 font-bold uppercase tracking-[0.3em] text-xs rotate-[-90deg] whitespace-nowrap opacity-0 md:opacity-100 transition-opacity">
                   {image.title}
                 </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

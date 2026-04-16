"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Track the scroll position to toggle visibility
  useEffect(() => {
    const toggleVisibility = () => {
      // Show the button when scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 lg:bottom-10 right-6 lg:right-10 z-[90] p-3 md:p-4 rounded-md bg-primary text-white shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:bg-primary-dark hover:scale-110 hover:-translate-y-1 transition-all duration-300 group"
          aria-label="Scroll to Top"
        >
          <ArrowUp size={20} className="group-hover:animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

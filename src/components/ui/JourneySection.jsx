"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Scissors, Gem, Store } from "lucide-react";
import Image from "next/image";

const journeyStages = [
  {
    id: 1,
    title: "The First Stitch",
    year: "1998",
    icon: Scissors,
    description: "It all started with a single sewing machine and a passion for perfect fits. We began our journey focusing on custom bridal tailoring for close friends and family, laying the foundation of trust and quality.",
    image: "https://images.unsplash.com/photo-1616421477465-b77cdccfb6bd?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Mastering the Loom",
    year: "2010",
    icon: Gem,
    description: "We expanded our horizons, traveling to weaving clusters across Tamil Nadu to source pure Zari and Kanchipuram silks directly from generational weavers, ensuring authentic craftsmanship.",
    image: "https://images.unsplash.com/photo-1605000570881-228795eb9eb7?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Modern Elegance",
    year: "Today",
    icon: Store,
    description: "Sathya's Boutique stands as a beacon of South Indian grace, beautifully blending classic motifs with contemporary styling to serve modern women globally while staying rooted in our heritage.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=400&fit=crop"
  }
];

export default function JourneySection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section className="py-8 lg:py-12 bg-background overflow-hidden" id="our-journey">
      <div className="container-boutique">
        <AnimatedSection>
          <SectionHeading
            title="Our Journey"
            subtitle="Three decades of passion, craftsmanship, and unwavering dedication to South Indian elegance."
          />
        </AnimatedSection>

        <div className="mt-8 max-w-4xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Stepper / Tabs */}
          <div className="md:w-[35%] bg-secondary/80 p-4 flex flex-row md:flex-col justify-between md:justify-start gap-2 border-b md:border-b-0 md:border-r border-white/10 overflow-x-auto no-scrollbar">
            {journeyStages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = activeStage === index;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(index)}
                  className={`flex-shrink-0 text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-3 md:gap-4 group ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md scale-[1.02]" 
                      : "hover:bg-white/50 text-foreground/70 hover:text-foreground"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive ? "bg-white/20" : "bg-primary/10 group-hover:bg-primary/20 text-primary"
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div className="hidden sm:block">
                    <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${isActive ? "text-primary-foreground/80" : "text-primary"}`}>
                      {stage.year}
                    </div>
                    <div className="font-semibold text-sm">
                      {stage.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="md:w-[65%] p-6 md:p-8 relative min-h-[380px] md:min-h-[400px] flex items-center">
            {journeyStages.map((stage, index) => (
              <div 
                key={stage.id}
                className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-center transition-all duration-500 ease-in-out ${
                  activeStage === index 
                    ? "opacity-100 translate-y-0 z-10" 
                    : "opacity-0 translate-y-4 z-0 pointer-events-none"
                }`}
              >
                <div className="flex flex-col h-full gap-5">
                  {/* Image for Visual Change */}
                  <div className="relative w-full h-44 md:h-52 rounded-xl overflow-hidden shadow-sm">
                     <Image
                        src={stage.image}
                        alt={stage.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-4">
                        <span className="text-white font-heading text-xl md:text-2xl font-bold tracking-wide">{stage.year}</span>
                      </div>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2 font-heading text-foreground flex items-center gap-2">
                       <stage.icon size={20} className="text-primary hidden md:inline-block" />
                       {stage.title}
                    </h3>
                    <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

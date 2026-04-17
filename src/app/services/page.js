"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { Scissors, Sparkles, Crown, Ruler, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const iconMap = {
  Scissors,
  Sparkles,
  Crown,
  Ruler,
  ShoppingBag,
};

export default function ServicesPage() {
  return (
    <div className="bg-cream overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[40%] -left-[10%] w-[600px] h-[600px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative pt-24 pb-16 lg:pt-36 lg:pb-28 z-10" id="services-hero">
        <div className="container-boutique text-center max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border/50 shadow-sm mb-6">
              <Sparkles size={14} className="text-primary" />
              <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
                Premium Boutique Services
              </span>
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              Tailoring Your Perfection,<br />
              <span className="text-primary font-black">Stitch by Stitch</span>
            </h1>
            <p className="text-text/70 max-w-2xl mx-auto text-lg leading-relaxed">
              Experience fashion redefined. From personalized styling to master craftsmanship, we provide an end-to-end luxury outfit experience designed exclusively for your silhouette.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="relative py-16 lg:py-20 z-10 bg-white" id="services-list">
        <div className="container-boutique">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Sparkles;
              // Bento styling: first item and 4th item span 2 columns on large screens to create staggered mosaic
              const isWide = index === 0 || index === 3;

              return (
                <AnimatedSection 
                  key={service.id} 
                  delay={index * 100} 
                  className={isWide ? "lg:col-span-2" : "col-span-1"}
                >
                  <div className="group relative h-full bg-cream rounded-3xl p-8 lg:p-10 border border-border/40 shadow-[0_4px_24px_transparent] hover:shadow-[0_20px_40px_rgba(139,34,82,0.06)] transition-all duration-500 overflow-hidden flex flex-col">
                    
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-md flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                        }}
                      >
                        <IconComponent size={28} className="text-white" />
                      </div>

                      {/* Text */}
                      <h3
                        className="text-2xl lg:text-3xl font-black text-text mb-4 group-hover:text-primary transition-colors duration-300"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-text/70 leading-relaxed mb-8 flex-grow">
                        {service.description}
                      </p>

                      {/* Features */}
                      <div className="pt-6 border-t border-border/40 mt-auto">
                        <ul className={`grid gap-3 ${isWide ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-4 text-sm text-dark/80 group-hover:text-dark transition-colors duration-300"
                            >
                              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              </div>
                              <span className="font-medium leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Decorative Background Element */}
                    <div className="absolute -bottom-10 -right-10 text-primary/5 transform group-hover:scale-110 transition-transform duration-700 z-0 pointer-events-none">
                      <IconComponent size={200} strokeWidth={1} />
                    </div>

                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="relative py-20 lg:py-24 z-10 bg-cream" id="services-cta">
        <div className="container-boutique">
          <AnimatedSection>
            <div 
              className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 md:py-24 text-center text-white shadow-2xl"
              style={{
                background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 50%, var(--color-primary-light) 100%)",
              }}
            >
              {/* Overlaid Abstract Patterns */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <Crown size={48} className="mx-auto mb-6 text-white/80" />
                <h2
                  className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Ready to Experience Our Craftsmanship?
                </h2>
                <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed flex-grow">
                  Book a private consultation today and let our experts guide you to your perfect outfit.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-white text-primary px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-cream hover:scale-105 transition-all duration-300 shadow-[0_8px_30px_rgb(255,255,255,0.2)]"
                >
                  Book Consultation
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

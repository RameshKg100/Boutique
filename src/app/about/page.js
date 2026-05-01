"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ShopImageCarousel from "@/components/ui/ShopImageCarousel";
import {
  Users,
  Store,
  Globe,
  Target,
} from "lucide-react";

const milestones = [
  {
    year: "March - 2025",
    title: "Founded",
    icon: Store,
    description:
      "Sathaya Boutiques has opened in Kariyagoundanur, Annur. We launched with a curated collection of maxis, sarees, and kurtis.",
  },
  {
    year: "December - 2025",
    title: "250+ Customers",
    icon: Users,
    description:
      "Reached a major milestone of serving over 250+ loyal customers across Tamilnadu, building a community of fashion enthusiasts.",
  },
  {
    year: "May - 2026",
    title: "Online Expansion",
    icon: Globe,
    description:
      "Bringing our premium boutique experience to customers across all districts in Tamil Nadu through orders placed on our website (via WhatsApp platform).",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section with Shop Image Carousel */}
      <section className="relative pt-6 pb-10 lg:pt-10 lg:pb-14 bg-background overflow-hidden" id="about-hero">
        <div className="container-boutique">
          <AnimatedSection>
            <div className="text-center mb-8">
              <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
                Our Story
              </span>
              <h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--foreground)",
                }}
              >
                About Sathyas Boutiques
              </h1>
              <p className="text-foreground/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium mb-8">
                A journey shaped by dedication, creativity, and a heartfelt
                commitment to celebrating every woman’s individuality.
              </p>
            </div>
            
            {/* Auto-scrolling Shop Images with Manual Controls */}
            <ShopImageCarousel />
          </AnimatedSection>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-12 lg:py-16 bg-secondary/30 border-y border-white/10" id="our-journey">
        <div className="container-boutique">
          <SectionHeading 
            title="Our Journey" 
            subtitle="How we grew from a small local boutique to a trusted name in premium fashion." 
          />
          
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <AnimatedSection>
              <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
                Our Beginning
              </span>
              <h2
                className="text-2xl md:text-4xl font-bold mt-2 mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--foreground)",
                }}
              >
                Born from a Love of Fashion
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
                <p>
                  Sathyas Boutiques was founded in 2025 in the vibrant city of
                  Coimbatore. We had a simple vision: to create a space where
                  every woman can find clothing that matches her unique
                  personality and makes her feel extraordinary.
                </p>
                <p>
                  It started as a small boutique in Kariyagoundanur. Today, it
                  has grown into one of the most trusted names in premium
                  fashion. Our founder&apos;s passion for exquisite fabrics,
                  perfect tailoring, and personalized service shapes every
                  collection we create.
                </p>
                <p>
                  We now serve hundreds of valued customers who appreciate our
                  unwavering commitment to quality, elegance, and that personal touch
                  that makes every shopping experience special.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Milestones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {milestones.map((milestone, index) => (
              <AnimatedSection key={milestone.year} delay={index * 100}>
                <div className="bg-white/60 backdrop-blur-md p-6 lg:p-8 rounded-2xl border border-white/40 shadow-sm h-full hover:shadow-lg transition-all duration-500 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <milestone.icon size={24} />
                  </div>
                  <span className="text-primary text-lg font-black mb-1 block">
                    {milestone.year}
                  </span>
                  <h3
                    className="text-lg font-bold mb-3 text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-foreground/70 font-medium leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-12 lg:py-20 bg-background relative overflow-hidden" id="our-mission">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -z-10" />
        
        <div className="container-boutique">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 text-primary mb-8 shadow-inner">
                <Target size={32} />
              </div>
              <h2 
                className="text-3xl md:text-5xl font-bold mb-8" 
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Our Mission
              </h2>
              <p className="text-lg md:text-2xl text-foreground/80 leading-relaxed font-light italic">
                &ldquo;To empower every woman with fashion that celebrates her
                individuality. We deliver exceptional quality and designs that
                make our customers feel confident.&rdquo;
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

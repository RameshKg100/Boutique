"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Heart, Eye, Target, Award, Users, Sparkles, Store, Gem, Scissors, Globe, Star } from "lucide-react";

const values = [
  { icon: Heart, title: "Passion", description: "Every stitch tells a story of our deep love for fashion." },
  { icon: Award, title: "Quality", description: "Only the finest materials go into our collections." },
  { icon: Users, title: "Customer First", description: "Your satisfaction is our ultimate reward." },
];

const milestones = [
  { year: "2010", title: "Founded", icon: Store, description: "Sashaa Boutiques opened its doors in the heart of Chennai's Gopalapuram, starting with a curated collection of artisanal sarees." },
  { year: "2022", title: "500+ Customers", icon: Users, description: "Reached a major milestone of serving over 500 loyal customers across India, building a community of fashion enthusiasts." },
  { year: "2024", title: "Online Expansion", icon: Globe, description: "Bringing our premium boutique experience to customers nationwide through our flagship digital store and worldwide shipping." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-secondary py-8 lg:py-12" id="about-hero">
        <div className="container-boutique text-center">
          <AnimatedSection>
            <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
              Our Story
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
            >
              About Sashaa Boutiques
            </h1>
            <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              A story of passion, craftsmanship, and an unwavering commitment to
              making every woman feel extraordinary.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-8 lg:py-12 bg-background" id="brand-story">
        <div className="container-boutique">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <AnimatedSection animation="slide-in-left">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop"
                  alt="Sashaa Boutiques Founder"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-in-right">
              <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
                Our Beginning
              </span>
              <h2
                className="text-3xl md:text-4xl font-black mt-2 mb-4"
                style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
              >
                Born from a Love of Fashion
              </h2>
              <div className="space-y-4 text-text/80 leading-relaxed">
                <p>
                  Sashaa Boutiques was founded in 2010 in the vibrant city of Chennai,
                  with a simple yet powerful vision: to create a space where every woman
                  could discover clothing that truly reflects her unique personality and
                  makes her feel extraordinary.
                </p>
                <p>
                  What started as a small boutique in Gopalapuram has grown into one of
                  Chennai&apos;s most trusted names in premium fashion. Our founder&apos;s passion
                  for exquisite fabrics, impeccable tailoring, and personalized service
                  has been the driving force behind every collection we create.
                </p>
                <p>
                  Today, we serve hundreds of discerning customers who value quality,
                  elegance, and the personal touch that defines the Sashaa experience.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 lg:py-12 bg-secondary border-y border-white/10" id="mission-vision">
        <div className="container-boutique">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection delay={0}>
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 md:p-8 card-hover border border-white/20 h-full">
                <div
                  className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center bg-primary/10 border border-primary/20"
                >
                  <Target size={20} className="text-primary" />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                >
                  Our Mission
                </h3>
                <p className="text-foreground/70 text-sm font-medium leading-relaxed">
                  To empower every woman with fashion that celebrates her individuality.
                  We deliver exceptional quality and designs that make our customers feel confident.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 md:p-8 card-hover border border-white/20 h-full">
                <div
                  className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center bg-primary/10 border border-primary/20"
                >
                  <Eye size={20} className="text-primary" />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                >
                  Our Vision
                </h3>
                <p className="text-foreground/70 text-sm font-medium leading-relaxed">
                  To be India&apos;s most loved boutique brand — known for our celebration of Indian textile heritage and timeless elegance.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== OUR JOURNEY: THE SINGLE RAIL (ONE SCREEN) ===== */}
      <section className="py-10 lg:py-16 bg-white" id="our-journey">
        <div className="container-boutique">
          <AnimatedSection>
            <div className="text-center mb-8 lg:mb-12">
              <span className="text-primary text-xs uppercase tracking-[0.4em] font-black mb-3 block">
                The Heritage
              </span>
              <h2 className="text-3xl md:text-5xl font-black mb-4 text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                Our <span className="text-primary italic">Journey</span>
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="relative max-w-4xl mx-auto py-10">
            {/* The Vertical Central Line (Desktop) */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-border-color hidden md:block" />
            
            {/* The Rows */}
            <div className="space-y-16 md:space-y-24">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative">
                  <AnimatedSection animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}>
                    <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                      
                      {/* Central Point */}
                      <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-primary z-10 hidden md:flex items-center justify-center shadow-md">
                        <milestone.icon size={18} className="text-primary" />
                      </div>

                      {/* Side 1: Year/Icon */}
                      <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-16 text-center md:text-right">
                        <div className={`md:flex flex-col ${index % 2 !== 0 ? "md:items-start" : "md:items-end"}`}>
                           <span className="text-primary text-4xl font-black mb-2 block">{milestone.year}</span>
                           <div className="w-12 h-1 px-1 bg-primary rounded-full hidden md:block" />
                        </div>
                      </div>

                      {/* Side 2: Content Card */}
                      <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-16 text-center md:text-left">
                        <div className="bg-[#FBFBFB] p-8 rounded-2xl border border-border-color shadow-sm max-w-md w-full transition-all duration-300 hover:shadow-xl hover:border-primary/20">
                          <div className="md:hidden w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                            <milestone.icon size={22} />
                          </div>
                          <h3 className="text-xl font-bold mb-3 text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                            {milestone.title}
                          </h3>
                          <p className="text-sm text-foreground/60 font-medium leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                    </div>
                  </AnimatedSection>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 bg-white" id="our-values">
        <div className="container-boutique">
          <AnimatedSection>
            <SectionHeading
              title="Our Values"
              subtitle="The core principles that define us."
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 100}>
                <div className="p-6 rounded-2xl border border-border-color text-center hover:shadow-lg transition-all duration-300 bg-secondary/30">
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center bg-primary/10 border border-primary/20"
                  >
                    <value.icon size={18} className="text-primary" />
                  </div>
                  <h3
                    className="text-base font-bold mb-2 text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-xs text-foreground/60 font-medium leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

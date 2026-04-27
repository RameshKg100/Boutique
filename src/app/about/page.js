"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Heart, Eye, Target, Award, Users, Sparkles, Store, Gem, Scissors, Globe, Star } from "lucide-react";

const values = [
  { icon: Heart, title: "Passion", description: "Every stitch tells a story of our deep love for fashion and craftsmanship." },
  { icon: Eye, title: "Attention to Detail", description: "We obsess over every detail, from fabric selection to the final fitting." },
  { icon: Target, title: "Perfection", description: "We don't settle for anything less than perfect in every garment we create." },
  { icon: Award, title: "Quality", description: "Only the finest materials and techniques go into our collections." },
  { icon: Users, title: "Customer First", description: "Your satisfaction and confidence in our pieces is our ultimate reward." },
  { icon: Sparkles, title: "Innovation", description: "We blend traditional techniques with contemporary design sensibilities." },
];

const milestones = [
  { year: "2010", title: "Founded", icon: Store, description: "Sashaa Boutiques opened its doors in the heart of Chennai's Gopalapuram, starting with a curated collection of artisanal sarees." },
  { year: "2014", title: "Bridal Launch", icon: Gem, description: "Launched our signature bridal collection, becoming a premium destination for brides seeking unique, handcrafted elegance." },
  { year: "2018", title: "Tailoring Studio", icon: Scissors, description: "Opened our dedicated custom tailoring studio with master artisans to provide a flawless, personalized fit for every client." },
  { year: "2022", title: "500+ Customers", icon: Users, description: "Reached a major milestone of serving over 500 loyal customers across India, building a community of fashion enthusiasts." },
  { year: "2024", title: "Online Expansion", icon: Globe, description: "Bringing our premium boutique experience to customers nationwide through our flagship digital store and worldwide shipping." },
  { year: "2025", title: "Global Presence", icon: Star, description: "Expanding our reach to international fashion centers, showcasing the best of Indian craftsmanship to a global audience." },
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
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 md:p-10 card-hover border border-white/20 h-full">
                <div
                  className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-primary/10 border border-primary/20"
                >
                  <Target size={22} className="text-primary" />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                >
                  Our Mission
                </h3>
                <p className="text-foreground/70 font-medium leading-relaxed">
                  To empower every woman with fashion that celebrates her individuality.
                  We are committed to delivering exceptional quality, personalized service,
                  and designs that make our customers feel confident, beautiful, and
                  authentically themselves.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 md:p-10 card-hover border border-white/20 h-full">
                <div
                  className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-primary/10 border border-primary/20"
                >
                  <Eye size={22} className="text-primary" />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                >
                  Our Vision
                </h3>
                <p className="text-foreground/70 font-medium leading-relaxed">
                  To be India&apos;s most loved boutique brand — known for our unwavering
                  commitment to quality, our celebration of Indian textile heritage,
                  and our ability to blend timeless tradition with contemporary elegance.
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
          
          <div className="relative">
            {/* The Rail Line (Desktop) */}
            <div className="absolute top-[48px] left-0 right-0 h-[1px] bg-border-color hidden lg:block" />
            
            {/* The Single Row Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative group">
                  <AnimatedSection delay={index * 100} animation="slide-in-up">
                    <div className="flex flex-col items-center">
                      
                      {/* Interactive Dot on Rail */}
                      <div className="hidden lg:flex items-center justify-center w-full h-12 relative mb-6">
                        <div className="w-3 h-3 rounded-full bg-white border-2 border-primary z-20 group-hover:scale-150 group-hover:bg-primary transition-all duration-300 shadow-sm" />
                        <div className="absolute top-[-30px] text-[10px] font-black text-primary tracking-widest bg-primary/5 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {milestone.year}
                        </div>
                      </div>

                      {/* Compact Milestone Card */}
                      <div className="bg-[#FBFBFB] p-6 rounded-2xl border border-border-color w-full h-full min-h-[220px] flex flex-col items-center text-center transition-all duration-500 hover:bg-white hover:shadow-xl hover:-translate-y-2 group-hover:border-primary/20">
                        {/* Medium Icon */}
                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 transition-colors group-hover:bg-primary group-hover:text-white">
                          <milestone.icon size={22} strokeWidth={2.5} />
                        </div>
                        
                        <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-2 block lg:hidden">
                          {milestone.year}
                        </span>
                        
                        <h3 className="text-lg font-bold mb-3 text-foreground leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                          {milestone.title}
                        </h3>
                        
                        <p className="text-[13px] text-foreground/60 font-medium leading-relaxed">
                          {milestone.description}
                        </p>
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
      <section className="py-8 lg:py-12 bg-secondary border-y border-white/10" id="our-values">
        <div className="container-boutique">
          <AnimatedSection>
            <SectionHeading
              title="Our Values"
              subtitle="The principles that guide everything we do at Sashaa Boutiques."
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 100}>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 card-hover border border-white/20 text-center">
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center bg-primary/10 border border-primary/20"
                  >
                    <value.icon size={20} className="text-primary" />
                  </div>
                  <h3
                    className="text-lg font-bold mb-2 text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-sm text-foreground/60 font-medium leading-relaxed">
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

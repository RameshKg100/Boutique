"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Heart, Eye, Target, Award, Users, Sparkles } from "lucide-react";

const values = [
  { icon: Heart, title: "Passion", description: "Every stitch tells a story of our deep love for fashion and craftsmanship." },
  { icon: Eye, title: "Attention to Detail", description: "We obsess over every detail, from fabric selection to the final fitting." },
  { icon: Target, title: "Perfection", description: "We don't settle for anything less than perfect in every garment we create." },
  { icon: Award, title: "Quality", description: "Only the finest materials and techniques go into our collections." },
  { icon: Users, title: "Customer First", description: "Your satisfaction and confidence in our pieces is our ultimate reward." },
  { icon: Sparkles, title: "Innovation", description: "We blend traditional techniques with contemporary design sensibilities." },
];

const milestones = [
  { year: "2010", title: "Founded", description: "Sashaa Boutiques opened its doors in the heart of Chennai's Gopalapuram." },
  { year: "2014", title: "Bridal Collection Launch", description: "Launched our signature bridal collection, becoming a go-to for brides-to-be." },
  { year: "2018", title: "Custom Tailoring Studio", description: "Opened our dedicated custom tailoring studio with master artisans." },
  { year: "2022", title: "500+ Happy Customers", description: "Reached the milestone of serving over 500 loyal customers across India." },
  { year: "2024", title: "Online Expansion", description: "Bringing our premium boutique experience to customers nationwide through our online store." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-cream py-16 lg:py-20" id="about-hero">
        <div className="container-boutique text-center">
          <AnimatedSection>
            <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
              Our Story
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              About Sashaa Boutiques
            </h1>
            <p className="text-text/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              A story of passion, craftsmanship, and an unwavering commitment to
              making every woman feel extraordinary.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-12 lg:py-18 bg-white" id="brand-story">
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
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
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
      <section className="py-12 lg:py-18 bg-cream border-y border-border/10" id="mission-vision">
        <div className="container-boutique">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection delay={0}>
              <div className="bg-cream rounded-xl p-8 md:p-10 card-hover border border-border/30 h-full">
                <div
                  className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
                >
                  <Target size={22} className="text-white" />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
                >
                  Our Mission
                </h3>
                <p className="text-text/70 font-medium leading-relaxed">
                  To empower every woman with fashion that celebrates her individuality.
                  We are committed to delivering exceptional quality, personalized service,
                  and designs that make our customers feel confident, beautiful, and
                  authentically themselves.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="bg-cream rounded-xl p-8 md:p-10 card-hover border border-border/30 h-full">
                <div
                  className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--color-secondary), var(--color-gold))" }}
                >
                  <Eye size={22} className="text-white" />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
                >
                  Our Vision
                </h3>
                <p className="text-text/70 font-medium leading-relaxed">
                  To be India&apos;s most loved boutique brand — known for our unwavering
                  commitment to quality, our celebration of Indian textile heritage,
                  and our ability to blend timeless tradition with contemporary elegance.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Tree-wise Vertical Timeline */}
      <section className="py-12 lg:py-18 bg-white" id="our-journey">
        <div className="container-boutique">
          <AnimatedSection>
            <SectionHeading
              title="Our Journey"
              subtitle="Key milestones that have shaped the Sashaa Boutiques story."
            />
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto relative px-2 sm:px-4">
            {/* Vertical Line (The Tree Trunk) - Visible on all screens */}
            <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 -translate-x-1/2" />
            
            <div className="space-y-12 relative">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={milestone.year} delay={index * 100} animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}>
                  <div className={`group relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    
                    {/* Node/Year Icon - Now visible on all screens */}
                    <div className="absolute left-[31px] md:left-1/2 top-10 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div 
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-xs md:text-lg font-black shadow-lg transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 border-4 border-[#FAF4F2]"
                        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
                      >
                        {milestone.year.slice(2)}
                      </div>
                    </div>

                    {/* Content Card (The Pop-up Box) */}
                    <div className="w-full pl-16 md:pl-0 md:w-[45%]">
                      <div className="relative bg-white p-6 md:p-8 rounded-2xl border border-primary/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(226,169,176,0.3)] overflow-hidden">
                        {/* Hover Backdrop Pop-up Slide */}
                        <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        
                        <div className="relative z-10">
                          <span className="text-primary text-xs font-black uppercase tracking-widest mb-2 block transition-transform duration-300 group-hover:translate-x-2">
                            {milestone.year}
                          </span>
                          <h3
                            className="text-lg md:text-xl font-bold text-dark mb-2 md:mb-3 transition-colors duration-300 group-hover:text-primary"
                            style={{ fontFamily: "var(--font-heading)" }}
                          >
                            {milestone.title}
                          </h3>
                          <p className="text-sm md:text-base text-dark/70 font-medium leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Spacer for symmetrical layout on Desktop */}
                    <div className="hidden md:block w-[45%]" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 lg:py-18 bg-cream border-y border-border/10" id="our-values">
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
                <div className="bg-cream rounded-xl p-6 md:p-8 card-hover border border-border/30 text-center">
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
                  >
                    <value.icon size={20} className="text-white" />
                  </div>
                  <h3
                    className="text-lg font-bold mb-2 text-dark"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-sm text-text/70 font-medium leading-relaxed">
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

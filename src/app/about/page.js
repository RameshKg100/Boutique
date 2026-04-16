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
      <section className="relative bg-cream py-20 lg:py-28" id="about-hero">
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
      <section className="py-20 lg:py-28" id="brand-story">
        <div className="container-boutique">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                className="text-3xl md:text-4xl font-black mt-3 mb-6"
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
      <section className="py-20 lg:py-28 bg-primary-light/30" id="mission-vision">
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

      {/* Timeline */}
      <section className="py-20 lg:py-28" id="our-journey">
        <div className="container-boutique">
          <AnimatedSection>
            <SectionHeading
              title="Our Journey"
              subtitle="Key milestones that have shaped the Sashaa Boutiques story."
            />
          </AnimatedSection>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <AnimatedSection key={milestone.year} delay={index * 100}>
                <div className="flex gap-6 mb-10 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
                    >
                      {milestone.year.slice(2)}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-px h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-10">
                    <span className="text-primary text-xs font-medium uppercase tracking-wider">
                      {milestone.year}
                    </span>
                    <h3
                      className="text-lg font-bold text-dark mt-1 mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-text/70 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-secondary/10" id="our-values">
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

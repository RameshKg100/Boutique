"use client";

import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  Heart,
  Eye,
  Target,
  Award,
  Users,
  Sparkles,
  Store,
  Gem,
  Scissors,
  Globe,
  Star,
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
      {/* Hero Banner */}
      <section className="relative bg-secondary py-8 lg:py-12" id="about-hero">
        <div className="container-boutique text-center">
          <AnimatedSection>
            <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
              Our Story
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--foreground)",
              }}
            >
              About Sathyas Boutiques
            </h1>
            <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
              A journey shaped by dedication, creativity, and a heartfelt
              commitment to celebrating every woman’s individuality.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-8 lg:py-12 bg-background" id="brand-story">
        <div className="container-boutique">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <AnimatedSection animation="slide-in-left">
              <div className="relative rounded-2xl overflow-hidden aspect-[9/16] shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop"
                  alt="Sathyas Boutique Founder"
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
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--foreground)",
                }}
              >
                Born from a Love of Fashion
              </h2>
              <div className="space-y-4 text-text/80 leading-relaxed">
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
                  We now serve hundreds of valued customers. They appreciate our
                  quality, elegance, and personal touch.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="py-8 lg:py-12 bg-secondary border-y border-white/10"
        id="mission-vision"
      >
        <div className="container-boutique">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection delay={0}>
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 md:p-8 card-hover border border-white/20 h-full">
                <div className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center bg-primary/10 border border-primary/20">
                  <Target size={20} className="text-primary" />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--foreground)",
                  }}
                >
                  Our Mission
                </h3>
                <p className="text-foreground/70 text-sm font-medium leading-relaxed">
                  To empower every woman with fashion that celebrates her
                  individuality. We deliver exceptional quality and designs that
                  make our customers feel confident.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 md:p-8 card-hover border border-white/20 h-full">
                <div className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center bg-primary/10 border border-primary/20">
                  <Eye size={20} className="text-primary" />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--foreground)",
                  }}
                >
                  Our Vision
                </h3>
                <p className="text-foreground/70 text-sm font-medium leading-relaxed">
                  Our vision is to be the most loved dress boutique in our
                  district. We offer elegant and affordable fashion for every
                  occasion.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== OUR JOURNEY: ROW-WISE LAYOUT ===== */}
      <section className="py-8 lg:py-12 bg-background" id="our-journey">
        <div className="container-boutique">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h2
                className="text-3xl md:text-4xl font-black text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Our <span className="text-primary italic">Journey</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
            {milestones.map((milestone, index) => (
              <AnimatedSection key={milestone.year} delay={index * 100}>
                <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-sm h-full flex flex-col md:flex-row items-start gap-4 transition-all duration-300 hover:shadow-md hover:border-primary/30">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <milestone.icon size={22} />
                  </div>
                  <div>
                    <span className="text-primary text-xl font-black mb-1 block">
                      {milestone.year}
                    </span>
                    <h3
                      className="text-base font-bold mb-2 text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-foreground/70 font-medium leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

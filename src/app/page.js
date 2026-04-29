"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Scissors,
  TrendingUp,
  Gem,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import HeroCarousel from "@/components/ui/HeroCarousel";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/products/ProductCard";


const whyChooseUs = [
  {
    icon: Gem,
    title: "Authentic Craftsmanship",
    description:
      "Showcasing the finest traditional weaving and hand-embroidery techniques of Tamil Nadu.",
  },
  {
    icon: ShieldCheck,
    title: "Pure Zari & Silk",
    description:
      "Sourced directly from generational weavers to guarantee authenticity and heirloom quality.",
  },
  {
    icon: Scissors,
    title: "Bespoke Bridal Fits",
    description:
      "Impeccable custom tailoring ensuring you look radiant on your most auspicious days.",
  },
  {
    icon: TrendingUp,
    title: "Modern Tradition",
    description:
      "Beautifully blending classic South Indian motifs with contemporary styling.",
  },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const prodRes = await fetch("/api/products", { cache: "no-store" });
        const prodData = await prodRes.json();

        if (Array.isArray(prodData)) {
          setFeaturedProducts(prodData.filter(p => p.isFeatured).slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-background overflow-hidden flex items-center" id="hero-section">
        <div className="container-boutique w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[50vh] lg:min-h-[60vh] py-8 lg:py-12">
            {/* Left Content */}
            <AnimatedSection animation="slide-in-left" className="order-2 lg:order-1">
              <div className="max-w-lg">
                <span className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium mb-4">
                  <Sparkles size={14} />
                  Authentic Tamil Nadu Boutique
                </span>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                >
                  Discover the Essence of{" "}
                  <span style={{ color: "var(--color-primary)" }}>
                    South Indian Grace
                  </span>
                </h1>
                <p className="text-text/70 text-base md:text-lg font-medium leading-relaxed mb-8">
                  Experience the rich heritage of Tamil Nadu through our exquisite Kanchipuram silks, bespoke traditional wear, and premium craftsmanship tailored for the modern woman.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/collections" className="btn-primary">
                    Explore Collections
                    <ArrowRight size={16} />
                  </Link>
                  <Link href="/about" className="btn-secondary">
                    Our Story
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Right Image */}
            <AnimatedSection animation="window-reveal" className="order-1 lg:order-2 h-full min-h-[500px] lg:min-h-[600px]">
              <div className="relative h-full w-full overflow-hidden shadow-2xl rounded-2xl">
                {/* Auto Continuous Carousel Component */}
                <HeroCarousel />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="py-8 lg:py-12 bg-background" id="about-preview">
        <div className="container-boutique">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <AnimatedSection animation="window-reveal">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop"
                  alt="Sashaa Boutiques - Crafting Elegance"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>

            {/* Content */}
            <AnimatedSection animation="slide-in-right">
              <div>
                <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
                  Our Heritage
                </span>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                >
                  Rooted in Tamil Tradition
                </h2>
                <p className="text-text/80 leading-relaxed mb-8">
                  From the weaving clusters of Kanchipuram to modern boutique styling, we blend centuries of South Indian textile heritage with contemporary elegance. Every drape and stitch tells a story of cultural pride.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Authentic Handloom Silks",
                    "Intricate Maggam & Aari Work",
                    "Custom Bridal Tailoring",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-dark text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/about" className="btn-secondary">
                  Read Our Story
                  <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>


      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-8 lg:py-12 bg-background" id="featured-products">
        <div className="container-boutique">
          <AnimatedSection>
            <SectionHeading
              title="Bestselling Pieces"
              subtitle="Our most loved designs, handpicked for their exceptional quality and timeless appeal."
            />
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {loading ? (
              <div className="col-span-full py-20 text-center">
                <Loader2 className="animate-spin mx-auto text-primary mb-4" size={40} />
                <p className="text-text-light italic">Bringing out the best...</p>
              </div>
            ) : featuredProducts.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-text/40">Exclusive pieces coming soon.</p>
              </div>
            ) : (
              featuredProducts.map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 100}>
                  <ProductCard product={product} />
                </AnimatedSection>
              ))
            )}
          </div>

          <AnimatedSection className="text-center mt-8">
            <Link href="/collections" className="btn-secondary">
              Explore Collections
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-8 lg:py-12 bg-secondary border-y border-white/10" id="why-choose-us">
        <div className="container-boutique">
          <AnimatedSection>
            <SectionHeading
              title="Why Choose Us"
              subtitle="We bring your fashion dreams to life with unparalleled craftsmanship, premium materials, and obsessive attention to detail."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {whyChooseUs.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 100}>
                <div className="text-center p-6 md:p-8 bg-white/40 backdrop-blur-sm rounded-xl card-hover border border-white/20 shadow-sm">
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center bg-primary/10 border border-primary/20"
                  >
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <h3
                    className="text-lg font-bold mb-3 text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70 font-medium leading-relaxed">
                    {item.description}
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

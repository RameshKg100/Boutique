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
import OverlappingGallery from "@/components/ui/OverlappingGallery";
import ProductCard from "@/components/products/ProductCard";

const whyChooseUs = [
  {
    icon: Gem,
    title: "Trendy & Elegant Collections",
    description:
      "We offer carefully curated outfits that follow the latest fashion trends while maintaining elegance.",
  },
  {
    icon: ShieldCheck,
    title: "Perfect Fit & Quality Fabrics",
    description:
      "Each piece is chosen for comfort, quality, and a flattering fit for all body types.",
  },
  {
    icon: Scissors,
    title: "Affordable Luxury",
    description:
      "Enjoy stylish boutique wear at budget-friendly prices without compromising on quality.",
  },
  {
    icon: TrendingUp,
    title: "Personalized Shopping Experience",
    description:
      "We help you select the perfect outfit for every occasion with friendly and personalized service.",
  },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const prodRes = await fetch("/api/products", { cache: "no-store" });
        const prodData = await prodRes.json();

        if (Array.isArray(prodData)) {
          setFeaturedProducts(prodData.filter((p) => p.isFeatured).slice(0, 5));
          setBestSellers(prodData.filter((p) => p.isBestSeller).slice(0, 5));
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
      <section
        className="relative bg-background overflow-hidden flex items-center"
        id="hero-section"
      >
        <div className="container-boutique w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[50vh] lg:min-h-[60vh] py-8 lg:py-12">
            {/* Left Content */}
            <AnimatedSection
              animation="slide-in-left"
              className="order-2 lg:order-1"
            >
              <div className="max-w-lg">
                <span className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium mb-4">
                  <Sparkles size={14} />
                  Our Boutique — Made for your everyday glow
                </span>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--foreground)",
                  }}
                >
                  Your Destination for{" "}
                  <span style={{ color: "var(--color-primary)" }}>
                    Simple & Elegant Fashion
                  </span>
                </h1>
                <p className="text-text/70 text-base md:text-lg font-medium leading-relaxed mb-8">
                  Discover timeless elegance at our boutique, where tradition
                  meets everyday fashion. We offer a carefully selected range of
                  maxis, tops, kurtis, and sarees designed for comfort, style,
                  and versatility. Each piece is thoughtfully crafted to blend
                  traditional charm with modern trends, making it perfect for
                  daily wear, festive occasions, and special moments.
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
            <AnimatedSection
              animation="window-reveal"
              className="order-1 lg:order-2 h-full min-h-[500px] lg:min-h-[600px]"
            >
              <div className="relative h-full w-full overflow-hidden shadow-2xl rounded-2xl">
                {/* Auto Continuous Carousel Component */}
                <HeroCarousel />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="pb-12 lg:pb-20 bg-background" id="about-preview">
        <div className="container-boutique">
          <div className="flex flex-col gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Interactive Gallery */}
            <div className="w-full">
              <OverlappingGallery />
            </div>

            {/* Content */}
            <AnimatedSection animation="slide-in-bottom" className="text-center">
              <div className="flex flex-col items-center">
                <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium mb-3">
                  Our Design
                </span>
                <h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--foreground)",
                  }}
                >
                  Crafted from tradition, designed for today’s wardrobe
                </h2>
                <p className="text-text/80 leading-relaxed mb-10 max-w-2xl">
                  Our collection of maxi dresses, tops, and kurtis combines
                  effortless elegance with cultural heritage. Each piece
                  features flowing silhouettes, versatile everyday styles, and
                  timeless ethnic designs. Made with handwoven-inspired fabrics,
                  delicate embroidery, and thoughtful detailing, they bring
                  together comfort, modern style, and the pride of South Indian
                  craftsmanship.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
                  {[
                    "Elegant Flowing Maxi Dresses",
                    "Stylish Ethnic & Casual Kurtis",
                    "Simple & Elegant Dresses for Any Occasion",
                  ].map((item) => (
                    <div key={item} className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-dark text-sm font-bold tracking-tight">
                        {item}
                      </span>
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
              subtitle="Our most loved designs, carefully selected for their quality, comfort, and timeless style."
            />
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {loading ? (
              <div className="col-span-full py-20 text-center">
                <Loader2
                  className="animate-spin mx-auto text-primary mb-4"
                  size={40}
                />
                <p className="text-text-light italic">
                  Bringing out the best...
                </p>
              </div>
            ) : bestSellers.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-text/40">Exclusive pieces coming soon.</p>
              </div>
            ) : (
              bestSellers.map((product, index) => (
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
      <section
        className="py-8 lg:py-12 bg-background border-y border-border/10"
        id="why-choose-us"
      >
        <div className="container-boutique">
          <AnimatedSection>
            <SectionHeading
              title="Why Choose Us"
              subtitle="We create beautiful fashion with great care and attention to detail."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8 max-w-3xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 100}>
                <div className="flex items-start gap-4 p-5 bg-cream rounded-xl border border-border/40 shadow-sm card-hover">
                  <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20">
                    <item.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold mb-1.5 text-foreground"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/70 font-medium leading-relaxed">
                      {item.description}
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

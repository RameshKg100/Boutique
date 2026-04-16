"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Scissors,
  Quote,
  TrendingUp,
  Gem,
  ShieldCheck,
} from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import HeroCarousel from "@/components/ui/HeroCarousel";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { reviews } from "@/data/reviews";

const collections = [
  {
    name: "Maxis & Ethnic Gowns",
    slug: "maxis",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&h=600&fit=crop",
    description: "Flowing elegance for every occasion",
  },
  {
    name: "Kanchipuram Sarees",
    slug: "sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop",
    description: "Timeless Tamil Nadu traditions meets modern grace",
  },
  {
    name: "Tops & Blouses",
    slug: "tops",
    image: "https://images.unsplash.com/photo-1583395828681-4357492984fd?w=500&h=600&fit=crop",
    description: "Versatile style for the contemporary woman",
  },
  {
    name: "Kurtis & Suits",
    slug: "kurtis",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&h=600&fit=crop",
    description: "Artisanal craftsmanship in every stitch",
  },
];

const whyChooseUs = [
  {
    icon: Gem,
    title: "Unique Designs",
    description:
      "Exclusive patterns and stunning styles that ensure you stand out elegantly in any crowd.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Fabrics",
    description:
      "Sourced from top global mills to guarantee luxurious comfort and long-lasting quality.",
  },
  {
    icon: Scissors,
    title: "Custom Tailoring",
    description:
      "A flawless, personalized fit achieved through expert measurements and precision cutting.",
  },
  {
    icon: TrendingUp,
    title: "Latest Trends",
    description:
      "Continuously updated collections keeping you at the forefront of modern fashion.",
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const topReviews = reviews.slice(0, 3);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-cream overflow-hidden" id="hero-section">
        <div className="container-boutique">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] lg:min-h-[80vh] py-12 lg:py-0">
            {/* Left Content */}
            <AnimatedSection animation="slide-in-left" className="order-2 lg:order-1">
              <div className="max-w-lg">
                <span className="inline-flex items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] font-medium mb-4">
                  <Sparkles size={14} />
                  Premium Chennai Boutique
                </span>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
                >
                  Elevate Your Style with{" "}
                  <span style={{ color: "var(--color-primary)" }}>
                    Timeless Elegance
                  </span>
                </h1>
                <p className="text-text/70 text-base md:text-lg font-medium leading-relaxed mb-8">
                  Discover premium tailoring and exclusive fashion collections
                  crafted just for you. Embrace a wardrobe that speaks to your
                  unique identity.
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
            <AnimatedSection animation="slide-in-right" className="order-1 lg:order-2 h-full min-h-[500px] lg:min-h-[600px]">
              <div className="relative h-full w-full overflow-hidden shadow-2xl">
                {/* Auto Continuous Carousel Component */}
                <HeroCarousel />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="py-20 lg:py-28" id="about-preview">
        <div className="container-boutique">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <AnimatedSection animation="slide-in-left">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=750&fit=crop"
                  alt="Sashaa Boutiques - Crafting Elegance"
                  fill
                  className="object-cover"
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
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
                >
                  Crafting Elegance Since 2010
                </h2>
                <p className="text-text/80 leading-relaxed mb-8">
                  We believe fashion is an expression of your unique identity.
                  Our boutique brings together the finest fabrics and
                  unparalleled craftsmanship to create pieces that make you feel
                  truly extraordinary.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    "Expert Custom Tailoring",
                    "Premium Fabric Selection",
                    "Personalized Design Consultations",
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

      {/* ===== FEATURED COLLECTIONS ===== */}
      <section className="py-20 lg:py-28 bg-primary-light/30" id="featured-collections">
        <div className="container-boutique">
          <AnimatedSection>
            <SectionHeading
              title="Featured Collections"
              subtitle="Explore our curated selection of breathtaking designs tailored for every occasion."
            />
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {collections.map((collection, index) => (
              <AnimatedSection key={collection.slug} delay={index * 100}>
                <Link
                  href={`/collections?category=${collection.slug}`}
                  className="group block"
                  id={`collection-${collection.slug}`}
                >
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <h3
                        className="text-white text-lg md:text-xl font-bold mb-1"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {collection.name}
                      </h3>
                      <p className="text-white font-medium text-xs md:text-sm">
                        {collection.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-secondary text-xs font-bold mt-2 group-hover:gap-2 transition-all">
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20 lg:py-28" id="featured-products">
        <div className="container-boutique">
          <AnimatedSection>
            <SectionHeading
              title="Bestselling Pieces"
              subtitle="Our most loved designs, handpicked for their exceptional quality and timeless appeal."
            />
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 100}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link href="/collections" className="btn-secondary">
              View All Collections
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 lg:py-28 bg-secondary/10" id="why-choose-us">
        <div className="container-boutique">
          <AnimatedSection>
            <SectionHeading
              title="Why Choose Us"
              subtitle="We bring your fashion dreams to life with unparalleled craftsmanship, premium materials, and obsessive attention to detail."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {whyChooseUs.map((item, index) => (
              <AnimatedSection key={item.title} delay={index * 100}>
                <div className="text-center p-6 md:p-8 bg-cream rounded-xl card-hover border border-border/30">
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
                  >
                    <item.icon size={24} className="text-white" />
                  </div>
                  <h3
                    className="text-lg font-bold mb-3 text-dark"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-text/70 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 lg:py-28" id="testimonials-preview">
        <div className="container-boutique">
          <AnimatedSection>
            <SectionHeading
              title="What Our Clients Say"
              subtitle="Hear from the women who have trusted us to craft their most important wardrobe pieces."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {topReviews.map((review, index) => (
              <AnimatedSection key={review.id} delay={index * 150}>
                <div className="bg-primary-light/20 rounded-xl p-6 md:p-8 card-hover border border-border/30">
                  {/* Narrative Quote Icon */}
                  <div className="mb-4 text-primary/40">
                    <Quote size={20} fill="currentColor" />
                  </div>
                  <p className="text-sm text-text-light leading-relaxed mb-6 italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                      {review.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-dark">
                        {review.name}
                      </p>
                      <p className="text-xs text-text-light">
                        {review.location}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link href="/reviews" className="btn-secondary">
              Read All Reviews
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

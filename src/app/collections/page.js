"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProductCard from "@/components/products/ProductCard";
import { products, categories, getProductsByCategory } from "@/data/products";
import { SlidersHorizontal } from "lucide-react";


function CollectionsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    let result = getProductsByCategory(activeCategory);

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [activeCategory, sortBy]);

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-cream py-16 lg:py-20" id="collections-hero">
        <div className="container-boutique text-center">
          <AnimatedSection>
            <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
              Our Collections
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold mt-3 mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              Explore Our Collections
            </h1>
            <p className="text-text/70 font-medium max-w-xl mx-auto">
              Discover handcrafted pieces that blend timeless elegance with
              contemporary design.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 lg:py-16 bg-cream" id="product-listing">
        <div className="container-boutique">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2" id="category-filters">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat.slug
                      ? "bg-primary text-white shadow-md"
                      : "bg-primary-light/20 text-text hover:bg-primary/10 border border-primary-light/50"
                  }`}
                  id={`filter-${cat.slug}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-text/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-primary-light/10 border border-primary-light/30 rounded-lg px-3 py-2 text-text focus:outline-none focus:border-primary cursor-pointer transition-colors"
                id="sort-select"
              >
                <option value="default">Sort By: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>

                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm font-bold text-text/70 mb-6 flex items-center gap-2">
            Showing <span className="bg-primary-light/20 text-text px-2.5 py-0.5 rounded-full">{filteredProducts.length}</span> pieces
            {activeCategory !== "all" && (
              <> in <span className="text-primary capitalize font-black">{categories.find(c => c.slug === activeCategory)?.name || activeCategory}</span></>
            )}
          </p>

          {/* Product Grid - 2 columns layout */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <AnimatedSection key={product.id} delay={(index % 4) * 80}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-cream/30 rounded-2xl border border-border/50 mt-8">
              <p className="text-text-light text-lg">No pieces found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="container-boutique py-32 text-center text-dark">Loading collections...</div>}>
      <CollectionsContent />
    </Suspense>
  );
}

"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { categories as staticCategories } from "@/data/products";

function CollectionsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState("default");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    let result = products;

    if (activeCategory !== "all") {
      result = result.filter(p => p.category === activeCategory);
    }

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
  }, [activeCategory, sortBy, products]);

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
            {/* Category Circular Filters */}
            <div className="flex overflow-x-auto pb-4 hide-scrollbar gap-6 md:gap-10 -mx-4 px-4 md:mx-0 md:px-0" id="category-filters">
              {staticCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className="flex flex-col items-center gap-3 transition-all duration-300 group flex-shrink-0"
                  id={`filter-${cat.slug}`}
                >
                  <div className={`relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden border-2 transition-all p-0.5 ${
                    activeCategory === cat.slug
                      ? "border-primary scale-110 shadow-lg shadow-primary/10"
                      : "border-transparent opacity-60 group-hover:opacity-100 group-hover:border-primary/30"
                  }`}>
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeCategory === cat.slug ? "text-primary" : "text-text/60"
                  }`}>
                    {cat.name}
                  </span>
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
              <> in <span className="text-primary capitalize font-black">{staticCategories.find(c => c.slug === activeCategory)?.name || activeCategory}</span></>
            )}
          </p>

          {/* Product Grid - 2 columns layout */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-6 lg:gap-8">
            {loading ? (
              <div className="col-span-full py-20 text-center">
                <Loader2 className="animate-spin mx-auto text-primary mb-4" size={40} />
                <p className="text-text-light italic">Refreshing collection...</p>
              </div>
            ) : filteredProducts.map((product, index) => (
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

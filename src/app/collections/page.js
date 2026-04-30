"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { categories as staticCategories } from "@/data/products";

function CollectionsContent() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortBy, setSortBy] = useState("default");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryParam = searchParams.get("category");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products", { cache: "no-store" }),
          fetch("/api/categories", { cache: "no-store" })
        ]);
        
        const prods = await prodRes.json();
        const cats = await catRes.json();
        
        setProducts(prods);
        setCategories(cats);
        
        if (categoryParam) {
          setActiveCategory(categoryParam);
        } else if (cats.length > 0) {
          setActiveCategory(cats[0].slug);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [categoryParam]);



  useEffect(() => {
    let result = products;

    result = result.filter(p => p.category === activeCategory);

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
      <section className="bg-secondary py-8 lg:py-12" id="collections-hero">
        <div className="container-boutique text-center">
          <AnimatedSection>
            <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
              Our Collections
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold mt-1 mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
            >
              Explore Our Collections
            </h1>
            <p className="text-foreground/70 font-medium max-w-xl mx-auto">
              Discover handcrafted pieces that blend timeless elegance with
              contemporary design.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-8 lg:py-12 bg-background min-h-[60vh] border-t border-white/10" id="product-listing">
        <div className="container-boutique">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2" id="category-filters">
              {categories.map((cat) => (
                <button
                  key={cat.id || cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-black uppercase tracking-wider transition-all duration-300 ${
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
                className="text-xs bg-white border border-border rounded-lg px-3 py-2 text-text focus:outline-none focus:border-primary cursor-pointer transition-colors"
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
          <p className="text-sm font-bold text-text/70 mb-4 flex items-center gap-2">
            Showing <span className="bg-white border border-border text-text px-2.5 py-0.5 rounded-full">{filteredProducts.length}</span> pieces
            in <span className="text-primary capitalize font-black">{categories.find(c => c.slug === activeCategory)?.name || activeCategory}</span>
          </p>

          {/* Product Grid - 2 col mobile, 4-5 col desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
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
            <div className="text-center py-20 bg-white rounded-2xl border border-border mt-8">
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

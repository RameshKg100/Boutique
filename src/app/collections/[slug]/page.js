"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/products/ProductCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/siteConfig";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
  X,
  Ruler,
  Loader2
} from "lucide-react";

const sizeChart = {
  headers: ["Size", "Bust (in)", "Waist (in)", "Hip (in)", "Length (in)"],
  rows: [
    ["XS", "32", "26", "34", "52"],
    ["S", "34", "28", "36", "53"],
    ["M", "36", "30", "38", "54"],
    ["L", "38", "32", "40", "55"],
    ["XL", "40", "34", "42", "56"],
    ["XXL", "42", "36", "44", "57"],
  ],
};

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        const found = data.find(p => p.slug === params.slug);
        
        if (found) {
          setProduct(found);
          const related = data
            .filter(p => p.id !== found.id && p.category === found.category)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container-boutique py-40 text-center">
        <Loader2 className="animate-spin mx-auto text-primary mb-4" size={48} />
        <p className="text-text-light italic">Adorning the view...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-boutique py-32 text-center">
        <h1 className="text-2xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Product Not Found
        </h1>
        <p className="text-text-light mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/collections" className="btn-primary">
          Browse Collections
        </Link>
      </div>
    );
  }

  const discount = getDiscountPercentage(product.originalPrice, product.price);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hello! I have a query regarding a dress from ${siteConfig.name}.

Product: ${product.name}

My Name: 
Location: 
Mobile Number: 
My Query: `;
    const url = `https://wa.me/${siteConfig.contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-cream/50 py-3">
        <div className="container-boutique">
          <nav className="flex items-center gap-2 text-xs text-text-light">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/collections" className="hover:text-primary transition-colors">Collections</Link>
            <ChevronRight size={12} />
            <Link href={`/collections?category=${product.category}`} className="hover:text-primary transition-colors capitalize">
              {product.category}
            </Link>
            <ChevronRight size={12} />
            <span className="text-dark font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 lg:py-24 min-h-[75vh]" id="product-detail">
        <div className="container-boutique">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <AnimatedSection animation="slide-in-left">
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-cream">
                  <Image
                    src={product.images[selectedImage]}
                    alt={`${product.name} - View ${selectedImage + 1}`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-primary shadow-md"
                          : "border-transparent hover:border-border"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Product Info */}
            <AnimatedSection animation="slide-in-right">
              <div>
                <p className="text-primary text-xs uppercase tracking-[0.2em] font-medium mb-2">
                  {product.category}
                </p>
                <h1
                  className="text-2xl md:text-3xl lg:text-4xl font-black text-text mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {product.name}
                </h1>


                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl md:text-4xl font-black text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-text/50 font-bold line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    </>
                  )}
                </div>

                <div className="elegant-divider mb-6" />

                {/* Description */}
                <p className="text-text/70 font-medium leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Colors */}
                {product.colors && (
                  <div className="mb-6">
                    <p className="text-sm font-medium text-dark mb-2">
                      Available Colors: <span className="text-text-light font-normal">{product.colors.join(", ")}</span>
                    </p>
                  </div>
                )}

                {/* Size Selector */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-dark">Select Size</p>
                    <button
                      onClick={() => setShowSizeChart(true)}
                      className="text-xs text-primary hover:text-primary-dark flex items-center gap-1 transition-colors"
                      id="size-chart-toggle"
                    >
                      <Ruler size={12} />
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] h-10 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-primary text-white shadow-md"
                            : "bg-cream text-dark border border-border hover:border-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <p className="text-sm font-medium text-dark mb-3">Quantity</p>
                  <div className="flex items-center gap-0 border border-border rounded-lg w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-dark hover:bg-cream transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center text-sm font-medium border-x border-border">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-dark hover:bg-cream transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 rounded-lg text-sm font-medium uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                      addedToCart
                        ? "bg-green-600 text-white"
                        : "bg-primary text-white hover:bg-primary-dark hover:shadow-lg"
                    }`}
                    id="add-to-cart-btn"
                  >
                    <ShoppingBag size={16} />
                    {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-300 border ${
                      wishlisted
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-dark border-border hover:border-primary hover:text-primary"
                    }`}
                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    id="add-to-wishlist-btn"
                  >
                    <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* WhatsApp Button */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3.5 px-6 rounded-lg text-sm font-medium uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600 hover:shadow-lg mb-8"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
                  </svg>
                  Enquire on WhatsApp
                </button>


              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream/50" id="related-products">
          <div className="container-boutique">
            <AnimatedSection>
              <SectionHeading
                title="You May Also Like"
                subtitle="Explore more designs from this collection."
              />
            </AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, index) => (
                <AnimatedSection key={p.id} delay={index * 100}>
                  <ProductCard product={p} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowSizeChart(false)}>
          <div className="bg-white rounded-xl max-w-lg w-full p-6 md:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowSizeChart(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream flex items-center justify-center hover:bg-rose transition-colors"
            >
              <X size={16} />
            </button>
            <h3
              className="text-xl font-bold text-dark mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Size Guide
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {sizeChart.headers.map((header) => (
                      <th
                        key={header}
                        className="text-left py-2 px-3 bg-cream text-dark font-medium text-xs uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.rows.map((row, i) => (
                    <tr key={i} className="border-b border-border/50">
                      {row.map((cell, j) => (
                        <td key={j} className={`py-2.5 px-3 text-sm ${j === 0 ? "font-medium text-dark" : "text-text-light"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-light mt-4">
              * Measurements are in inches. For the best fit, we recommend getting measured by our tailoring experts.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

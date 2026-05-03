"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { siteConfig } from "@/data/siteConfig";
import { formatPrice, getDiscountPercentage } from "@/lib/utils";

export default function ProductCard({ product, onZoom }) {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const discount = getDiscountPercentage(product.originalPrice, product.price);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[1] || product.sizes[0]);
  };

  const handleZoom = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onZoom) onZoom(product.images[0]);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link
      href={`/collections/${product.slug}`}
      className="group block"
      id={`product-card-${product.slug}`}
    >
      <div className="card-hover bg-background rounded-lg overflow-hidden border border-border/10">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-background">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-primary text-white text-[10px] px-2.5 py-1 rounded-md font-medium uppercase tracking-wider shadow-sm">
                New
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm ${
              wishlisted
                ? "bg-primary text-white"
                : "bg-white text-text hover:bg-primary hover:text-white"
            }`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={14} fill={wishlisted ? "currentColor" : "none"} />
          </button>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-white/40 group-hover:bg-white/60 transition-all duration-500 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="bg-white text-text hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5 shadow-lg"
              >
                <ShoppingBag size={13} />
                Add to Cart
              </button>
              <button
                onClick={handleZoom}
                className="bg-white text-text hover:bg-primary hover:text-white px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center shadow-lg group/zoom"
              >
                <Eye size={13} className="group-hover/zoom:scale-125 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-3 md:p-4">
          <p className="text-[10px] text-primary-dark uppercase tracking-wider mb-1 font-medium">
            {product.category}
          </p>
          <h3
            className="text-sm md:text-base font-bold text-text mb-1.5 line-clamp-1 group-hover:text-primary transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm md:text-base font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-text/50 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>


        </div>
      </div>
    </Link>
  );
}

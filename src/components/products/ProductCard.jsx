"use client";

import { useState } from "react";
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
  const [addedToCart, setAddedToCart] = useState(false);
  const discount = getDiscountPercentage(product.originalPrice, product.price);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[1] || product.sizes[0], "");
    setAddedToCart(true);
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
            {product.inStock === false && (
              <span className="bg-red-500 text-white text-[10px] px-2.5 py-1 rounded-md font-medium uppercase tracking-wider shadow-sm">
                Out of Stock
              </span>
            )}
            {(product.offerPercentage || discount > 0) && (
              <span className="bg-orange-500 text-white text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider shadow-sm">
                {product.offerPercentage ? `${product.offerPercentage}% OFF` : `${discount}% OFF`}
              </span>
            )}
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-white/40 group-hover:bg-white/60 transition-all duration-500 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              {product.inStock === false ? (
                <div className="bg-white text-red-500 px-4 py-2 rounded-lg text-xs font-bold flex items-center shadow-lg">
                  Out of Stock
                </div>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1.5 shadow-lg ${
                    addedToCart
                      ? "bg-green-600 text-white opacity-80 cursor-not-allowed"
                      : "bg-white text-text hover:bg-primary hover:text-white"
                  }`}
                >
                  <ShoppingBag size={13} />
                  {addedToCart ? "Added" : "Add to Cart"}
                </button>
              )}
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

"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import { Trash2, ShoppingBag, Eye, Heart } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container-boutique py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-cream rounded-2xl flex items-center justify-center mb-6">
          <Heart size={32} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-heading)" }}>Your Wishlist is Empty</h1>
        <p className="text-text-light mb-8 max-w-md">Save your favorite boutique pieces here and come back to them anytime.</p>
        <Link href="/collections" className="btn-primary">
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-cream py-16 lg:py-24" id="wishlist-header">
        <div className="container-boutique text-center">
          <AnimatedSection>
             <h1
              className="text-3xl md:text-4xl font-bold mb-2 text-dark"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              My Wishlist
            </h1>
            <p className="text-text-light text-sm">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 lg:py-24 min-h-[70vh]" id="wishlist-content">
        <div className="container-boutique">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((item, index) => (
              <AnimatedSection key={item.id} delay={(index % 4) * 80}>
                <div className="group block relative">
                  <div className="card-hover bg-white rounded-lg overflow-hidden border border-border/50">
                    <Link href={`/collections/${item.slug}`} className="relative aspect-[9/16] overflow-hidden bg-cream block">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      
                      {/* Hover Overlay Removed */}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none" />
                    </Link>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 text-text-light rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all duration-300 shadow-sm z-10"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="p-3 md:p-4">
                      <p className="text-[10px] text-text-light uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <Link href={`/collections/${item.slug}`}>
                         <h3
                           className="text-sm md:text-base font-medium text-dark mb-1.5 line-clamp-1 group-hover:text-primary transition-colors"
                           style={{ fontFamily: "var(--font-heading)" }}
                         >
                           {item.name}
                         </h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm md:text-base font-semibold text-primary">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-text-light line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      {/* Removed Select Options button */}
                    </div>
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

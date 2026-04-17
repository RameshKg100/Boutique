"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Menu, X, ShoppingBag, Heart, User } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-cream border-b border-border/20 w-full shadow-sm">
        <div className="container-boutique">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <div className="flex-1 flex lg:hidden">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 -ml-2 text-text hover:text-primary transition-colors"
                aria-label="Toggle menu"
                id="mobile-menu-toggle"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
              <Link href="/" className="flex items-center gap-3" id="brand-logo">
                <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-lg">
                  <Image 
                    src="/logo.png" 
                    alt="Sashaa Boutiques Logo" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col items-start whitespace-nowrap">
                  <span
                    className="text-xl md:text-2xl font-bold tracking-wide leading-tight"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-primary)",
                    }}
                  >
                    Sashaa
                  </span>
                  <span
                    className="text-[10px] md:text-xs tracking-[0.3em] uppercase leading-tight"
                    style={{ color: "var(--color-warm-gray)" }}
                  >
                    Boutiques
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 justify-center items-center gap-8" id="desktop-nav">
              {siteConfig.navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm tracking-wide transition-colors duration-300 font-bold ${
                    pathname === link.href ? "text-primary" : "text-text hover:text-primary"
                  }`}
                >
                  {link.name}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex-1 lg:flex-none flex justify-end items-center gap-2 md:gap-3">
              <Link
                href="/wishlist"
                className="relative p-2 text-text hover:text-primary transition-colors"
                id="wishlist-icon"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 right-0 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="relative p-2 text-text hover:text-primary transition-colors"
                id="cart-icon"
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 right-0 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/admin"
                className="p-2 text-text hover:text-primary transition-colors ml-1 border border-primary/10 rounded-full hover:bg-primary/5"
                id="admin-login-icon"
                aria-label="Admin Login"
              >
                <User size={20} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 lg:hidden ${
          isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-screen w-[280px] bg-cream z-[60] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="mobile-menu-drawer"
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 overflow-hidden rounded-md text-dark">
                <Image 
                  src="/logo.png" 
                  alt="Sashaa Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
              <span
                className="text-xl font-bold"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-primary)",
                }}
              >
                Sashaa
              </span>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 -mr-2 text-dark hover:text-primary"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-1">
            {siteConfig.navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-3 px-4 rounded-lg text-sm tracking-wide transition-all font-bold block ${
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-text hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-border">
            <Link
              href="/admin"
              className="flex items-center gap-3 py-3 px-4 rounded-lg text-sm tracking-wide transition-all font-bold text-primary hover:bg-primary-light"
              onClick={() => setIsMobileOpen(false)}
            >
              <User size={18} />
              Admin Portal / Login
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 text-xs text-text-light space-y-2 pb-8">
            <p>{siteConfig.contact.phone}</p>
            <p>{siteConfig.contact.email}</p>
          </div>
        </div>
      </div>
    </>
  );
}

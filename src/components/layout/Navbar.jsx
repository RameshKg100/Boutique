"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Menu, X, ShoppingBag, Heart, User, Home, Info, Layers, Star, Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const getNavIcon = (name) => {
    switch(name) {
      case "Home": return <Home size={18} />;
      case "About Us": return <Info size={18} />;
      case "Collections": return <Layers size={18} />;
      case "Reviews": return <Star size={18} />;
      case "Contact": return <Phone size={18} />;
      default: return null;
    }
  };
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
      <header className="sticky top-0 z-40 bg-background border-b border-border/10 w-full shadow-sm">
        <div className="container-boutique">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <div className="flex-1 flex lg:hidden">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 -ml-2 text-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
                id="mobile-menu-toggle"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Logo */}
            <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
              <Link href="/" className="flex items-center gap-4" id="brand-logo">
                <div className="relative w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-xl bg-white shadow-sm border border-primary/5 p-1">
                  <Image 
                    src="/logo.png" 
                    alt="Sathyas Boutique Logo" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col items-start whitespace-nowrap">
                  <span
                    className="text-2xl md:text-4xl font-black tracking-tight leading-none"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-primary)",
                    }}
                  >
                    Sathyas
                  </span>
                  <span
                    className="text-[11px] md:text-sm tracking-[0.4em] uppercase leading-none mt-1 font-bold"
                    style={{ color: "var(--foreground)" }}
                  >
                    Boutique
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
                    pathname === link.href ? "text-primary" : "text-foreground hover:text-primary"
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
                className="relative p-2 text-foreground hover:text-primary transition-colors"
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
                className="relative p-2 text-foreground hover:text-primary transition-colors"
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
                href="/admin/login"
                className="p-2 text-foreground hover:text-primary transition-colors border-l border-border/10 ml-1 pl-3"
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
        className={`fixed top-0 left-0 h-screen w-[280px] bg-background z-[60] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        id="mobile-menu-drawer"
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 overflow-hidden rounded-md text-foreground">
                <Image 
                  src="/logo.png" 
                  alt="Sathyas Boutique Logo" 
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
                Sathyas Boutique
              </span>
            </div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 -mr-2 text-foreground hover:text-primary"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-2 mt-2">
            {siteConfig.navigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block"
                style={{
                  padding: '14px 20px',
                  borderRadius: '14px',
                  fontSize: '15px',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.25s ease',
                  background: pathname === link.href
                    ? 'rgba(197, 107, 138, 0.15)'
                    : 'transparent',
                  color: pathname === link.href ? 'var(--color-primary)' : 'var(--foreground)',
                  boxShadow: pathname === link.href
                    ? '0 2px 8px rgba(197, 107, 138, 0.12)'
                    : 'none',
                }}
              >
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  opacity: pathname === link.href ? 1 : 0.6,
                }}>
                  {getNavIcon(link.name)}
                </span>
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Admin link removed from public menu as per request */}

          {/* Contact Info removed for mobile/tablet as per request */}
        </div>
      </div>
    </>
  );
}

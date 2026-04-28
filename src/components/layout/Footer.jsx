"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const Instagram = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Facebook = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Youtube = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;

export default function Footer() {
  return (
    <footer className="bg-secondary text-foreground border-t border-border/20" id="main-footer">
      <div className="container-boutique py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Column 1: Brand Identity */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl bg-white shadow-sm border border-primary/10 p-1">
                <img src="/logo.png" alt="Sashaa Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                  <h3 className="text-xl font-bold text-primary leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    Sashaa Boutiques
                  </h3>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-primary-dark font-bold mt-0.5">
                    Timeless Elegance
                  </p>
                </div>
              </div>
              <p className="text-sm tracking-wide leading-relaxed text-foreground/80 font-medium">
                A sanctuary of refined taste in Chennai. We craft more than just fashion; we craft the confidence that comes with artisanal care.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
                  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
                  { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary text-foreground hover:text-white transition-all duration-300 shadow-sm"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Discover */}
            <div className="space-y-8">
              <h3 className="text-lg font-black uppercase tracking-[0.2em] text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                Discover
              </h3>
              <nav className="flex flex-col gap-4">
                {siteConfig.navigation.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-sm tracking-wide text-foreground/70 hover:text-primary transition-colors font-medium group"
                  >
                    <ChevronRight size={14} className="text-primary/20 group-hover:text-primary transition-colors" />
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Collections */}
            <div className="space-y-8">
              <h3 className="text-lg font-black uppercase tracking-[0.2em] text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                Collections
              </h3>
              <nav className="flex flex-col gap-4">
                {[
                  { name: "Silk Maxis", href: "/collections?category=maxis" },
                  { name: "Designer Sarees", href: "/collections?category=sarees" },
                  { name: "Premium Tops", href: "/collections?category=tops" },
                  { name: "Elegant Kurtis", href: "/collections?category=kurtis" }
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 text-sm tracking-wide text-foreground/70 hover:text-primary transition-colors font-medium group"
                  >
                    <ChevronRight size={14} className="text-primary/20 group-hover:text-primary transition-colors" />
                    {item.name}
                  </Link>
                ))}
                <Link href="/collections" className="text-sm tracking-wide text-primary font-bold hover:underline w-fit mt-2 italic flex items-center gap-1">
                  <ChevronRight size={14} />
                  View Collections
                </Link>
              </nav>
            </div>

            {/* Column 4: Reach Us */}
            <div className="space-y-8">
              <h3 className="text-lg font-black uppercase tracking-[0.2em] text-primary" style={{ fontFamily: "var(--font-heading)" }}>
                Reach Us
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm tracking-wide text-foreground/80 font-medium leading-relaxed">
                    {siteConfig.contact.address}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors font-medium">
                    <Phone size={18} className="text-primary" />
                    {siteConfig.contact.phone}
                  </a>
                  <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors font-medium">
                    <Mail size={18} className="text-primary" />
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div className="pt-4 border-t border-border/20">
                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-xs tracking-wide text-foreground/60 font-medium italic">
                      {siteConfig.contact.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright Only */}
        <div className="border-t border-border/10">
          <div className="container-boutique py-12 text-center">
            <p className="text-xs font-bold tracking-widest uppercase text-foreground/40">
              © 2026 Sasha boutique. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
}

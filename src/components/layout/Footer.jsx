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
                <img src="/logo.png" alt="Sathyas Boutique Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                  <h3 className="text-xl font-bold text-primary leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                    Sathyas Boutique
                  </h3>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-primary-dark font-bold mt-0.5">
                    Timeless Elegance
                  </p>
                </div>
              </div>
              <p className="text-sm tracking-wide leading-relaxed text-foreground/80 font-medium">
                Our Sathyas Boutique offers elegant and easy-to-wear fashion. Our collections are carefully selected to bring you comfort, quality, and a touch of style in every outfit.
              </p>
              <div className="flex gap-3 pt-2">
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-all shadow-sm">
                  <Instagram size={18} />
                </a>
                <a href={`https://wa.me/${siteConfig.contact.phone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:bg-[#128C7E] transition-all shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
                  </svg>
                </a>
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
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright Only */}
        <div className="border-t border-border/10">
          <div className="container-boutique py-12 text-center">
            <p className="text-xs font-bold tracking-widest uppercase text-foreground/40">
              © 2026 Sathyas Boutique. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  );
}

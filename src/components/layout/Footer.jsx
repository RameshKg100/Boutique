"use client";

import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";

const Instagram = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Facebook = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Youtube = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white/90">
      {/* Main Footer */}
      <div className="container-boutique py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div>
            <div className="mb-6">
              <span
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Sashaa
              </span>
              <span className="block text-xs md:text-sm tracking-[0.3em] uppercase text-primary-light mt-1">
                Boutiques
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60 mb-6">
              Crafting elegant, custom fashion that empowers and inspires women
              to embrace their unique style. Premium collections curated from
              the heart of Chennai.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                aria-label="Instagram"
                id="footer-instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                aria-label="Facebook"
                id="footer-facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md border border-white/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                aria-label="YouTube"
                id="footer-youtube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-white text-lg font-bold uppercase tracking-[0.1em] mb-7"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Quick Links
            </h3>
            <nav className="space-y-3">
              {siteConfig.navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-primary transition-colors group"
                >
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                  {link.name}
                </Link>
              ))}
              <Link
                href="/collections"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-secondary transition-colors group"
              >
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform"
                />
                Shop All
              </Link>
            </nav>
          </div>

          {/* Contact Us */}
          <div>
            <h3
              className="text-white text-lg font-bold uppercase tracking-[0.1em] mb-7"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin
                  size={16}
                  className="text-secondary mt-1 flex-shrink-0"
                />
                <p className="text-sm text-white/60">
                  {siteConfig.contact.address}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={16} className="text-secondary flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-sm text-white/60 hover:text-secondary transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={16} className="inline opacity-0 w-0" /> {/* Spacer */}
                <a
                  href={`tel:${siteConfig.contact.phone2}`}
                  className="text-sm text-white/60 hover:text-secondary transition-colors"
                >
                  {siteConfig.contact.phone2}
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail size={16} className="text-secondary flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-white/60 hover:text-secondary transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex gap-3">
                <Clock
                  size={16}
                  className="text-secondary mt-1 flex-shrink-0"
                />
                <p className="text-sm text-white/60">
                  {siteConfig.contact.hours}
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="text-white text-sm font-semibold uppercase tracking-wider mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Newsletter
            </h3>
            <p className="text-sm text-white/60 mb-4">
              Subscribe to get the latest updates on our collections and
              exclusive offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-0"
              id="newsletter-form"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder-white/40 rounded-l focus:outline-none focus:border-secondary"
                id="newsletter-email"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark px-4 py-2.5 text-sm font-medium rounded-r transition-colors"
                id="newsletter-submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-boutique py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {currentYear} Sashaa Boutiques. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { siteConfig } from "@/data/siteConfig";
import { submitContactForm } from "@/lib/supabase";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Instagram = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Facebook = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const WhatsApp = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    subject: "General Enquiry",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Construct WhatsApp message
    const message = `Hello Sathyas Boutique!
    
*New Enquiry from Website*
--------------------------
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || "Not provided"}
*Location:* ${formData.location}
*Subject:* ${formData.subject}
*Message:* ${formData.message}

--------------------------
Sent via Sathyas Boutique Website`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${siteConfig.contact.phone.replace(/\D/g, '')}?text=${encodedMessage}`;

    // Small delay for better UX
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        subject: "General Enquiry",
        message: "",
      });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1000);
  };

  return (
    <>
      <section className="bg-cream py-16 lg:py-20" id="contact-hero">
        <div className="container-boutique text-center">
          <AnimatedSection>
            <span className="text-primary text-xs uppercase tracking-[0.2em] font-medium">
              Get In Touch
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold mt-1 mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              Contact Us
            </h1>
            <p className="text-text-light max-w-xl mx-auto">
              We&apos;d love to hear from you! Reach out for orders, queries, or support. Our team is here to help with all your dress-related needs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 lg:py-18 bg-white border-t border-border/10" id="contact-content">
        <div className="container-boutique">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {/* Contact Info & Map */}
            <AnimatedSection animation="slide-in-left">
              <h2
                className="text-2xl md:text-3xl font-bold text-dark mb-8"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Visit Our Boutique
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-dark mb-1 uppercase tracking-wider">Address</h3>
                    <p className="text-text-light text-sm leading-relaxed">{siteConfig.contact.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-dark mb-1 uppercase tracking-wider">Phone</h3>
                    <p className="text-text-light text-sm">{siteConfig.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-dark mb-1 uppercase tracking-wider">Email</h3>
                    <p className="text-text-light text-sm">{siteConfig.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-dark mb-1 uppercase tracking-wider">Hours</h3>
                    <p className="text-text-light text-sm">{siteConfig.contact.hours}</p>
                  </div>
                </div>
              </div>

              {/* Social Links block */}
               <div className="mb-10">
                  <h3 className="text-sm font-bold text-dark mb-4 uppercase tracking-wider">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-none bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-all">
                      <Instagram size={20} />
                    </a>
                    <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-none bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-all">
                      <Facebook size={20} />
                    </a>
                    <a href={`https://wa.me/${siteConfig.contact.phone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-none bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-all">
                      <WhatsApp size={20} />
                    </a>
                  </div>
               </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden shadow-sm border border-border bg-gray-100 h-[300px]">
                <iframe
                  src={siteConfig.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Boutique Location Map"
                />
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection animation="slide-in-right">
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-border/50 shadow-sm shadow-rose/20">
                <h2
                  className="text-2xl md:text-3xl font-bold text-dark mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Send us a Message
                </h2>
                <p className="text-sm text-text-light mb-8">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                {status === "success" && (
                  <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 text-sm flex items-center gap-2">
                    <span className="font-bold">✓ Success!</span> Opening WhatsApp to send your message...
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-semibold text-dark uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-cream border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-dark uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-cream border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-semibold text-dark uppercase tracking-wider">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-cream border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="location" className="text-xs font-semibold text-dark uppercase tracking-wider">Location</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-cream border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Enter your city/area"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-semibold text-dark uppercase tracking-wider">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-cream border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Order Status Follow up">Order Status Follow up</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-dark uppercase tracking-wider">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-cream border border-border/50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Let us know how we can help you (e.g., size inquiry, order status, or custom design request)..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary w-full justify-center py-4"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center gap-2">Connecting to WhatsApp...</span>
                    ) : (
                      <span className="flex items-center gap-2">Send via WhatsApp <WhatsApp size={16} /></span>
                    )}
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

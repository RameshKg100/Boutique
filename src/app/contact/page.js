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
                    <a 
                      href={siteConfig.social.instagram} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-12 h-12 rounded-lg text-white flex items-center justify-center hover:opacity-80 transition-all shadow-sm"
                      style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
                    >
                      <Instagram size={20} />
                    </a>
                    <a href={`https://wa.me/${siteConfig.contact.phone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:bg-[#128C7E] transition-all shadow-sm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
                      </svg>
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

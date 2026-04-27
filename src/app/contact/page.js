"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { siteConfig } from "@/data/siteConfig";
import { submitContactForm } from "@/lib/supabase";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Instagram = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Facebook = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Youtube = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

    // Implement actual submission here if connected to backend.
    // Simulating delay for now.
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Enquiry",
        message: "",
      });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
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
              We&apos;re here to help styling your dream outfit. Reach out to us for
              consultations, appointments, or general enquiries.
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
                    <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-md border border-border flex items-center justify-center text-dark hover:text-pink-500 hover:border-pink-500 hover:bg-pink-50 transition-all">
                      <Instagram size={20} />
                    </a>
                    <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-md border border-border flex items-center justify-center text-dark hover:text-pink-500 hover:border-pink-500 hover:bg-pink-50 transition-all">
                      <Facebook size={20} />
                    </a>
                    <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-md border border-border flex items-center justify-center text-dark hover:text-pink-500 hover:border-pink-500 hover:bg-pink-50 transition-all">
                      <Youtube size={20} />
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
                  <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 text-sm flexitems-center gap-2">
                    <span className="font-bold">✓ Success!</span> Your message has been sent successfully. We will contact you soon.
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
                        placeholder="Jane Doe"
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
                        placeholder="jane@example.com"
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
                        placeholder="+91 9976474102"
                      />
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
                        <option value="Styling Consultation">Styling Consultation</option>
                        <option value="Custom Tailoring">Custom Tailoring Request</option>
                        <option value="Order Status">Order Status</option>
                      </select>
                    </div>
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
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary w-full justify-center py-4"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center gap-2">Processing...</span>
                    ) : (
                      <span className="flex items-center gap-2">Send Message <Send size={16} /></span>
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

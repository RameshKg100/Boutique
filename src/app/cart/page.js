"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, QrCode, X } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/siteConfig";

export default function CartPage() {
  const { items, updateQuantity, removeItem, cartTotal, clearCart } = useCart();
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  
  // New Shipping Calculation Logic
  const getShippingFee = (qty) => {
    if (qty === 0) return 0;
    if (qty === 1) return 70;
    if (qty === 2) return 100;
    return 140; // 3 or more items
  };

  const shipping = getShippingFee(totalQuantity);
  const total = cartTotal + shipping;
  
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Info, 2: Payment
  const [paymentStatus, setPaymentStatus] = useState("Not Paid");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUPIPicker, setShowUPIPicker] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", addressLine1: "", addressLine2: "", landmark: "", city: "", state: "", pincode: "", paymentMode: "" });
  const [settings, setSettings] = useState({ paymentQRCode: "" });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    }
    fetchSettings();
  }, []);

  const proceedToPayment = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.addressLine1 || !customerInfo.city || !customerInfo.state || !customerInfo.pincode || !customerInfo.paymentMode) {
      alert("Please fill in all required details including Payment Mode to proceed.");
      return;
    }
    setCheckoutStep(2);
  };

  const handleWhatsAppCheckout = async () => {
    setIsSubmitting(true);
    const finalStatus = "Paid";

    try {
      const fullAddress = `${customerInfo.addressLine1}${customerInfo.addressLine2 ? ', ' + customerInfo.addressLine2 : ''}${customerInfo.landmark ? ', ' + customerInfo.landmark : ''}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pincode}`;
      
      // 1. Save the order to Supabase
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          customerLocation: fullAddress,
          paymentMode: customerInfo.paymentMode,
          paymentStatus: finalStatus,
          items: items,
          totalAmount: total,
        }),
      });

      // 2. Format WhatsApp Message
      const phoneNumber = siteConfig.contact.phone.replace(/[^0-9]/g, "");
      
      let message = "*Order Confirmation from Sathyas Boutique*\n\n";
      
      message += `*Payment Status: ✅ Paid*\n\n`;

      message += "*Customer Details:*\n";
      message += `Name: ${customerInfo.name}\n`;
      message += `Phone: ${customerInfo.phone}\n`;
      message += `Location: ${fullAddress}\n`;
      message += `Payment Mode: ${customerInfo.paymentMode}\n\n`;

      message += "*Items:*\n";
      
      items.forEach((item) => {
        message += `- ${item.name}\n  Size: ${item.size} | Qty: ${item.quantity} | Price: ${formatPrice(item.price * item.quantity)}\n`;
        if (item.slug) {
          const productUrl = `${window.location.origin}/collections/${item.slug}`;
          message += `  Link: ${productUrl}\n`;
        }
      });
      
      message += `\n*Summary:*\n`;
      message += `Subtotal: ${formatPrice(cartTotal)}\n`;
      message += `Shipping: ${shipping === 0 ? "Free" : formatPrice(shipping)}\n`;
      message += `*Total: ${formatPrice(total)}*\n\n`;
      
      message += "Thank you! I have completed the payment. Please process my order.";
      
      // 3. Redirect to WhatsApp and clear cart
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      
      clearCart();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-boutique py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-cream rounded-2xl flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-heading)" }}>Your Cart is Empty</h1>
        <p className="text-text-light mb-8 max-w-md">Looks like you haven&apos;t added any gorgeous pieces to your cart yet.</p>
        <Link href="/collections" className="btn-primary">
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-cream py-16 lg:py-24" id="cart-header">
        <div className="container-boutique text-center">
          <AnimatedSection>
             <h1
              className="text-3xl md:text-4xl font-bold mb-2 text-dark"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Shopping Cart
            </h1>
            <p className="text-text-light text-sm">Review your selected items</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 lg:py-24 min-h-[70vh]" id="cart-content">
        <div className="container-boutique">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Cart Items */}
            <div className="w-full lg:w-2/3">
              <AnimatedSection>
                <div className="bg-cream border text-left border-border/50 rounded-xl overflow-hidden text-sm uppercase text-text/60 font-semibold tracking-wider p-4 hidden md:flex items-center">
                   <div className="flex-1">Product Details</div>
                   <div className="w-24 text-center">Price</div>
                   <div className="w-32 text-center">Quantity</div>
                   <div className="w-24 text-right">Total</div>
                   <div className="w-10"></div>
                </div>

                <div className="mt-4 space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="bg-cream border border-border/40 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 group shadow-sm transition-shadow hover:shadow-md">
                      
                      {/* Product details */}
                      <div className="flex flex-1 items-start md:items-center gap-4">
                         <Link href={`/collections/${item.slug}`} className="relative aspect-[9/16] w-20 md:w-24 flex-shrink-0 rounded-lg overflow-hidden bg-white/50 border border-border/10 shadow-sm">
                           <Image src={item.image} alt={item.name} fill className="object-cover" sizes="100px" />
                         </Link>
                         <div>
                            <Link href={`/collections/${item.slug}`} className="text-base font-bold text-text hover:text-primary transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                               {item.name}
                            </Link>
                            <p className="text-xs text-text/60 uppercase tracking-wider mt-1 mb-2">Size: {item.size}</p>
                         </div>
                      </div>

                      {/* Controls Row (Mobile) / Columns (Desktop) */}
                      <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-none border-border/40">
                          <div className="w-24 text-left md:text-center text-sm font-medium hidden md:block text-text">
                             {formatPrice(item.price)}
                          </div>
                           
                          <div className="w-32 flex justify-start md:justify-center">
                            <div className="flex items-center border border-border rounded-lg bg-white overflow-hidden h-9">
                              <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="w-8 h-full flex items-center justify-center text-text hover:bg-cream transition-colors">
                                <Minus size={12} />
                              </button>
                              <span className="w-10 text-center text-xs font-semibold text-text">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="w-8 h-full flex items-center justify-center text-text hover:bg-cream transition-colors">
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>

                          <div className="w-24 text-right text-sm font-bold text-primary">
                             {formatPrice(item.price * item.quantity)}
                          </div>
                           
                          <div className="w-10 flex justify-end">
                             <button onClick={() => removeItem(item.id, item.size, item.color)} className="text-text/40 hover:text-red-500 transition-colors p-2" aria-label="Remove item">
                               <Trash2 size={18} />
                             </button>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-1/3">
              <AnimatedSection delay={200} className="sticky top-28 bg-cream border border-border/50 rounded-xl p-6 lg:p-8 shadow-sm">
                 <h2 className="text-lg font-bold text-text mb-6 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Order Summary</h2>
                               <div className="space-y-4 mb-6">
                   <div className="flex items-center justify-between text-sm">
                     <span className="text-text/60">Subtotal</span>
                     <span className="font-medium text-text">{formatPrice(cartTotal)}</span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                     <span className="text-text/60">Shipping</span>
                     <span className={`font-medium ${shipping === 0 ? "text-green-600" : "text-text"}`}>
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                     </span>
                   </div>
                   {shipping > 0 && (
                     <p className="text-[10px] text-primary italic leading-tight">
                       A mandatory shipping charge of ₹50 applies for single-item orders.
                     </p>
                   )}
                 </div>

                 <div className="border-t border-border/50 pt-4 mb-8">
                   <div className="flex items-center justify-between">
                     <span className="font-bold text-text uppercase tracking-wider text-sm">Total</span>
                     <span className="font-bold text-xl text-primary">{formatPrice(total)}</span>
                   </div>
                   <p className="text-[10px] text-text/40 mt-1 text-right">Local taxes included</p>
                 </div>

                 {!showCheckoutForm ? (
                   <button 
                     onClick={() => setShowCheckoutForm(true)}
                     className="btn-primary w-full justify-center py-3.5 mb-4"
                   >
                      PROCEED TO CHECKOUT [ VIA WHATSAPP]
                   </button>
                 ) : checkoutStep === 1 ? (
                   <form onSubmit={proceedToPayment} className="space-y-3 mb-4 text-left border border-border/20 bg-white p-4 rounded-xl shadow-sm">
                      <p className="text-sm font-bold text-dark mb-2" style={{ fontFamily: "var(--font-heading)" }}>Step 1: Delivery Details</p>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        className="w-full text-sm p-2.5 rounded-lg border border-border/50 bg-white focus:outline-none focus:border-primary"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Mobile Number"
                        className="w-full text-sm p-2.5 rounded-lg border border-border/50 bg-white focus:outline-none focus:border-primary"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      />
                      <div className="space-y-3">
                        <input
                          type="text"
                          required
                          placeholder="Address Line 1 (House/Flat no, Building)"
                          className="w-full text-sm p-2.5 rounded-lg border border-border/50 bg-white focus:outline-none focus:border-primary"
                          value={customerInfo.addressLine1}
                          onChange={(e) => setCustomerInfo({...customerInfo, addressLine1: e.target.value})}
                        />
                        <input
                          type="text"
                          placeholder="Address Line 2 (Street name, Area) - Optional"
                          className="w-full text-sm p-2.5 rounded-lg border border-border/50 bg-white focus:outline-none focus:border-primary"
                          value={customerInfo.addressLine2}
                          onChange={(e) => setCustomerInfo({...customerInfo, addressLine2: e.target.value})}
                        />
                        <input
                          type="text"
                          placeholder="Landmark (Near temple, etc.) - Optional"
                          className="w-full text-sm p-2.5 rounded-lg border border-border/50 bg-white focus:outline-none focus:border-primary"
                          value={customerInfo.landmark}
                          onChange={(e) => setCustomerInfo({...customerInfo, landmark: e.target.value})}
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            required
                            placeholder="City / Town"
                            className="w-1/2 text-sm p-2.5 rounded-lg border border-border/50 bg-white focus:outline-none focus:border-primary"
                            value={customerInfo.city}
                            onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                          />
                          <input
                            type="text"
                            required
                            placeholder="State"
                            className="w-1/2 text-sm p-2.5 rounded-lg border border-border/50 bg-white focus:outline-none focus:border-primary"
                            value={customerInfo.state}
                            onChange={(e) => setCustomerInfo({...customerInfo, state: e.target.value})}
                          />
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Pincode"
                          className="w-full text-sm p-2.5 rounded-lg border border-border/50 bg-white focus:outline-none focus:border-primary"
                          value={customerInfo.pincode}
                          onChange={(e) => setCustomerInfo({...customerInfo, pincode: e.target.value})}
                        />
                      </div>
                      <select
                        required
                        className="w-full text-sm p-2.5 rounded-lg border border-border/50 bg-white focus:outline-none focus:border-primary cursor-pointer text-text"
                        value={customerInfo.paymentMode}
                        onChange={(e) => setCustomerInfo({...customerInfo, paymentMode: e.target.value})}
                      >
                        <option value="" disabled>Select UPI Payment Mode</option>
                        <option value="GPay">📱 GPay (Google Pay)</option>
                        <option value="PhonePe">📱 PhonePe</option>
                      </select>
                      <div className="flex gap-2 pt-2">
                        <button type="button" onClick={() => setShowCheckoutForm(false)} className="px-4 py-2 text-xs font-bold text-text/60 hover:text-dark uppercase tracking-wider">Cancel</button>
                        <button type="submit" className="btn-primary flex-1 justify-center py-2 text-sm shadow-md">
                          Continue to Payment
                        </button>
                      </div>
                    </form>
                 ) : (
                   <div className="space-y-4 mb-4 text-center border border-border/20 bg-white p-5 rounded-xl shadow-lg animate-fade-in">
                      <div className="flex items-center justify-center gap-2 text-primary mb-2">
                        <QrCode size={18} />
                        <p className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Step 2: Scan &amp; Pay</p>
                      </div>
                      
                      <div className="relative aspect-square w-48 mx-auto bg-gray-50 rounded-lg border-2 border-primary/20 p-2 flex items-center justify-center">
                         {settings.paymentQRCode ? (
                           <Image 
                             src={settings.paymentQRCode} 
                             alt="Payment QR Code" 
                             fill 
                             className="object-contain"
                             unoptimized // Useful for external URLs like Supabase storage
                           />
                         ) : (
                           <div className="flex flex-col items-center gap-2 text-gray-300">
                             <QrCode size={48} />
                             <p className="text-[10px] uppercase font-bold tracking-widest">QR Code Pending</p>
                           </div>
                         )}
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-[10px] text-text-light uppercase font-bold tracking-widest">Total Amount to Pay</p>
                        <p className="text-xl font-black text-primary">{formatPrice(total)}</p>
                      </div>

                      <div className="elegant-divider" />

                      <p className="text-xs text-text-light font-medium italic">
                        Please scan the QR code above or click the button below to complete your payment of {formatPrice(total)} using {customerInfo.paymentMode}.
                      </p>

                      <div className="flex flex-col gap-3 pt-4">
                        <button 
                          onClick={() => setShowUPIPicker(true)}
                          className="btn-primary w-full justify-center py-3.5 text-sm shadow-md bg-blue-600 hover:bg-blue-700 border-blue-600 flex items-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                          Proceed to UPI Payment
                        </button>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-border/40"></div>
                            <span className="flex-shrink-0 mx-4 text-text/40 text-[10px] uppercase font-bold tracking-widest">Then</span>
                            <div className="flex-grow border-t border-border/40"></div>
                        </div>

                        <div className="flex items-start gap-3 text-left mt-2 mb-2 bg-gray-50/50 p-3 rounded-lg border border-border/40">
                          <input 
                            type="checkbox" 
                            id="confirmPayment" 
                            className="mt-0.5 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 cursor-pointer"
                            checked={paymentConfirmed}
                            onChange={(e) => setPaymentConfirmed(e.target.checked)}
                          />
                          <label htmlFor="confirmPayment" className="text-xs text-text/80 leading-tight cursor-pointer">
                            I confirm that I have successfully transferred <strong>{formatPrice(total)}</strong> using {customerInfo.paymentMode}.
                          </label>
                        </div>

                        <button 
                          onClick={() => handleWhatsAppCheckout()} 
                          disabled={isSubmitting || !paymentConfirmed}
                          className={`btn-primary w-full justify-center py-3.5 text-sm shadow-md transition-all ${!paymentConfirmed ? 'opacity-50 cursor-not-allowed bg-gray-400 border-gray-400 hover:bg-gray-400 text-white' : 'bg-green-600 hover:bg-green-700 border-green-600'}`}
                        >
                          {isSubmitting ? "Processing..." : "I have Completed Payment ✓"}
                        </button>
                        
                        <button 
                          onClick={() => setCheckoutStep(1)} 
                          disabled={isSubmitting}
                          className="text-[10px] text-text/40 hover:text-dark transition-colors mt-2"
                        >
                          ← Back to details
                        </button>
                      </div>
                   </div>
                 )}
                 
                 <Link href="/collections" className="btn-secondary w-full justify-center py-3.5 border-transparent hover:border-current bg-cream text-dark">
                    Continue Shopping
                 </Link>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* UPI App Picker Modal */}
      {showUPIPicker && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl animate-slide-up">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-dark uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Open with</h3>
              <button onClick={() => setShowUPIPicker(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-text/60" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-3 gap-6">
                {[
                  { name: "PhonePe", scheme: "phonepe://pay", color: "bg-[#5f259f]", icon: "PP" },
                  { name: "GPay", scheme: "tez://upi/pay", color: "bg-[#4285F4]", icon: "GP" },
                  { name: "Paytm", scheme: "paytmmp://pay", color: "bg-[#00baf2]", icon: "PT" },
                  { name: "BHIM", scheme: "bhim://pay", color: "bg-[#e47911]", icon: "BH" },
                  { name: "Other UPI", scheme: "upi://pay", color: "bg-gray-800", icon: "UPI" }
                ].map((app) => (
                  <a
                    key={app.name}
                    href={`${app.scheme}?pa=sathyasiva.susi@oksbi&pn=Sathyas%20Boutique&am=${total}&cu=INR`}
                    onClick={() => setShowUPIPicker(false)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`w-14 h-14 ${app.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform`}>
                      {app.icon}
                    </div>
                    <span className="text-[11px] font-bold text-text/80 uppercase tracking-tighter">{app.name}</span>
                  </a>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between text-[10px] font-bold uppercase tracking-widest text-text/40">
                <button onClick={() => setShowUPIPicker(false)} className="hover:text-primary transition-colors">Just once</button>
                <button onClick={() => setShowUPIPicker(false)} className="hover:text-primary transition-colors">Always</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

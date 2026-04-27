"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Trash2, Minor, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/siteConfig";

export default function CartPage() {
  const { items, updateQuantity, removeItem, cartTotal, clearCart } = useCart();
  const shipping = cartTotal > 2999 ? 0 : 150;
  const total = cartTotal + shipping;
  
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", location: "" });

  const handleWhatsAppCheckout = async (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.location) {
      alert("Please fill in all details to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save the order to Supabase
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          customerLocation: customerInfo.location,
          items: items,
          totalAmount: total,
        }),
      });

      if (!res.ok) {
        console.error("Failed to save order to database");
        // We still proceed to WhatsApp even if DB fails, to not lose the sale.
      }

      // 2. Format WhatsApp Message
      const phoneNumber = siteConfig.contact.phone.replace(/[^0-9]/g, "");
      
      let message = "*Order Request from Sashaa Boutiques*\n\n";
      
      message += "*Customer Details:*\n";
      message += `Name: ${customerInfo.name}\n`;
      message += `Phone: ${customerInfo.phone}\n`;
      message += `Location: ${customerInfo.location}\n\n`;

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
      message += "Please let me know how to proceed with the payment!";
      
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
                         <Link href={`/collections/${item.slug}`} className="relative w-23 h-28 md:w-24 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-white/50">
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
                              <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="w-8 h-full flex items-center justify-center text-text hover:bg-cream transition-colors">
                                <Minus size={12} />
                              </button>
                              <span className="w-10 text-center text-xs font-semibold text-text">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="w-8 h-full flex items-center justify-center text-text hover:bg-cream transition-colors">
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>

                          <div className="w-24 text-right text-sm font-bold text-primary">
                             {formatPrice(item.price * item.quantity)}
                          </div>
                           
                          <div className="w-10 flex justify-end">
                             <button onClick={() => removeItem(item.id, item.size)} className="text-text/40 hover:text-red-500 transition-colors p-2" aria-label="Remove item">
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
                     <span className="font-medium text-text">
                        {shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}
                     </span>
                   </div>
                   {shipping > 0 && (
                     <p className="text-[10px] text-text/60 leading-snug italic">
                        Add items worth {formatPrice(3000 - cartTotal)} more for free shipping!
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
                 ) : (
                   <form onSubmit={handleWhatsAppCheckout} className="space-y-3 mb-4 text-left border border-border/20 bg-white p-4 rounded-xl shadow-sm">
                     <p className="text-sm font-bold text-dark mb-2" style={{ fontFamily: "var(--font-heading)" }}>Delivery Details</p>
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
                     <textarea
                       required
                       placeholder="Complete Delivery Address"
                       rows="2"
                       className="w-full text-sm p-2.5 rounded-lg border border-border/50 bg-white resize-none focus:outline-none focus:border-primary"
                       value={customerInfo.location}
                       onChange={(e) => setCustomerInfo({...customerInfo, location: e.target.value})}
                     />
                     <div className="flex gap-2 pt-2">
                       <button type="button" onClick={() => setShowCheckoutForm(false)} className="px-4 py-2 text-xs font-bold text-text/60 hover:text-dark uppercase tracking-wider">Cancel</button>
                       <button type="submit" className="btn-primary flex-1 justify-center py-2 text-sm shadow-md">Send Order</button>
                     </div>
                   </form>
                 )}
                 
                 <Link href="/collections" className="btn-secondary w-full justify-center py-3.5 border-transparent hover:border-current bg-cream text-dark">
                    Continue Shopping
                 </Link>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

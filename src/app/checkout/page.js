"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice, generateOrderId } from "@/lib/utils";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { createOrder } from "@/lib/supabase";
import { ShieldCheck, Truck, Lock, ChevronRight } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const shipping = cartTotal > 2999 ? 0 : 150;
  const total = cartTotal + shipping;

  useEffect(() => {
    // Redirect if cart is empty
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  if (items.length === 0) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderId = generateOrderId();
    
    // Simulate API call / Payment gateway delay
    setTimeout(() => {
      // Create order object for confirmation page
      const orderDetails = {
        id: orderId,
        date: new Date().toISOString(),
        customer: formData,
        items: items,
        subtotal: cartTotal,
        shipping: shipping,
        total: total,
        status: "PROCESSING"
      };

      // In a real app, we would send this to Supabase here
      // await createOrder(orderDetails);
      
      // Store order details in session storage for confirmation page
      sessionStorage.setItem("sashaa_last_order", JSON.stringify(orderDetails));
      
      clearCart();
      router.push(`/order-confirmation?id=${orderId}`);
    }, 2000);
  };

  return (
    <div className="bg-cream/30 py-8 lg:py-12 min-h-screen">
      <div className="container-boutique">
        <AnimatedSection>
            <div className="flex items-center justify-center gap-4 text-xs font-semibold uppercase tracking-wider text-text-light mb-10">
                <Link href="/cart" className="hover:text-dark transition-colors">Cart</Link>
                <ChevronRight size={12} />
                <span className="text-primary border-b-2 border-primary pb-1">Checkout</span>
            </div>
        </AnimatedSection>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Main Checkout Form */}
          <div className="w-full lg:w-2/3">
             <AnimatedSection className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border/50">
               <h2 className="text-xl font-bold text-dark mb-6" style={{ fontFamily: "var(--font-heading)" }}>Contact Information</h2>
               
               <div className="space-y-4 mb-8 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label htmlFor="email" className="block text-dark font-medium mb-1.5">Email Address</label>
                       <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-cream/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="you@example.com" />
                     </div>
                     <div>
                       <label htmlFor="phone" className="block text-dark font-medium mb-1.5">Phone Number</label>
                       <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-cream/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="+91 9976474102" />
                     </div>
                  </div>
               </div>

               <h2 className="text-xl font-bold text-dark mb-6 border-t border-border/50 pt-8" style={{ fontFamily: "var(--font-heading)" }}>Shipping Address</h2>
               
               <div className="space-y-4 text-sm">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-dark font-medium mb-1.5">First Name</label>
                      <input required type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-cream/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-dark font-medium mb-1.5">Last Name</label>
                      <input required type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-cream/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                 </div>
                 
                 <div>
                    <label htmlFor="address" className="block text-dark font-medium mb-1.5">Street Address</label>
                    <input required type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full bg-cream/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="House/Flat No., Street Name" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                       <label htmlFor="city" className="block text-dark font-medium mb-1.5">City</label>
                       <input required type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full bg-cream/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                       <label htmlFor="pincode" className="block text-dark font-medium mb-1.5">PIN Code</label>
                       <input required type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full bg-cream/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                 </div>

                 <div>
                    <label htmlFor="state" className="block text-dark font-medium mb-1.5">State</label>
                    <input required type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="w-full bg-cream/50 border border-border/50 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                 </div>
               </div>

               <h2 className="text-xl font-bold text-dark mb-6 border-t border-border/50 pt-8 mt-8" style={{ fontFamily: "var(--font-heading)" }}>Payment Method</h2>
               
               <div className="bg-cream border border-border rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-2">
                     <Lock size={16} className="text-green-600" />
                     <span className="font-semibold text-dark text-sm">Secure Payment Gateway</span>
                  </div>
                  <p className="text-xs text-text-light pl-7">You will be redirected to our secure payment partner after clicking &quot;Place Order&quot;.</p>
               </div>
             </AnimatedSection>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-1/3">
             <AnimatedSection className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-border/50 sticky top-28">
                <h2 className="text-lg font-bold text-dark mb-6 uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>Order Summary</h2>
                
                {/* Micro Cart Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                   {items.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4">
                         <div className="relative w-16 h-20 rounded bg-cream overflow-hidden flex-shrink-0 border border-border/30">
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                            <span className="absolute -top-1 -right-1 bg-dark text-white text-[10px] w-5 h-5 rounded-sm flex items-center justify-center font-medium z-10 scale-90">
                              {item.quantity}
                            </span>
                         </div>
                         <div className="flex-1 flex flex-col justify-center">
                            <p className="text-sm font-semibold text-dark line-clamp-1">{item.name}</p>
                            <p className="text-xs text-text-light mt-0.5">Size: {item.size}</p>
                            <p className="text-sm font-medium text-dark mt-1">{formatPrice(item.price)}</p>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="border-t border-border/50 pt-4 space-y-3 mb-6">
                   <div className="flex items-center justify-between text-sm">
                     <span className="text-text-light">Subtotal</span>
                     <span className="font-medium text-dark">{formatPrice(cartTotal)}</span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                     <span className="text-text-light">Shipping</span>
                     <span className="font-medium text-dark">
                        {shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}
                     </span>
                   </div>
                </div>

                <div className="border-t border-border/50 pt-4 mb-8">
                   <div className="flex items-center justify-between">
                     <span className="font-bold text-dark uppercase tracking-wider text-sm">Total</span>
                     <span className="font-bold text-2xl text-primary">{formatPrice(total)}</span>
                   </div>
                   <p className="text-[10px] text-text-light mt-1 text-right">Tax included</p>
                </div>

                <button type="submit" disabled={isProcessing} className="btn-primary w-full justify-center py-4 text-base shadow-lg">
                   {isProcessing ? "Processing Securely..." : "Place Order"}
                </button>

                <div className="mt-6 flex items-start gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                   <ShieldCheck size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                   <p className="text-xs text-green-800 leading-relaxed">
                      Safe & secure checkout. Your personal information is securely encrypted during transmission.
                   </p>
                </div>
             </AnimatedSection>
          </div>

        </form>
      </div>
    </div>
  );
}

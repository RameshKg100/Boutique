"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { CheckCircle, ShoppingBag, ArrowRight, Truck } from "lucide-react";

import { Suspense } from "react";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // In a real app, we would fetch this from Supabase using the orderId
    const storedData = sessionStorage.getItem("sashaa_last_order");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      if (parsed.id === orderId) {
        setOrderData(parsed);
      }
    }
  }, [orderId]);

  if (!orderData) {
    return (
      <div className="container-boutique py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-dark mb-4" style={{ fontFamily: "var(--font-heading)" }}>Hmm, we can&apos;t find that order.</h1>
        <p className="text-text-light mb-8 max-w-md">There might be an issue with the order link, or the session has expired.</p>
        <Link href="/collections" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream/30 py-12 lg:py-20 min-h-screen">
      <div className="container-boutique max-w-3xl mx-auto">
        
        {/* Success Header */}
        <AnimatedSection className="text-center mb-10">
           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
           </div>
           <h1 className="text-3xl md:text-4xl font-bold text-dark mb-3" style={{ fontFamily: "var(--font-heading)" }}>
             Thank you for your order!
           </h1>
           <p className="text-text-light">
             We&apos;ve received your order and are getting it ready to be shipped. 
             A confirmation email with the details has been sent to <span className="font-medium text-dark">{orderData.customer.email}</span>.
           </p>
        </AnimatedSection>

        {/* Order Details Card */}
        <AnimatedSection delay={100} className="bg-white rounded-2xl shadow-sm border border-border/50 overflow-hidden mb-8">
           <div className="bg-primary/5 p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                 <p className="text-[10px] uppercase tracking-widest text-text-light font-bold mb-1">Order Number</p>
                 <p className="text-lg font-bold text-dark">{orderData.id}</p>
              </div>
              <div className="sm:text-right">
                 <p className="text-[10px] uppercase tracking-widest text-text-light font-bold mb-1">Date</p>
                 <p className="text-sm font-medium text-dark">
                    {new Date(orderData.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                 </p>
              </div>
           </div>

           <div className="p-6 md:p-8">
              <h2 className="text-lg font-bold text-dark mb-6 border-b border-border/50 pb-4" style={{ fontFamily: "var(--font-heading)" }}>Order Summary</h2>
              
              {/* Items List */}
              <div className="space-y-4 mb-8">
                 {orderData.items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-sm">
                       <div className="flex gap-4 truncate pr-4">
                          <span className="font-medium text-dark">{item.quantity}x</span>
                          <span className="text-text-light truncate">{item.name} (Size: {item.size})</span>
                       </div>
                       <span className="font-semibold text-dark flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                 ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-6 border-t border-border/50 text-sm">
                 <div className="flex justify-between">
                    <span className="text-text-light">Subtotal</span>
                    <span className="font-medium text-dark">{formatPrice(orderData.subtotal)}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-text-light">Shipping</span>
                    <span className="font-medium text-dark">
                       {orderData.shipping === 0 ? "Free" : formatPrice(orderData.shipping)}
                    </span>
                 </div>
                 <div className="flex justify-between pt-4 mt-2 border-t border-border/50 font-bold text-lg">
                    <span className="text-dark">Total</span>
                    <span className="text-primary">{formatPrice(orderData.total)}</span>
                 </div>
              </div>
           </div>
        </AnimatedSection>

        {/* Shipping Status */}
        <AnimatedSection delay={200} className="bg-white rounded-2xl shadow-sm border border-border/50 p-6 md:p-8 mb-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
           <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center flex-shrink-0">
             <Truck size={24} className="text-primary" />
           </div>
           <div className="flex-1">
              <h3 className="font-bold text-dark mb-1">Preparing for dispatch</h3>
              <p className="text-sm text-text-light">Your order is being carefully packed. We&apos;ll send you tracking details as soon as it leaves our boutique.</p>
           </div>
        </AnimatedSection>

        <AnimatedSection delay={300} className="text-center">
           <Link href="/collections" className="btn-primary inline-flex gap-2">
              <ShoppingBag size={16} /> Continue Shopping
           </Link>
        </AnimatedSection>

      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="container-boutique py-32 text-center text-dark">Loading order details...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}

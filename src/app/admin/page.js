"use client";

import { useState, useEffect } from "react";
import { 
  Package, 
  Tag, 
  Star, 
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  ShoppingCart,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    featuredProducts: 0,
    categories: 0,
    outOfStock: 0,
  });
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [prodRes, orderRes] = await Promise.all([
          fetch("/api/products", { cache: "no-store" }),
          fetch("/api/orders", { cache: "no-store" })
        ]);
        const prodData = await prodRes.json();
        const orderData = await orderRes.json();

        setStats({
          totalProducts: prodData.length,
          featuredProducts: prodData.filter(p => p.isFeatured).length,
          categories: [...new Set(prodData.map(p => p.category))].length,
          outOfStock: prodData.filter(p => !p.inStock).length
        });
        setOrderCount(orderData.orders?.length || 0);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally { setLoading(false); }
    }
    fetchStats();
  }, []);

  const cards = [
    { name: "Total Products", value: stats.totalProducts, icon: Package, color: "text-[#2563EB]", bg: "bg-blue-50" },
    { name: "Total Orders", value: orderCount, icon: ShoppingCart, color: "text-[#16A34A]", bg: "bg-green-50" },
    { name: "Categories", value: stats.categories, icon: Tag, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Out of Stock", value: stats.outOfStock, icon: TrendingDown, color: "text-[#DC2626]", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">Dashboard</h2>
          <p className="text-sm text-[#6B7280] mt-0.5">Overview of your boutique performance.</p>
        </div>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-[#16A34A] rounded-md text-xs font-medium border border-green-200">
           <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse"></span>
           Store Online
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.name} className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-md ${card.bg} ${card.color} flex items-center justify-center`}>
                <card.icon size={20} />
              </div>
            </div>
            <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">{card.name}</p>
            <h3 className="text-2xl font-bold text-[#111827] mt-0.5">
              {loading ? "—" : card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Action Cards */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] shadow-sm">
            <div className="px-5 py-4 border-b border-[#E5E7EB]">
              <h3 className="text-sm font-semibold text-[#111827]">Quick Actions</h3>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/admin/products/new", icon: ShoppingBag, title: "Add New Product", desc: "Launch a new item" },
                { href: "/admin/products", icon: Package, title: "View Catalog", desc: "Manage inventory" },
                { href: "/admin/orders", icon: ShoppingCart, title: "View Orders", desc: "Track customer orders" },
                { href: "/admin/reviews", icon: Star, title: "Reviews", desc: "Customer feedback" },
              ].map((action) => (
                <Link key={action.href} href={action.href} className="flex items-center gap-3 p-3 rounded-md border border-[#E5E7EB] hover:border-[#2563EB] hover:bg-blue-50/30 transition-all group">
                  <div className="w-9 h-9 rounded-md bg-[#F9FAFB] group-hover:bg-[#2563EB] flex items-center justify-center text-[#6B7280] group-hover:text-white transition-colors">
                    <action.icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111827]">{action.title}</p>
                    <p className="text-xs text-[#6B7280]">{action.desc}</p>
                  </div>
                  <ArrowUpRight size={14} className="text-[#6B7280] group-hover:text-[#2563EB] transition-colors" />
                </Link>
              ))}
            </div>
          </div>
 

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
           <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] shadow-sm">
              <h3 className="text-sm font-semibold text-[#111827] mb-4 flex items-center gap-2">
                 <TrendingUp size={16} className="text-[#16A34A]" /> Performance
              </h3>
              <div className="space-y-4">
                 <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                       <span className="text-[#6B7280]">Product Catalog</span>
                       <span className="font-semibold text-[#111827]">75%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-[#2563EB] w-[75%] rounded-full"></div>
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                       <span className="text-[#6B7280]">Stock Health</span>
                       <span className="font-semibold text-[#111827]">{loading ? "—" : `${stats.totalProducts > 0 ? Math.round(((stats.totalProducts - stats.outOfStock) / stats.totalProducts) * 100) : 0}%`}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-[#16A34A] rounded-full" style={{ width: stats.totalProducts > 0 ? `${Math.round(((stats.totalProducts - stats.outOfStock) / stats.totalProducts) * 100)}%` : '0%' }}></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-[#111827] p-5 rounded-lg text-white">
              <h3 className="text-sm font-semibold mb-1.5">Need Help?</h3>
              <p className="text-xs text-gray-400 mb-4">Contact support for any store configuration questions.</p>
              <a href="mailto:support@sathyasboutique.com" className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-md text-xs font-medium transition-colors">
                Contact Support
              </a>
           </div>
        </div>
      </div>
    </div>
  );
}

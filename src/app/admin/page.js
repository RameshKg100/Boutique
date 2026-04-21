"use client";

import { useState, useEffect } from "react";
import { 
  Package, 
  Tag, 
  Star, 
  TrendingUp,
  ArrowRight,
  TrendingDown,
  ShoppingBag,
  Users
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    featuredProducts: 0,
    categories: 0,
    outOfStock: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        
        const featured = data.filter(p => p.isFeatured).length;
        const categories = [...new Set(data.map(p => p.category))].length;
        const outOfStock = data.filter(p => !p.inStock).length;

        setStats({
          totalProducts: data.length,
          featuredProducts: featured,
          categories: categories,
          outOfStock: outOfStock
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const cards = [
    { name: "Total Products", value: stats.totalProducts, icon: Package, color: "text-blue-600", bg: "bg-blue-50", trend: "+4.5%" },
    { name: "Categories", value: stats.categories, icon: Tag, color: "text-purple-600", bg: "bg-purple-50", trend: "Stable" },
    { name: "Average Rating", value: "4.8", icon: Star, color: "text-amber-500", bg: "bg-amber-50", trend: "+0.2" },
    { name: "Low Stock", value: stats.outOfStock, icon: TrendingDown, color: "text-rose-600", bg: "bg-rose-50", trend: "-1" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Monitor your boutique performance and inventory.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold ring-1 ring-emerald-200">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             Live Storefront
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.name} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${card.bg} ${card.color} flex items-center justify-center`}>
                <card.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                card.trend.includes("+") ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-600"
              }`}>
                {card.trend}
              </span>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{card.name}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {loading ? "..." : card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions & Recent Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Inventory Management</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/admin/products/new" className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-[#FF66A1] hover:text-white rounded-xl transition-all group/btn border border-gray-100">
                   <div className="w-10 h-10 bg-white group-hover/btn:bg-white/20 rounded-lg flex items-center justify-center text-[#FF66A1] group-hover/btn:text-white shadow-sm">
                      <ShoppingBag size={20} />
                   </div>
                   <div className="text-left">
                      <p className="font-bold text-sm">Add New Product</p>
                      <p className="text-xs text-gray-500 group-hover/btn:text-white/80">Launch a new collection</p>
                   </div>
                </Link>
                <Link href="/admin/products" className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-[#FF66A1] hover:text-white rounded-xl transition-all group/btn border border-gray-100">
                   <div className="w-10 h-10 bg-white group-hover/btn:bg-white/20 rounded-lg flex items-center justify-center text-[#FF66A1] group-hover/btn:text-white shadow-sm">
                      <Package size={20} />
                   </div>
                   <div className="text-left">
                      <p className="font-bold text-sm">View Full Catalog</p>
                      <p className="text-xs text-gray-500 group-hover/btn:text-white/80">Manage existing inventory</p>
                   </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Reviews (Placeholder style) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-lg">Customer Feedback</h3>
                <Link href="/admin/reviews" className="text-[#FF66A1] text-xs font-bold hover:underline">View All</Link>
             </div>
             <div className="divide-y divide-gray-100">
                {[1, 2, 3].map((i) => (
                   <div key={i} className="p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-[#FF66A1] shrink-0 font-bold text-xs">C</div>
                      <div className="min-w-0">
                         <p className="font-bold text-sm">Customer Feedback #{i}</p>
                         <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">The quality of the fabric is excellent. Perfect for evening wear.</p>
                         <div className="flex items-center gap-1 mt-2">
                            {[1,2,3,4,5].map(s => <Star key={s} size={10} className="text-amber-400 fill-amber-400" />)}
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar Info Blocks */}
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                 <TrendingUp size={18} className="text-emerald-500" />
                 Engagement
              </h3>
              <div className="space-y-4">
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                       <span>Total Sales Progress</span>
                       <span className="font-bold text-gray-900">75%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[75%] rounded-full"></div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                       <span>Inventory Utilization</span>
                       <span className="font-bold text-gray-900">42%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-[42%] rounded-full"></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-[#111827] p-6 rounded-xl text-white relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full"></div>
              <h3 className="font-bold mb-2">Team Collaboration</h3>
              <p className="text-xs text-gray-400 mb-4 font-medium">3 members active on the site settings today.</p>
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111827] bg-gray-700 flex items-center justify-center text-[10px] font-bold">U{i}</div>
                 ))}
                 <div className="w-8 h-8 rounded-full border-2 border-[#111827] bg-[#FF66A1] flex items-center justify-center text-[10px] font-bold">+2</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

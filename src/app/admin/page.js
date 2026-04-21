"use client";

import { useState, useEffect } from "react";
import { 
  Package, 
  Tag, 
  Star, 
  TrendingUp,
  ArrowRight,
  PlusCircle,
  Eye
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
    { name: "Total Dresses", value: stats.totalProducts, icon: Package, color: "text-blue-400" },
    { name: "Featured Items", value: stats.featuredProducts, icon: Star, color: "text-yellow-400" },
    { name: "Categories", value: stats.categories, icon: Tag, color: "text-green-400" },
    { name: "Out of Stock", value: stats.outOfStock, icon: TrendingUp, color: "text-red-400" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Dashboard
        </h1>
        <p className="text-white/40">Welcome back, Super Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.name} className="bg-neutral-900 border border-white/5 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${card.color}`}>
                <card.icon size={24} />
              </div>
            </div>
            <div>
              <p className="text-white/40 text-sm font-medium uppercase tracking-wider">{card.name}</p>
              <h3 className="text-3xl font-bold mt-1">
                {loading ? "..." : card.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/30 transition-all duration-500"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Add a New Masterpiece</h2>
            <p className="text-white/60 mb-8 max-w-sm">Ready to expand the collection? Upload new images and details for your latest dress design.</p>
            <Link 
              href="/admin/products/new" 
              className="inline-flex items-center gap-2 bg-primary hover:bg-white hover:text-primary px-6 py-3 rounded-xl font-bold transition-all"
            >
              <PlusCircle size={20} />
              Add Product
            </Link>
          </div>
        </div>

        <div className="bg-neutral-900 border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Customer Voice</h2>
            <p className="text-white/60 mb-8 max-w-sm">Manage reviews, update customer testimonials, and upload new profile pictures for the review page.</p>
            <Link 
              href="/admin/reviews" 
              className="inline-flex items-center gap-2 border border-white/20 hover:border-primary hover:text-primary px-6 py-3 rounded-xl font-bold transition-all"
            >
              <Star size={20} />
              Manage Reviews
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

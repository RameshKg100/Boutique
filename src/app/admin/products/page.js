"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Loader2
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this dress? This cannot be undone.")) return;
    
    try {
      setIsDeleting(id);
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Manage Collection</h1>
          <p className="text-white/40 text-sm">You have {products.length} dresses in your catalog.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg active:scale-95"
        >
          <Plus size={18} />
          Add New Product
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-neutral-900 border border-white/5 p-4 rounded-2xl flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text"
            placeholder="Search by product name..."
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-white/40" />
          <select 
            className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary capitalize"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/20 border-b border-white/5 text-white/40 text-[10px] uppercase tracking-widest">
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-primary mb-2" size={32} />
                    <p className="text-white/40 italic">Loading collection...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-white/40 italic">
                    No products found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 relative rounded overflow-hidden bg-black/50 flex-shrink-0 border border-white/5">
                          <Image 
                            src={p.images[0] || "/placeholder.jpg"} 
                            alt={p.name} 
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm line-clamp-1">{p.name}</div>
                          <div className="text-[10px] text-white/20 font-mono tracking-tighter uppercase">ID: {p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/60 capitalize">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-sm">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        {p.isFeatured && <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-tighter flex items-center gap-1">• Featured</span>}
                        {p.isNew && <span className="text-[10px] text-primary font-bold uppercase tracking-tighter flex items-center gap-1">• New</span>}
                        {!p.inStock && <span className="text-[10px] text-red-500 font-bold uppercase tracking-tighter flex items-center gap-1">• Out of Stock</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link 
                        href={`/collections/${p.slug}`}
                        target="_blank"
                        className="inline-flex p-2 rounded-lg bg-white/5 hover:bg-blue-500/10 hover:text-blue-400 transition-all"
                        title="View Live"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      {/* Edit would typically pass state or ID to the form page */}
                      <Link 
                        href={`/admin/products/edit?id=${p.id}`}
                        className="inline-flex p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all"
                        title="Edit Details"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        disabled={isDeleting === p.id}
                        className="inline-flex p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-500 transition-all disabled:opacity-50"
                        title="Delete Product"
                      >
                        {isDeleting === p.id ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

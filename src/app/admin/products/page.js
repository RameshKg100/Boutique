"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Loader2,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Star
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
      const res = await fetch("/api/products", { cache: "no-store" });
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
    if (!confirm("Are you sure you want to delete this product?")) return;
    
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

  const categories = ["all", "maxis", "sarees", "tops", "kurtis"];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search products by name..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF66A1]/20 focus:border-[#FF66A1] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/products/new" 
            className="flex items-center gap-2 bg-[#FF66A1] hover:bg-[#D43372] text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-sm active:scale-95"
          >
            <Plus size={18} />
            Add Product
          </Link>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-6 border-b border-gray-200 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-6 py-4 text-xl font-black transition-all relative border-b-4 
              ${categoryFilter === cat 
                ? "text-[#FF66A1] border-[#FF66A1]" 
                : "text-gray-400 border-transparent hover:text-gray-600 hover:border-gray-200"
              }`}
          >
            {cat === "all" ? "All Collections" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Product Info</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-[#FF66A1] mb-2" size={32} />
                    <p className="text-gray-400 text-sm font-medium">Fetching inventory...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-gray-400 font-medium">No products found in this category.</td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-14 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 shadow-sm">
                          <Image src={p.images[0] || "/placeholder.jpg"} alt={p.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 truncate hover:text-[#FF66A1] transition-colors">{p.name}</div>
                          <div className="text-[10px] text-gray-400 font-medium mt-0.5">SKU: {p.id.slice(0, 8).toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 capitalize">{p.category}</span>
                    </td>
                    <td className="px-6 py-4">
                       <p className="font-bold text-gray-900">{formatPrice(p.price)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        {p.inStock ? (
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                             <CheckCircle2 size={12} /> In Stock
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600">
                             <XCircle size={12} /> Out of Stock
                          </div>
                        )}
                        {p.isFeatured && (
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500">
                             <Star size={12} className="fill-amber-500" /> Featured
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <Link href={`/collections/${p.slug}`} target="_blank" className="p-2 text-gray-500 hover:text-[#FF66A1] hover:bg-pink-50 rounded-lg transition-all" title="View Live"><ExternalLink size={16} /></Link>
                        <Link href={`/admin/products/edit?id=${p.id}`} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit"><Edit2 size={16} /></Link>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Look (Cards) */}
        <div className="md:hidden divide-y divide-gray-100">
          {filteredProducts.map((p) => (
             <div key={p.id} className="p-4 space-y-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-24 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                      <Image src={p.images[0] || "/placeholder.jpg"} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-[12px] font-bold text-[#FF66A1] uppercase tracking-wider mb-0.5">{p.category}</p>
                       <h4 className="font-bold text-gray-900 line-clamp-1">{p.name}</h4>
                       <p className="font-black text-gray-900 mt-1">{formatPrice(p.price)}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                   <div className="flex gap-4">
                      <Link href={`/admin/products/edit?id=${p.id}`} className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                         <Edit2 size={14} /> Edit
                      </Link>
                      <button onClick={() => handleDelete(p.id)} className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
                         <Trash2 size={14} /> Delete
                      </button>
                   </div>
                   <Link href={`/collections/${p.slug}`} target="_blank" className="text-gray-400">
                      <ExternalLink size={16} />
                   </Link>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}

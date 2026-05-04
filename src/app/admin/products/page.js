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
  CheckCircle2,
  XCircle,
  Star
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("maxis");
  const [isDeleting, setIsDeleting] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      setIsDeleting(id);
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) setProducts(products.filter(p => p.id !== id));
      else alert("Failed to delete product");
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally { setIsDeleting(null); }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">Dresses</h2>
          <p className="text-sm text-[#6B7280] mt-0.5">Manage your dress catalog.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/categories" 
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#6B7280] border border-[#E5E7EB] px-5 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm"
          >
            Manage Categories
          </Link>
          <Link 
            href="/admin/products/new" 
            className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Dress
          </Link>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm">
        <div className="p-4 border-b border-[#E5E7EB] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={16} />
            <input 
              type="text"
              placeholder="Search dresses..."
              className="w-full pl-9 pr-4 py-2 border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id || cat.slug}
                onClick={() => setCategoryFilter(cat.slug)}
                className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap
                  ${categoryFilter === cat.slug 
                    ? "bg-[#2563EB] text-white" 
                    : "text-[#6B7280] hover:bg-gray-100"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-[#6B7280] uppercase tracking-wider border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <tr>
                <th className="px-4 py-3 font-medium">Dress</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-16 text-center">
                    <Loader2 className="animate-spin mx-auto text-[#2563EB] mb-2" size={28} />
                    <p className="text-[#6B7280] text-sm">Loading dresses...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-16 text-center text-[#6B7280]">No dresses found.</td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F9FAFB] transition-colors group">
                    <td className="px-4 py-3">
                      <Link href={`/admin/products/edit?id=${p.id}`} className="flex items-center gap-3 group/item">
                        <div className="w-10 h-12 relative rounded-md overflow-hidden bg-gray-50 border border-[#E5E7EB] flex-shrink-0 transition-transform group-hover/item:scale-105">
                          <Image src={p.images[0] || "/placeholder.jpg"} alt={p.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-[#111827] truncate group-hover/item:text-[#2563EB] transition-colors">{p.name}</p>
                          <p className="text-[10px] text-[#6B7280] mt-0.5">ID: {String(p.id || '').slice(0, 8)}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-[#6B7280] border border-[#E5E7EB] capitalize">{p.category}</span>
                    </td>
                    <td className="px-4 py-3">
                       <p className="font-semibold text-[#111827]">{formatPrice(p.price)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {p.inStock ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#16A34A]"><CheckCircle2 size={12} /> In Stock</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#DC2626]"><XCircle size={12} /> Out of Stock</span>
                        )}
                        {p.isFeatured && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#D97706]"><Star size={12} className="fill-[#D97706]" /> Featured</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/collections/${p.slug}`} target="_blank" className="p-2 text-[#6B7280] hover:text-[#2563EB] hover:bg-blue-50 rounded-md transition-colors" title="View Live"><ExternalLink size={15} /></Link>
                        <Link href={`/admin/products/edit?id=${p.id}`} className="p-2 text-[#6B7280] hover:text-[#2563EB] hover:bg-blue-50 rounded-md transition-colors" title="Edit"><Edit2 size={15} /></Link>
                        <button onClick={() => handleDelete(p.id)} disabled={isDeleting === p.id} className="p-2 text-[#6B7280] hover:text-[#DC2626] hover:bg-red-50 rounded-md transition-colors" title="Delete"><Trash2 size={15} /></button>
                      </div>
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

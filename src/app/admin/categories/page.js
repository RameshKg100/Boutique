"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Loader2, 
  GripVertical,
  Save,
  ArrowLeft,
  Tag
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setSaving(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: newCategoryName, 
          order_index: categories.length + 1 
        }),
      });
      if (res.ok) {
        setNewCategoryName("");
        fetchCategories();
      } else {
        alert("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure? Products in this category might lose their link.")) return;
    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchCategories();
      else alert("Failed to delete");
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#E5E7EB] shadow-sm sticky top-20 z-40">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#2563EB] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Dresses
        </button>
        <h2 className="text-lg font-bold text-[#111827] flex items-center gap-2">
          <Tag size={18} className="text-[#2563EB]" /> Manage Categories
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Add New Category */}
        <div className="md:col-span-4">
          <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-6 sticky top-40">
            <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-4">Add Category</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-1.5">Category Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Maxi Dresses"
                  className="w-full border border-[#E5E7EB] rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#2563EB]"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                disabled={saving}
                className="w-full btn-primary justify-center py-2.5 text-sm shadow-md disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                Add Category
              </button>
            </form>
            <p className="mt-4 text-[10px] text-[#6B7280] leading-relaxed">
              New categories will be added to the end of the list. You can reorder them in the database if needed.
            </p>
          </div>
        </div>

        {/* Categories List */}
        <div className="md:col-span-8">
          <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Existing Categories</h3>
            </div>
            
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-[#2563EB] mb-2" size={32} />
                <p className="text-sm text-[#6B7280]">Loading categories...</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="py-20 text-center text-[#6B7280] text-sm">No categories found.</div>
            ) : (
              <div className="divide-y divide-[#E5E7EB]">
                {categories.map((cat) => (
                  <div key={cat.id || cat.slug} className="flex items-center justify-between p-4 hover:bg-[#F9FAFB] transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 rounded-md text-[#6B7280]">
                        <GripVertical size={14} />
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827]">{cat.name}</p>
                        <p className="text-[10px] text-[#6B7280]">Slug: {cat.slug}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-[#6B7280] hover:text-[#DC2626] hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
             <div className="p-1.5 bg-[#2563EB] text-white rounded text-[10px] font-bold">INFO</div>
             <p className="text-xs text-[#1D4ED8] leading-relaxed">
               Categories are automatically synced with the website collection page. The order is determined by the "Order Index" in the database.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

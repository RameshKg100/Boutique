"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, GripVertical, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "", display_order: 0 });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories", { cache: "no-store" });
      const data = await res.json();
      setCategories(data);
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
    if (!newCategory.name) return;

    setIsSaving(true);
    const slug = newCategory.slug || newCategory.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newCategory, slug, display_order: categories.length + 1 }),
      });

      if (res.ok) {
        setNewCategory({ name: "", slug: "", display_order: 0 });
        fetchCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure? Products in this category might lose their link.")) return;

    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const updateOrder = async (id, newOrder) => {
    const category = categories.find(c => c.id === id);
    if (!category) return;

    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...category, display_order: parseInt(newOrder) }),
      });
      fetchCategories();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-gray-500">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="font-medium italic">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm mb-2">
             <ArrowLeft size={16} /> Back to Dresses
          </button>
          <h2 className="text-3xl font-bold text-gray-900">Manage Categories</h2>
          <p className="text-gray-500 mt-1 font-medium italic text-sm">Define how your dresses are grouped on the website.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Category Form */}
        <div className="md:col-span-1">
           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Add New Category</h3>
              <form onSubmit={handleAddCategory} className="space-y-4">
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Category Name</label>
                    <input 
                       type="text" 
                       placeholder="e.g. Feeding Maxis"
                       className="w-full text-sm p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary transition-colors"
                       value={newCategory.name}
                       onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                       required
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">URL Slug (Optional)</label>
                    <input 
                       type="text" 
                       placeholder="e.g. feeding-maxis"
                       className="w-full text-sm p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary transition-colors"
                       value={newCategory.slug}
                       onChange={(e) => setNewCategory({...newCategory, slug: e.target.value})}
                    />
                 </div>
                 <button 
                    type="submit" 
                    disabled={isSaving}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-bold text-sm transition-all shadow-md disabled:opacity-50"
                 >
                    {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                    Create Category
                 </button>
              </form>
           </div>
        </div>

        {/* Categories List */}
        <div className="md:col-span-2 space-y-4">
           <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                 <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">Active Categories</h3>
                 <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-widest">
                    {categories.length} Total
                 </span>
              </div>
              <div className="divide-y divide-gray-100">
                 {categories.map((cat, index) => (
                    <div key={cat.id} className="p-4 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="text-gray-300 group-hover:text-gray-400 cursor-grab active:cursor-grabbing transition-colors">
                             <GripVertical size={20} />
                          </div>
                          <div>
                             <p className="font-bold text-gray-900">{cat.name}</p>
                             <p className="text-[10px] text-gray-400 font-mono">slug: {cat.slug}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                             <label className="text-[10px] font-bold text-gray-400 uppercase">Order:</label>
                             <input 
                                type="number" 
                                className="w-12 text-center text-xs p-1 border border-gray-200 rounded focus:outline-none focus:border-primary font-bold"
                                value={cat.display_order}
                                onChange={(e) => updateOrder(cat.id, e.target.value)}
                             />
                          </div>
                          <button 
                             onClick={() => handleDelete(cat.id)}
                             className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                             title="Delete Category"
                          >
                             <Trash2 size={16} />
                          </button>
                       </div>
                    </div>
                 ))}
                 {categories.length === 0 && (
                    <div className="p-12 text-center text-gray-400 italic font-medium">
                       No categories defined yet. Add your first one to get started!
                    </div>
                 )}
              </div>
           </div>

           <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
              <h4 className="font-bold text-primary text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                 💡 Quick Tip
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                The **Order** number determines the sequence on the website. Use **1 for Maxis**, **2 for Feeding Maxis**, etc. Lower numbers appear first.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

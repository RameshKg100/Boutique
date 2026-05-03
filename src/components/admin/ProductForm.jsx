"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Upload, 
  X, 
  Save, 
  ArrowLeft,
  Loader2,
  Image as ImageIcon,
  Check
} from "lucide-react";

export default function ProductForm({ initialData = null, mode = "create" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "maxis",
    description: "",
    shortDescription: "",
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    colors: [],
    images: [],
    inStock: true,
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    offerPercentage: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        name: initialData.name || "",
        price: initialData.price || "",
        originalPrice: initialData.originalPrice || "",
        category: initialData.category || "maxis",
        description: initialData.description || "",
        shortDescription: initialData.shortDescription || initialData.short_description || "",
        sizes: initialData.sizes || ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
        colors: initialData.colors || [],
        images: initialData.images || [],
        inStock: initialData.inStock ?? true,
        isNew: initialData.isNew ?? false,
        isFeatured: initialData.isFeatured ?? false,
        isBestSeller: initialData.isBestSeller ?? false,
        offerPercentage: initialData.offerPercentage || "",
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const uploadData = new FormData();
      uploadData.append("file", file);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: uploadData });
        let data;
        try { data = await res.json(); } catch (parseError) {
          throw new Error(`Server returned non-JSON response. Status: ${res.status}`);
        }
        if (data.success) uploadedUrls.push(data.url);
        else alert(`Failed to upload ${file.name}: ${data.error || "Unknown error"}`);
      } catch (error) {
        console.error("Upload failed for", file.name, error);
        alert(`Failed to upload ${file.name}. Error: ${error.message}`);
      }
    }

    setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    setUploading(false);
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, index) => index !== indexToRemove) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.images.length === 0) { alert("Please upload at least one image."); setLoading(false); return; }
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
          offerPercentage: formData.offerPercentage ? parseFloat(formData.offerPercentage) : null,
        }),
      });
      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/admin/products");
        }, 2000);
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Failed to save product: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An error occurred while saving.");
    } finally { setLoading(false); }
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const inputClass = "w-full border border-[#E5E7EB] rounded-md px-4 py-2.5 text-sm text-[#111827] bg-white focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors";
  const labelClass = "block text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-1.5";

  return (
    <div className="relative">
      {/* Success Message Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-green-100 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-scale-in">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner">
              <Check size={32} strokeWidth={3} />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-dark mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                Update Successful!
              </h3>
              <p className="text-text/60 text-sm">
                The dress details have been saved successfully.
              </p>
            </div>
            <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-green-500 animate-progress"></div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border border-[#E5E7EB] shadow-sm sticky top-20 z-40">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#2563EB] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Dresses
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          {mode === "create" ? "Publish Dress" : "Update Dress"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Media & Settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Media */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm">
            <div className="px-4 py-3 border-b border-[#E5E7EB] flex items-center justify-between">
               <h3 className="text-sm font-semibold text-[#111827] flex items-center gap-2">
                  <ImageIcon size={14} className="text-[#2563EB]" /> Images
               </h3>
               <span className="text-xs font-medium text-[#6B7280]">{formData.images.length}/6</span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {formData.images.map((url, index) => (
                  <div key={index} className="aspect-[3/4] relative rounded-md overflow-hidden group bg-gray-50 border border-[#E5E7EB]">
                    <Image src={url} alt={`Upload ${index}`} fill className="object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1.5 right-1.5 p-1 bg-[#DC2626] text-white rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                {formData.images.length < 6 && (
                  <label className="aspect-[3/4] border-2 border-dashed border-[#E5E7EB] rounded-md flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#2563EB] hover:bg-blue-50/30 transition-all text-[#6B7280] hover:text-[#2563EB] group">
                    {uploading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        <Upload size={20} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-medium tracking-wider text-center px-2">Upload</span>
                      </>
                    )}
                    <input type="file" multiple className="hidden" onChange={handleFileUpload} accept="image/*" />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm">
            <div className="px-4 py-3 border-b border-[#E5E7EB]">
               <h3 className="text-sm font-semibold text-[#111827]">Settings</h3>
            </div>
            <div className="p-3 space-y-2">
              {[
                { label: "In Stock", name: "inStock" },
                { label: "New Arrival Badge", name: "isNew" },
                { label: "Featured Product", name: "isFeatured" },
                { label: "Best Seller", name: "isBestSeller" }
              ].map((item) => (
                <label key={item.name} className={`flex items-center justify-between p-3 rounded-md cursor-pointer border transition-all 
                  ${formData[item.name] ? "bg-green-50 border-green-200" : "bg-gray-50 border-[#E5E7EB] hover:border-gray-300"}`}>
                  <span className={`text-xs font-medium ${formData[item.name] ? "text-[#16A34A]" : "text-[#6B7280]"}`}>{item.label}</span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all 
                    ${formData[item.name] ? "bg-[#16A34A] border-[#16A34A] text-white" : "bg-white border-gray-300"}`}>
                    <input type="checkbox" name={item.name} checked={formData[item.name]} onChange={handleInputChange} className="hidden" />
                    {formData[item.name] && <Check size={12} strokeWidth={3} />}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Core Data */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-6 shadow-sm">
            <div className="border-b border-[#E5E7EB] pb-4">
               <h3 className="text-base font-semibold text-[#111827]">Dress Details</h3>
               <p className="text-xs text-[#6B7280] mt-0.5">Fill in the dress information below.</p>
            </div>
            
            <div className="space-y-1.5">
              <label className={labelClass}>Product Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Sapphire Evening Gown" className={inputClass} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className={labelClass}>Selling Price (₹)</label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="0" className={inputClass} required />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Original Price (₹)</label>
                <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} placeholder="0" className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Offer Percentage (%)</label>
                <input type="number" name="offerPercentage" value={formData.offerPercentage} onChange={handleInputChange} placeholder="e.g. 20" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className={labelClass}>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className={`${inputClass} capitalize cursor-pointer`}>
                  {categories.map(cat => (
                    <option key={cat.id || cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Short Description</label>
                <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} placeholder="Brief summary" className={inputClass} required />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Available Sizes</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      const newSizes = formData.sizes.includes(size)
                        ? formData.sizes.filter((s) => s !== size)
                        : [...formData.sizes, size];
                      setFormData({ ...formData, sizes: newSizes });
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      formData.sizes.includes(size)
                        ? "bg-[#2563EB] text-white shadow-sm"
                        : "bg-gray-100 text-[#6B7280] hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Full Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows={5} placeholder="Detailed product description..." className={`${inputClass} resize-none`} required></textarea>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}

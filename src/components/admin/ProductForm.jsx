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
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "maxis",
    description: "",
    shortDescription: "",
    sizes: ["S", "M", "L", "XL"],
    colors: [],
    images: [],
    inStock: true,
    isNew: false,
    isFeatured: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price || "",
        originalPrice: initialData.originalPrice || "",
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
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        
        let data;
        try {
          data = await res.json();
        } catch (parseError) {
          throw new Error(`Server returned non-JSON response. Status: ${res.status}`);
        }

        if (data.success) {
          uploadedUrls.push(data.url);
        } else {
          alert(`Failed to upload ${file.name}: ${data.error || "Unknown error"}\n\nHave you added your SUPABASE_SERVICE_ROLE_KEY to Vercel?`);
        }
      } catch (error) {
        console.error("Upload failed for", file.name, error);
        alert(`Failed to upload ${file.name}. Error: ${error.message}\n\n(If it says non-JSON response, the image file might be larger than Vercel's 4.5MB limit.)`);
      }
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls]
    }));
    setUploading(false);
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.images.length === 0) {
        alert("Please upload at least one image.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
      } else {
        alert("Failed to save product.");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = ["maxis", "sarees", "tops", "kurtis"];

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-6 pb-20 font-sans">
      {/* Top Navigation / Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-20 z-40">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-[#FF66A1] transition-all font-bold text-sm"
        >
          <ArrowLeft size={18} />
          Back to Catalog
        </button>
        <div className="flex items-center gap-3 w-full sm:w-auto">
           <button
            type="submit"
            disabled={loading || uploading}
            className="flex-1 sm:flex-none bg-[#FF66A1] hover:bg-[#D43372] text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {mode === "create" ? "Publish Product" : "Update Product"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Media & Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Media Card */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
               <h3 className="text-gray-900 font-bold text-sm flex items-center gap-2">
                  <ImageIcon size={16} className="text-[#FF66A1]" />
                  Product Master Images
               </h3>
               <span className="text-xs font-bold text-gray-400">{formData.images.length}/6</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {formData.images.map((url, index) => (
                  <div key={index} className="aspect-[3/4] relative rounded-lg overflow-hidden group bg-gray-50 border border-gray-100 shadow-inner">
                    <Image src={url} alt={`Upload ${index}`} fill className="object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {formData.images.length < 6 && (
                  <label className="aspect-[3/4] border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#FF66A1] hover:bg-pink-50 transition-all text-gray-400 hover:text-[#FF66A1] group">
                    {uploading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        <Upload size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-center px-4">Upload Media</span>
                      </>
                    )}
                    <input type="file" multiple className="hidden" onChange={handleFileUpload} accept="image/*" />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Configuration Card */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
               <h3 className="text-gray-900 font-bold text-sm">Sale Settings</h3>
            </div>
            <div className="p-4 space-y-2">
              {[
                { label: "Available in Stock", name: "inStock" },
                { label: "Display 'New' Badge", name: "isNew" },
                { label: "Add to Featured List", name: "isFeatured" }
              ].map((item) => (
                <label key={item.name} className={`flex items-center justify-between p-4 rounded-lg cursor-pointer border transition-all 
                  ${formData[item.name] ? "bg-emerald-50 border-emerald-100" : "bg-gray-50 border-gray-100 hover:border-gray-200"}`}>
                  <span className={`text-xs font-bold ${formData[item.name] ? "text-emerald-700" : "text-gray-600"}`}>{item.label}</span>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all 
                    ${formData[item.name] ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-gray-300"}`}>
                    <input 
                      type="checkbox" 
                      name={item.name}
                      checked={formData[item.name]}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    {formData[item.name] && <Check size={14} strokeWidth={4} />}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Core Data */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-8 shadow-sm">
            <div className="border-b border-gray-100 pb-4">
               <h3 className="text-lg font-bold text-gray-900">Product Particulars</h3>
               <p className="text-xs text-gray-400 font-medium">Specify the essential details of the collection item.</p>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Product Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ex: Sapphire Evening Gown"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF66A1]/10 focus:border-[#FF66A1] transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Selling Price (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-4 py-3.5 text-gray-900 font-black focus:outline-none focus:border-[#FF66A1] focus:ring-2 focus:ring-[#FF66A1]/10 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Original Price (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                  <input 
                    type="number" 
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-4 py-3.5 text-gray-900 font-black focus:outline-none focus:border-[#FF66A1] focus:ring-2 focus:ring-[#FF66A1]/10 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Style Category</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 font-bold focus:outline-none focus:border-[#FF66A1] focus:ring-2 focus:ring-[#FF66A1]/10 transition-all capitalize cursor-pointer appearance-none"
                >
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Short Preview</label>
                <input 
                  type="text" 
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Summary for collection list"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 font-medium focus:outline-none focus:border-[#FF66A1] focus:ring-2 focus:ring-[#FF66A1]/10 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Complete Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                placeholder="Elaborate on the craftsmanship and material..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-4 text-gray-900 font-medium focus:outline-none focus:border-[#FF66A1] focus:ring-2 focus:ring-[#FF66A1]/10 transition-all resize-none"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Upload, 
  X, 
  Plus, 
  Save, 
  ArrowLeft,
  Loader2,
  Image as ImageIcon
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
        const data = await res.json();
        if (data.success) {
          uploadedUrls.push(data.url);
        }
      } catch (error) {
        console.error("Upload failed for", file.name, error);
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
      // Basic validation
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
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Back to list
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {mode === "create" ? "Publish Dress" : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Media */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-900 border border-white/5 rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-4">Product Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {formData.images.map((url, index) => (
                <div key={index} className="aspect-[3/4] relative rounded-2xl overflow-hidden group bg-black">
                  <Image src={url} alt={`Upload ${index}`} fill className="object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <label className="aspect-[3/4] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all text-white/40 hover:text-primary">
                {uploading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Upload size={24} />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-center px-2">Upload Files</span>
                  </>
                )}
                <input type="file" multiple className="hidden" onChange={handleFileUpload} accept="image/*" />
              </label>
            </div>
          </div>

          <div className="bg-neutral-900 border border-white/5 rounded-3xl p-6">
            <h3 className="text-lg font-bold mb-4">Inventory Status</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 bg-black/20 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                <span className="text-sm">In Stock</span>
                <input 
                  type="checkbox" 
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="w-5 h-5 accent-primary"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-black/20 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                <span className="text-sm">New Arrival</span>
                <input 
                  type="checkbox" 
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleInputChange}
                  className="w-5 h-5 accent-primary"
                />
              </label>
              <label className="flex items-center justify-between p-3 bg-black/20 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                <span className="text-sm">Featured Product</span>
                <input 
                  type="checkbox" 
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-5 h-5 accent-primary"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-900 border border-white/5 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-bold border-b border-white/5 pb-4">General Information</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Product Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Celestial Evening Maxi"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Selling Price (₹)</label>
                <input 
                  type="number" 
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="2999"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Original Price (₹)</label>
                <input 
                  type="number" 
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="3999"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors capitalize"
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Short Description</label>
              <input 
                type="text" 
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                placeholder="Brief summary for product cards"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Full Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                placeholder="Describe the fabric, fit, and style details..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

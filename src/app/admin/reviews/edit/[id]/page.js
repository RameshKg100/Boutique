"use client";

import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  Save, 
  Upload, 
  X, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Star
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function EditReviewPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    text: "",
    avatar: "",
    product: ""
  });

  useEffect(() => {
    async function fetchReview() {
      try {
        const res = await fetch("/api/reviews");
        const reviews = await res.json();
        const review = reviews.find(r => r.id.toString() === params.id);
        if (review) {
          setFormData(review);
        }
      } catch (error) {
        console.error("Failed to fetch review:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReview();
  }, [params.id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body
      });
      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, avatar: data.url });
        setStatus({ type: "success", message: "Image uploaded successfully!" });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Upload failed." });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus({ type: "success", message: "Review updated successfully!" });
        setTimeout(() => router.push("/admin/reviews"), 2000);
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to update review." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-white/40">Loading review details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <Link 
          href="/admin/reviews" 
          className="inline-flex items-center gap-2 text-white/40 hover:text-primary mb-4 transition-colors group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to List
        </Link>
        <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
          Edit Testimonial
        </h1>
        <p className="text-white/40 mt-1">Refine customer feedback and update profile images.</p>
      </div>

      {status.message && (
        <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
          status.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-500"
        }`}>
          {status.type === "primary" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <div className="md:col-span-1">
            <div className="bg-neutral-900 border border-white/5 p-6 rounded-3xl text-center">
              <span className="block text-xs uppercase tracking-widest text-white/40 font-bold mb-4">Customer Profile</span>
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden shadow-2xl">
                  {formData.avatar?.startsWith("http") ? (
                    <img src={formData.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-black text-primary">{formData.avatar || "??"}</span>
                  )}
                </div>
                {uploading && (
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" size={24} />
                  </div>
                )}
              </div>
              
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-white/40 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition-all cursor-pointer"
                />
              </label>
              <p className="text-[10px] text-white/20 mt-4 leading-relaxed">
                Suggested size: 200x200px. JPG, PNG or WebP.
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-2 space-y-6 bg-neutral-900 border border-white/5 p-8 rounded-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60">Customer Name</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                  placeholder="e.g. Priya Raghavan"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60">Location</label>
                <input 
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                  placeholder="e.g. Chennai, Tamil Nadu"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60">Rating (1-5)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                    className="flex-1 accent-primary"
                  />
                  <div className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-lg font-bold">
                    <Star size={14} fill="currentColor" />
                    {formData.rating}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60">Avatar (Initials or URL)</label>
                <input 
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                  placeholder="e.g. PR"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60">Testimonial Text</label>
              <textarea 
                required
                rows={4}
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none"
                placeholder="What did the customer say about Sashaa Boutiques?"
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={saving}
                className="w-full bg-primary hover:bg-white hover:text-primary text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Update Testimonial
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

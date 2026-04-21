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
  Star,
  User as UserIcon
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
        setTimeout(() => router.push("/admin/reviews"), 1500);
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to update review." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="animate-spin text-[#FF66A1] mb-4" size={40} />
        <p className="text-gray-400 font-medium italic">Loading feedback records...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 font-sans animate-fade-in">
      {/* Header / Actions Sidebar Style */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-20 z-40">
        <Link 
          href="/admin/reviews" 
          className="flex items-center gap-2 text-gray-500 hover:text-[#FF66A1] transition-all font-bold text-sm"
        >
          <ChevronLeft size={18} />
          Review Catalog
        </Link>
        <button
          onClick={handleSubmit}
          disabled={saving || uploading}
          className="w-full sm:w-auto bg-[#FF66A1] hover:bg-[#D43372] text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save Changes
        </button>
      </div>

      {status.message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 font-bold text-sm ${
          status.type === "success" ? "bg-green-50 border border-green-100 text-green-600" : "bg-red-50 border border-red-100 text-red-600"
        }`}>
          {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {status.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
               <UserIcon size={16} className="text-[#FF66A1]" />
               <h3 className="text-gray-900 font-bold text-sm">Reviewer Persona</h3>
            </div>
            <div className="p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-6 group">
                <div className="w-full h-full rounded-2xl bg-gray-50 border-2 border-gray-100 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-[#FF66A1]/30 transition-all">
                  {formData.avatar?.startsWith("http") ? (
                    <img src={formData.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-black text-[#FF66A1]">{formData.avatar || "??"}</span>
                  )}
                </div>
                {uploading && (
                  <div className="absolute inset-0 bg-white/80 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Loader2 className="animate-spin text-[#FF66A1]" size={24} />
                  </div>
                )}
              </div>
              
              <label className="inline-flex items-center gap-2 bg-gray-50 hover:bg-[#FF66A1] hover:text-white text-gray-600 text-xs font-black px-4 py-2 rounded-lg cursor-pointer border border-gray-200 transition-all">
                <Upload size={14} />
                Modify Profile Image
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              <p className="text-[10px] text-gray-400 mt-4 leading-relaxed font-bold uppercase tracking-widest">
                256 x 256 Recommended
              </p>
            </div>
          </div>

          <div className="bg-blue-900 p-6 rounded-xl text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
             <h4 className="text-sm font-bold mb-2">Testimonial Impact</h4>
             <p className="text-xs text-blue-100 leading-relaxed">Reviews with photos generate 48% more conversion on product pages.</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-8 space-y-8 shadow-sm">
            <div className="border-b border-gray-100 pb-4">
               <h3 className="text-lg font-bold text-gray-900">Feedback Details</h3>
               <p className="text-xs text-gray-400 font-medium mt-1">Ensure the customer's voice is accurately reflected.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Customer Name</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#FF66A1]/10 focus:border-[#FF66A1] transition-all"
                  placeholder="e.g. Priya Raghavan"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Location Origin</label>
                <input 
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#FF66A1]/10 focus:border-[#FF66A1] transition-all"
                  placeholder="e.g. Chennai, Tamil Nadu"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Rating Experience</label>
              <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <input 
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="flex-1 accent-[#FF66A1]"
                />
                <div className="flex items-center gap-2 bg-[#FF66A1] text-white px-4 py-2 rounded-lg font-black shadow-lg shadow-pink-500/20">
                  <Star size={16} fill="currentColor" />
                  {formData.rating}.0
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Written Testimonial</label>
              <textarea 
                required
                rows={6}
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF66A1]/10 focus:border-[#FF66A1] transition-all resize-none leading-relaxed"
                placeholder="What feedback did they share?"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

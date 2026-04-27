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
  User as UserIcon,
  Image as ImageIcon
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
        const res = await fetch("/api/reviews", { cache: "no-store" });
        const reviews = await res.json();
        const review = reviews.find(r => r.id.toString() === params.id);
        if (review) {
          setFormData(review);
        } else {
          setStatus({ type: "error", message: "Review not found." });
        }
      } catch (error) {
        console.error("Failed to fetch review:", error);
        setStatus({ type: "error", message: "Failed to load review data." });
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
        setStatus({ type: "success", message: "Avatar updated!" });
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
      
      const result = await res.json();
      
      if (res.ok && result.success) {
        setStatus({ type: "success", message: "Review updated successfully!" });
        // Force a revalidation hint if needed, though no-store should handle it
        setTimeout(() => router.push("/admin/reviews"), 1500);
      } else {
        setStatus({ type: "error", message: result.error || "Failed to update review." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "A network error occurred." });
    } finally {
      setSaving(false);
    }
  };

  const labelClass = "block text-xs font-medium text-[#6B7280] uppercase tracking-wider mb-1.5";
  const inputClass = "w-full border border-[#E5E7EB] rounded-md px-4 py-2.5 text-sm text-[#111827] bg-white focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-colors";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#6B7280]">
        <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#2563EB]" />
        <p className="text-sm font-medium">Loading review data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border border-[#E5E7EB] shadow-sm sticky top-20 z-40">
        <Link 
          href="/admin/reviews" 
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#2563EB] transition-colors text-sm font-medium"
        >
          <ChevronLeft size={16} />
          Back to Reviews
        </Link>
        <button
          onClick={handleSubmit}
          disabled={saving || uploading}
          className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm disabled:opacity-50 w-full sm:w-auto justify-center"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Save Changes
        </button>
      </div>

      {status.message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 text-sm font-medium border ${
          status.type === "success" 
            ? "bg-green-50 border-green-200 text-[#16A34A]" 
            : "bg-red-50 border-red-200 text-[#DC2626]"
        }`}>
          {status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {status.message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Avatar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm">
            <div className="px-4 py-3 border-b border-[#E5E7EB]">
               <h3 className="text-sm font-semibold text-[#111827]">Reviewer Avatar</h3>
            </div>
            <div className="p-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4 group">
                <div className="w-full h-full rounded-full bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center overflow-hidden">
                  {formData.avatar?.startsWith("http") ? (
                    <img src={formData.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-[#2563EB]">{formData.avatar || formData.name.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                {uploading && (
                  <div className="absolute inset-0 bg-white/60 rounded-full flex items-center justify-center">
                    <Loader2 className="animate-spin text-[#2563EB]" size={20} />
                  </div>
                )}
              </div>
              
              <label className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#1D4ED8] text-xs font-semibold cursor-pointer py-1 px-2 rounded-md hover:bg-blue-50 transition-colors">
                <Upload size={14} />
                Change Image
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-6 shadow-sm">
            <div className="border-b border-[#E5E7EB] pb-4">
               <h3 className="text-base font-semibold text-[#111827]">Edit Feedback</h3>
               <p className="text-xs text-[#6B7280] mt-0.5">Modify the customer's testimonial details.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className={labelClass}>Customer Name</label>
                <input 
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={inputClass}
                  placeholder="e.g. Priya Raghavan"
                />
              </div>
              <div className="space-y-1.5">
                <label className={labelClass}>Location</label>
                <input 
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className={inputClass}
                  placeholder="e.g. Chennai, TN"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Rating</label>
              <div className="flex items-center gap-4 bg-[#F9FAFB] p-4 rounded-md border border-[#E5E7EB]">
                <input 
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                />
                <div className="flex items-center gap-1.5 bg-[#2563EB] text-white px-3 py-1 rounded-md font-bold text-sm min-w-[50px] justify-center">
                  <Star size={14} fill="currentColor" />
                  {formData.rating}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Review Text</label>
              <textarea 
                required
                rows={5}
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                className={`${inputClass} resize-none leading-relaxed`}
                placeholder="What did the customer say?"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

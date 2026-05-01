"use client";

import { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  Save, 
  Upload, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  X,
  Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    name: "Customer",
    location: "",
    rating: 5,
    text: "Photo Review",
    avatar: "",
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
    setStatus({ type: "", message: "" });
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
        setStatus({ type: "success", message: "Photo updated!" });
        setTimeout(() => setStatus({ type: "", message: "" }), 2000);
      }
    } catch (error) {
      setStatus({ type: "error", message: "Upload failed." });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
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
      } else {
        const result = await res.json();
        setStatus({ type: "error", message: result.error || "Failed to update." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Network error occurred." });
    } finally {
      setSaving(false);
    }
  };

  const isImageUrl = (url) => url && (url.startsWith('http') || url.startsWith('/uploads'));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#6B7280]">
        <Loader2 className="w-8 h-8 animate-spin mb-3 text-[#2563EB]" />
        <p className="text-sm font-medium">Loading review...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB] shadow-sm sticky top-20 z-40">
        <Link 
          href="/admin/reviews" 
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#2563EB] transition-colors text-sm font-bold uppercase tracking-wider"
        >
          <ChevronLeft size={16} />
          Back to List
        </Link>
        <button
          type="submit"
          disabled={saving || uploading}
          className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-10 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 w-full sm:w-auto justify-center active:scale-95"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          Save Changes
        </button>
      </div>

      {status.message && status.type === "error" && (
        <div className="p-4 rounded-xl flex items-center gap-3 text-sm font-bold border bg-red-50 border-red-200 text-[#DC2626] shadow-sm">
          <AlertCircle size={18} />
          {status.message}
        </div>
      )}

      {/* Animated Success Popup */}
      <AnimatePresence>
        {status.type === "success" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              className="bg-white rounded-[2rem] p-10 max-w-sm w-full shadow-2xl text-center space-y-6 border border-green-100"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#111827]">Updated!</h3>
                <p className="text-[#6B7280] text-sm mt-3 font-medium leading-relaxed">The review screenshot has been updated successfully.</p>
              </div>
              <div className="pt-4">
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className="h-full bg-green-500"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-3 uppercase font-black tracking-[0.2em]">Redirecting...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white border border-[#E5E7EB] rounded-[2rem] p-8 md:p-12 space-y-8 shadow-sm">
        <div className="text-center space-y-2">
           <h3 className="text-2xl font-black text-[#111827]">Edit Review Image</h3>
           <p className="text-sm text-[#6B7280] font-medium">Update your customer's feedback screenshot.</p>
        </div>
        
        <div className="flex flex-col items-center">
          {/* Photo Section */}
          <div className="space-y-4 w-full">
            <div className={`relative border-2 border-dashed rounded-[2.5rem] p-8 transition-all min-h-[500px] flex flex-col items-center justify-center gap-6 ${
              isImageUrl(formData.avatar) ? 'border-blue-500/50 bg-blue-50/30' : 'border-gray-200 hover:border-blue-500/30 bg-gray-50'
            }`}>
              {isImageUrl(formData.avatar) ? (
                <div className="relative group w-full flex justify-center">
                  <img src={formData.avatar} alt="Review" className="max-h-[600px] rounded-2xl shadow-2xl border-4 border-white object-contain" />
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, avatar: ""})}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 transition-all hover:scale-110 z-10 border-4 border-white"
                  >
                    <X size={24} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-24 h-24 rounded-full bg-white border border-blue-100 flex items-center justify-center text-[#2563EB] shadow-lg">
                    {uploading ? <Loader2 className="animate-spin" size={40} /> : <ImageIcon size={40} />}
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-lg font-black text-[#111827]">Click to Update Screenshot</p>
                    <p className="text-sm text-[#6B7280] font-medium italic">Replace the current image with a new one</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

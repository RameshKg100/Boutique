"use client";

import { useState, useEffect } from "react";
import { 
  Star, 
  MapPin, 
  Trash2, 
  Edit3, 
  Plus, 
  Loader2,
  ChevronLeft,
  Search,
  CheckCircle2,
  XCircle
} from "lucide-react";
import Link from "next/link";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews", { cache: "no-store" });
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredReviews = reviews.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-2 text-white/40 hover:text-primary mb-4 transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Customer Reviews
          </h1>
          <p className="text-white/40 mt-1">Manage testimonials and update profile pictures.</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input
            type="text"
            placeholder="Search by name or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-white"
          />
        </div>
      </div>

      {/* Status Message */}
      {statusMsg.text && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${
          statusMsg.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-500"
        }`}>
          {statusMsg.type === "success" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
          {statusMsg.text}
        </div>
      )}

      {/* Reviews Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-neutral-900/50 rounded-3xl border border-white/5">
          <Loader2 className="animate-spin text-primary mb-4" size={40} />
          <p className="text-white/40 italic">Loading your fans' words...</p>
        </div>
      ) : filteredReviews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-neutral-900 border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20 text-primary font-black overflow-hidden shadow-inner">
                    {review.avatar && review.avatar.startsWith("http") ? (
                      <img src={review.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (review.avatar)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">{review.name}</h3>
                    <div className="flex items-center gap-2 text-white/40 text-xs mt-1">
                      <MapPin size={12} />
                      {review.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold">{review.rating}</span>
                </div>
              </div>

              <div className="mb-6 relative">
                <p className="text-white/60 text-sm leading-relaxed italic line-clamp-3">
                  "{review.text}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold">
                  {review.date}
                </span>
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/admin/reviews/edit/${review.id}`}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-primary hover:text-white transition-all text-white/60"
                  >
                    <Edit3 size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-neutral-900/50 rounded-3xl border border-white/5">
          <p className="text-white/40">No reviews found matching your search.</p>
        </div>
      )}
    </div>
  );
}

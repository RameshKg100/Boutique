"use client";

import { useState, useEffect } from "react";
import { 
  Star, 
  MapPin, 
  Trash2, 
  Edit3, 
  Loader2,
  Search,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchReviews(); }, []);

  async function fetchReviews() {
    try {
      setLoading(true);
      const res = await fetch("/api/reviews", { cache: "no-store" });
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    } finally { setLoading(false); }
  }

  const filteredReviews = reviews.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.text.toLowerCase().includes(search.toLowerCase())
  );

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
    : "—";

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">Reviews</h2>
          <p className="text-sm text-[#6B7280] mt-0.5">Manage customer feedback and testimonials.</p>
        </div>
        <Link 
          href="/admin/reviews/new"
          className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm"
        >
          <Edit3 size={16} />
          Add New Review
        </Link>
      </div>

      {/* Stats */}
      {!loading && reviews.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <MessageSquare size={18} />
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">Total</p>
              <p className="text-lg font-bold text-[#111827]">{reviews.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
              <Star size={18} className="fill-[#D97706]" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">Avg Rating</p>
              <p className="text-lg font-bold text-[#111827]">{avgRating}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-md bg-green-50 text-[#16A34A] flex items-center justify-center">
              <Star size={18} className="fill-[#16A34A]" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">5-Star</p>
              <p className="text-lg font-bold text-[#111827]">{reviews.filter(r => r.rating === 5).length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search + Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm">
        <div className="p-4 border-b border-[#E5E7EB]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={16} />
            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#E5E7EB] rounded-md text-sm text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-[#6B7280] uppercase tracking-wider border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <tr>
                <th className="px-4 py-3 font-medium">Review Photo / Screenshot</th>
                <th className="px-4 py-3 font-medium">Date Published</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-4 py-16 text-center">
                    <Loader2 className="animate-spin mx-auto text-[#2563EB] mb-2" size={28} />
                    <p className="text-sm text-[#6B7280]">Loading reviews...</p>
                  </td>
                </tr>
              ) : filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-4 py-16 text-center text-[#6B7280]">No reviews found.</td>
                </tr>
              ) : (
                filteredReviews.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F9FAFB] transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                         <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                            {r.avatar && r.avatar.startsWith("http") ? (
                               <img src={r.avatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                               <ImageIcon size={20} className="text-gray-300" />
                            )}
                         </div>
                         <div className="min-w-0 flex items-center">
                            <p className="text-sm font-bold text-[#111827]">Snapshot Review</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                       <span className="text-xs font-medium text-[#6B7280]">{r.date || "N/A"}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                       <div className="flex items-center justify-end gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                          <Link 
                            href={`/admin/reviews/edit/${r.id}`}
                            className="p-2 text-[#6B7280] hover:text-[#2563EB] hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit"
                          >
                            <Edit3 size={14} />
                          </Link>
                          <button 
                            className="p-2 text-[#6B7280] hover:text-[#DC2626] hover:bg-red-50 rounded-md transition-colors"
                            title="Delete"
                            onClick={async () => {
                              if (window.confirm("Are you sure you want to permanently delete this review?")) {
                                try {
                                  const res = await fetch(`/api/reviews?id=${r.id}`, { method: "DELETE" });
                                  if (res.ok) {
                                    // Refresh the list
                                    window.location.reload();
                                  } else {
                                    alert("Failed to delete review.");
                                  }
                                } catch (error) {
                                  alert("An error occurred during deletion.");
                                }
                              }
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

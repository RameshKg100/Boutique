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
                <th className="px-4 py-3 font-medium">Reviewer</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Content</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-16 text-center">
                    <Loader2 className="animate-spin mx-auto text-[#2563EB] mb-2" size={28} />
                    <p className="text-sm text-[#6B7280]">Loading reviews...</p>
                  </td>
                </tr>
              ) : filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-16 text-center text-[#6B7280]">No reviews match your search.</td>
                </tr>
              ) : (
                filteredReviews.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F9FAFB] transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                            {r.avatar && r.avatar.startsWith("http") ? (
                               <img src={r.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                            ) : (
                               <span className="text-[#2563EB] font-semibold text-[10px] uppercase">{r.name.slice(0, 2)}</span>
                            )}
                         </div>
                         <div className="min-w-0">
                            <p className="font-medium text-[#111827] text-sm">{r.name}</p>
                            <p className="text-[10px] text-[#6B7280] flex items-center gap-1 mt-0.5">
                               <MapPin size={9} /> {r.location}
                            </p>
                         </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                       <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={12} className={s <= r.rating ? "text-[#D97706] fill-[#D97706]" : "text-gray-200"} />
                          ))}
                       </div>
                    </td>
                    <td className="px-4 py-3 max-w-sm">
                       <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed">"{r.text}"</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                       <span className="text-xs text-[#6B7280]">{r.date || "N/A"}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                            onClick={() => alert("Deletion restricted in demo mode.")}
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

"use client";

import { useState, useEffect } from "react";
import { 
  Star, 
  MapPin, 
  Trash2, 
  Edit3, 
  Loader2,
  Search,
  CheckCircle2,
  XCircle,
  MessageSquare
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
    <div className="space-y-6 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Customer Feedback</h2>
          <p className="text-gray-500 mt-1">Monitor and manage your boutique's reputation.</p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF66A1] transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search by name or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 focus:border-[#FF66A1] focus:ring-2 focus:ring-[#FF66A1]/10 outline-none transition-all text-gray-900 text-sm font-medium"
          />
        </div>
      </div>

      {/* Status Message */}
      {statusMsg.text && (
        <div className={`p-4 rounded-lg flex items-center gap-3 font-bold text-sm ${
          statusMsg.type === "success" ? "bg-green-50 border border-green-100 text-green-600" : "bg-red-50 border border-red-100 text-red-600"
        }`}>
          {statusMsg.type === "success" ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          {statusMsg.text}
        </div>
      )}

      {/* Reviews Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Reviewer</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Content</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-[#FF66A1] mb-2" size={32} />
                    <p className="text-gray-400 text-sm font-medium italic">Synchronizing testimonials...</p>
                  </td>
                </tr>
              ) : filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-gray-400 font-medium italic">No reviews match your search.</td>
                </tr>
              ) : (
                filteredReviews.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center overflow-hidden shrink-0">
                            {r.avatar && r.avatar.startsWith("http") ? (
                               <img src={r.avatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                               <span className="text-[#FF66A1] font-bold text-xs uppercase">{r.name.slice(0, 2)}</span>
                            )}
                         </div>
                         <div className="min-w-0">
                            <p className="font-bold text-gray-900 border-b border-transparent hover:border-[#FF66A1] transition-all cursor-default">{r.name}</p>
                            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                               <MapPin size={10} className="text-[#FF66A1]" />
                               {r.location}
                            </div>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-1.5">
                          <Star size={16} className="text-amber-400 fill-amber-400" />
                          <span className="font-bold text-gray-900">{r.rating}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                       <p className="text-sm text-gray-600 italic line-clamp-2 leading-relaxed">"{r.text}"</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{r.date || "Just Now"}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <Link 
                            href={`/admin/reviews/edit/${r.id}`}
                            className="p-2.5 rounded-lg bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                            title="Edit Review"
                          >
                            <Edit3 size={18} />
                          </Link>
                          <button 
                            className="p-2.5 rounded-lg bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Remove Testimonial"
                            onClick={() => alert("Deletion restricted in demo mode.")}
                          >
                            <Trash2 size={18} />
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

      {/* Stats Summary Panel */}
      {!loading && reviews.length > 0 && (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-between">
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Mentions</p>
                  <h4 className="text-2xl font-black text-gray-900">{reviews.length}</h4>
               </div>
               <div className="p-3 bg-pink-50 text-[#FF66A1] rounded-lg">
                  <MessageSquare size={24} />
               </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center justify-between">
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Avg Rating</p>
                  <h4 className="text-2xl font-black text-gray-900">4.8</h4>
               </div>
               <div className="p-3 bg-amber-50 text-amber-500 rounded-lg">
                  <Star size={24} className="fill-amber-500" />
               </div>
            </div>
            <div className="bg-[#111827] p-6 rounded-xl text-white flex items-center justify-between">
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <h4 className="text-lg font-bold">Feedback High</h4>
               </div>
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111827] bg-gray-700" />)}
               </div>
            </div>
         </div>
      )}
    </div>
  );
}

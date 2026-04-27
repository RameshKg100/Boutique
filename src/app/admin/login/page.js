"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Simulate slight delay for professional feel
    setTimeout(() => {
      if (password === "12345") {
        localStorage.setItem("isAdminAuthenticated", "true");
        router.push("/admin");
      } else {
        setError("Invalid secret key. Please try again.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F9FAFB] font-sans">
      <div className="max-w-md w-full">
        {/* Brand Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2563EB] rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-3xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] tracking-tight">Admin Portal</h1>
          <p className="text-[#6B7280] text-sm mt-1.5 font-medium">Please enter your secure access key</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg text-[#DC2626] text-xs font-semibold flex items-center gap-2">
               <ShieldCheck size={14} />
               {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider ml-1">Access Key</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl pl-12 pr-4 py-3.5 text-[#111827] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all font-mono tracking-widest text-lg"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md shadow-blue-500/10 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Login to Dashboard
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-medium text-[#6B7280] hover:text-[#2563EB] transition-colors inline-flex items-center gap-2">
             <ArrowLeft size={14} />
             Back to Website
          </Link>
        </div>
      </div>
      
      {/* Footer Note */}
      <p className="mt-20 text-[11px] text-[#9CA3AF] font-medium uppercase tracking-[0.2em]">
        © 2026 Sashaa Boutiques
      </p>
    </div>
  );
}

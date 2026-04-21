"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate slight delay for professional feel
    setTimeout(() => {
      if (password === "12345") {
        localStorage.setItem("isAdminAuthenticated", "true");
        router.push("/admin");
      } else {
        alert("Invalid secret key. Please try again.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 font-sans">
      <div className="max-w-md w-full">
        {/* Logo/Brand Section */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#111827] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-3xl">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Sashaa Boutiques</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Administration Secure Gateway</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-xl shadow-gray-200/50">
          <div className="flex items-center gap-3 text-[#FF66A1] mb-8 font-bold text-sm uppercase tracking-wider">
             <ShieldCheck size={20} />
             Authentication Required
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide ml-1">Administrative Secret Key</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF66A1] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF66A1]/10 focus:border-[#FF66A1] transition-all font-mono tracking-widest"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Authorize Access"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors inline-flex items-center gap-2">
             Back to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

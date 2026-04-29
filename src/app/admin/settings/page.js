"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Save, Loader2, QrCode, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [settings, setSettings] = useState({ paymentQRCode: "" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSettings({ ...settings, paymentQRCode: data.url });
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const errorData = await res.json();
        alert("Failed to save settings: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("An error occurred while saving: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="animate-spin text-primary mb-4" size={48} />
        <p className="text-gray-500 font-medium italic">Loading store configuration...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Store Settings</h2>
          <p className="text-gray-500 mt-1 font-medium">Configure your boutique's global settings and payment methods.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || uploading}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-md disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {success ? "Saved successfully!" : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment QR Code Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
            <QrCode className="text-primary" size={20} />
            <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">Payment QR Code</h3>
          </div>
          <div className="p-8 flex flex-col items-center text-center">
            <div className="relative aspect-square w-64 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden group">
              {settings.paymentQRCode ? (
                <>
                  <Image
                    src={settings.paymentQRCode}
                    alt="Payment QR Code"
                    fill
                    className="object-contain p-4"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-xs shadow-xl hover:scale-105 transition-transform">
                      Change QR Code
                      <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                    </label>
                  </div>
                </>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                  {uploading ? (
                    <Loader2 className="animate-spin text-primary" size={40} />
                  ) : (
                    <>
                      <Upload size={40} />
                      <span className="text-sm font-semibold">Upload Business QR Code</span>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                </label>
              )}
            </div>
            <p className="mt-6 text-xs text-gray-500 font-medium leading-relaxed max-w-xs">
              This QR code will be displayed to customers on the checkout page after they provide their delivery details.
            </p>
            
            {!settings.paymentQRCode && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg text-[10px] text-amber-700 font-medium animate-pulse">
                ⚠️ QR Code not set. Upload your business QR to enable payments.
              </div>
            )}

            {success && (
              <div className="mt-4 flex items-center gap-2 text-green-600 font-bold text-sm animate-bounce">
                <CheckCircle2 size={16} />
                Saved to Database!
              </div>
            )}
          </div>
        </div>

        {/* Database Status & Help */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">System Status</h3>
                <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live</span>
                </div>
             </div>
             <div className="p-6 space-y-4">
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                  <h4 className="font-bold text-primary text-[11px] uppercase tracking-wider mb-2">Required Action for Vercel</h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Since you are hosted on Vercel, settings must be stored in your **Supabase Database**. If saving fails, ensure you have run this command in your Supabase SQL Editor:
                  </p>
                  <pre className="mt-3 p-3 bg-gray-900 text-gray-300 text-[9px] rounded-lg overflow-x-auto border border-gray-800 font-mono">
{`create table if not exists store_settings (
  id bigint primary key generated always as identity,
  key text unique not null,
  value text
);

alter table store_settings disable row level security;

insert into store_settings (key, value) 
values ('payment_qr_code', '')
on conflict (key) do nothing;`}
                  </pre>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                   <h4 className="font-bold text-gray-900 text-[11px] uppercase tracking-wider mb-2">Checkout Preview</h4>
                   <div className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center relative overflow-hidden border border-gray-200">
                         {settings.paymentQRCode ? (
                           <Image src={settings.paymentQRCode} alt="Preview" fill className="object-contain p-1" />
                         ) : (
                           <QrCode size={16} className="text-gray-300" />
                         )}
                      </div>
                      <div>
                         <p className="text-[11px] font-bold text-gray-900">QR Payment Screen</p>
                         <p className="text-[9px] text-gray-400">
                           {settings.paymentQRCode ? "✅ Link ready" : "❌ No image linked"}
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

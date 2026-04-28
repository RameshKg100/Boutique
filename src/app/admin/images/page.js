"use client";

import { useState, useEffect } from "react";
import {
  ImageIcon,
  Upload,
  Trash2,
  Loader2,
  GripVertical,
  Eye,
  EyeOff,
  Plus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function AdminImagesPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      setLoading(true);
      const res = await fetch("/api/hero-images", { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) {
        setImages(data);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
      showMessage("error", "Failed to load images.");
    } finally {
      setLoading(false);
    }
  }

  function showMessage(type, text) {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  }

  async function handleFileUpload(files) {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      for (const file of files) {
        // 1. Upload file to storage
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (!uploadData.success) {
          throw new Error(uploadData.error || "Upload failed");
        }

        // 2. Save reference in hero_images table
        const addRes = await fetch("/api/hero-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "add",
            url: uploadData.url,
            display_order: images.length,
            active: true,
          }),
        });
        const addData = await addRes.json();
        if (!addData.success) {
          throw new Error("Failed to save image reference");
        }
      }

      showMessage("success", `${files.length} image(s) uploaded successfully!`);
      fetchImages();
    } catch (error) {
      console.error("Upload error:", error);
      showMessage("error", error.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to remove this image?")) return;

    try {
      const res = await fetch("/api/hero-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      const data = await res.json();
      if (data.success) {
        showMessage("success", "Image removed successfully.");
        fetchImages();
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      showMessage("error", "Failed to delete image.");
    }
  }

  async function handleToggleActive(img) {
    try {
      const res = await fetch("/api/hero-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id: img.id,
          url: img.url,
          display_order: img.display_order,
          active: !img.active,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchImages();
      }
    } catch (error) {
      showMessage("error", "Failed to update image.");
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    handleFileUpload(files);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">Homepage Images</h2>
          <p className="text-sm text-[#6B7280] mt-0.5">
            Manage the hero carousel images displayed on the website homepage.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
          <ImageIcon size={14} />
          <span>{images.filter((i) => i.active).length} active images</span>
        </div>
      </div>

      {/* Status Message */}
      {message.text && (
        <div
          className={`flex items-center gap-3 p-4 rounded-lg border text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          {message.text}
        </div>
      )}

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 cursor-pointer ${
          dragOver
            ? "border-[#2563EB] bg-blue-50/60"
            : "border-[#E5E7EB] bg-white hover:border-[#2563EB]/40 hover:bg-blue-50/20"
        }`}
        onClick={() => document.getElementById("hero-image-input").click()}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="animate-spin text-[#2563EB]" size={36} />
            <p className="text-sm font-medium text-[#6B7280]">Uploading images...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Upload size={24} className="text-[#2563EB]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                Drop images here or{" "}
                <span className="text-[#2563EB]">browse</span>
              </p>
              <p className="text-xs text-[#6B7280] mt-1">
                PNG, JPG, WEBP — recommended 600×800px or larger
              </p>
            </div>
          </div>
        )}
        <input
          id="hero-image-input"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileUpload(Array.from(e.target.files))}
        />
      </div>

      {/* Images Grid */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-sm">
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#111827]">
            Hero Carousel Images
          </h3>
          <span className="text-xs text-[#6B7280]">
            {images.length} total · {images.filter((i) => i.active).length} visible
          </span>
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <Loader2 className="animate-spin mx-auto text-[#2563EB] mb-3" size={28} />
            <p className="text-sm text-[#6B7280]">Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="p-16 text-center">
            <ImageIcon className="mx-auto text-[#D1D5DB] mb-3" size={40} />
            <p className="text-sm text-[#6B7280] font-medium">No images yet</p>
            <p className="text-xs text-[#9CA3AF] mt-1">
              Upload your first hero image above to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {images.map((img, index) => (
              <div
                key={img.id}
                className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  img.active
                    ? "border-[#2563EB]/30 shadow-md"
                    : "border-[#E5E7EB] opacity-60"
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-gray-100">
                  <img
                    src={img.url}
                    alt={`Hero image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleToggleActive(img)}
                      className={`p-2.5 rounded-lg backdrop-blur-sm transition-colors ${
                        img.active
                          ? "bg-white/90 text-[#111827] hover:bg-white"
                          : "bg-[#2563EB]/90 text-white hover:bg-[#2563EB]"
                      }`}
                      title={img.active ? "Hide from homepage" : "Show on homepage"}
                    >
                      {img.active ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="p-2.5 rounded-lg bg-[#DC2626]/90 text-white hover:bg-[#DC2626] backdrop-blur-sm transition-colors"
                      title="Delete image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Status Footer */}
                <div className="p-2.5 bg-white flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#6B7280]">
                    #{index + 1}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      img.active
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {img.active ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Note */}
      <div className="flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
        <AlertCircle size={18} className="text-[#2563EB] mt-0.5 shrink-0" />
        <div className="text-xs text-[#6B7280] leading-relaxed">
          <p className="font-semibold text-[#111827] mb-1">How it works</p>
          <p>
            Images uploaded here will automatically appear in the hero carousel on the
            website homepage. Toggle visibility with the eye icon, or delete images
            you no longer need. Active images are shown in order.
          </p>
        </div>
      </div>
    </div>
  );
}

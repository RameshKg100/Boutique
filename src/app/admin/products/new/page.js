"use client";

import ProductForm from "@/components/admin/ProductForm";

export default function AddProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          New Masterpiece
        </h1>
        <p className="text-white/40">Add a beautiful new dress to your premium collection.</p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}

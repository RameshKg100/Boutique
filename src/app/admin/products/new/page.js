"use client";

import ProductForm from "@/components/admin/ProductForm";

export default function AddProductPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Add New Masterpiece</h2>
        <p className="text-gray-500 mt-1 font-medium">Record a new addition to your premium boutique collection.</p>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}

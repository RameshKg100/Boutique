"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { Loader2 } from "lucide-react";

function EditProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        const found = data.find(p => String(p.id) === String(id));

        setProduct(found);
      } catch (error) {
        console.error("Failed to fetch product for editing:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="animate-spin text-[#FF66A1] mb-6" size={48} />
        <p className="text-gray-400 font-medium italic">Retrieving collection details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-40 bg-white rounded-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Item Not Located</h2>
        <p className="text-gray-500 font-medium">The product you are attempting to modify could not be found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Refine Collection Item</h2>
        <p className="text-gray-500 mt-1 font-medium italic">Modifying "{product.name}"</p>
      </div>
      <ProductForm mode="edit" initialData={product} />
    </div>
  );
}

export default function EditProductPage() {
  return (
    <Suspense fallback={
       <div className="flex flex-col items-center justify-center py-40">
          <Loader2 className="animate-spin text-[#FF66A1]" size={40} />
       </div>
    }>
      <EditProductContent />
    </Suspense>
  );
}

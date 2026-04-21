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
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="animate-spin text-primary mb-4" size={48} />
        <p className="text-white/40 italic">Loading dress details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
        <p className="text-white/40">The dress you are trying to edit does not exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Edit Dress Details
        </h1>
        <p className="text-white/40">Update information and images for "{product.name}".</p>
      </div>
      <ProductForm mode="edit" initialData={product} />
    </div>
  );
}

export default function EditProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProductContent />
    </Suspense>
  );
}

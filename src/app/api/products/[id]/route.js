import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const KV_PRODUCTS_KEY = "boutique_products";

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    let products = await kv.get(KV_PRODUCTS_KEY);
    
    if (!products) {
      return NextResponse.json({ error: "Storage is empty" }, { status: 404 });
    }

    const initialLength = products.length;
    products = products.filter((p) => p.id !== id);
    
    if (products.length === initialLength) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update cloud store
    await kv.set(KV_PRODUCTS_KEY, products);

    return NextResponse.json({ success: true, message: "Product deleted from cloud store" });
  } catch (error) {
    console.error("Error deleting from KV:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

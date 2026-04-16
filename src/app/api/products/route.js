import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import fs from "fs";
import path from "path";

// Cache key for products in KV
const KV_PRODUCTS_KEY = "boutique_products";

// Helper to seed KV from local JSON (only runs if KV is empty)
const seedKVIfEmpty = async () => {
  try {
    const existing = await kv.get(KV_PRODUCTS_KEY);
    if (!existing) {
      const localFilePath = path.join(process.cwd(), "src/data/products.json");
      const localData = fs.readFileSync(localFilePath, "utf8");
      const products = JSON.parse(localData);
      await kv.set(KV_PRODUCTS_KEY, products);
      console.log("Seeded KV store with local products.json");
      return products;
    }
    return existing;
  } catch (error) {
    console.error("KV Seeding failed:", error);
    return [];
  }
};

export async function GET() {
  try {
    // Attempt to get from cloud storage first
    let products = await kv.get(KV_PRODUCTS_KEY);
    
    // Fallback/Seed if empty
    if (!products) {
      products = await seedKVIfEmpty();
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error reading from KV:", error);
    // Ultimate fallback for safety
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    const newProduct = await request.json();
    let products = await kv.get(KV_PRODUCTS_KEY);
    
    if (!products) {
      products = await seedKVIfEmpty();
    }

    // Update or Create
    if (newProduct.id) {
      const index = products.findIndex((p) => p.id === newProduct.id);
      if (index !== -1) {
        products[index] = { ...products[index], ...newProduct };
      } else {
        products.push(newProduct);
      }
    } else {
      const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
      const productToSave = {
        ...newProduct,
        id: maxId + 1,
        slug: newProduct.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""),
        rating: 0,
        reviews: 0,
      };
      products.push(productToSave);
    }

    // Save to Cloud Persistence
    await kv.set(KV_PRODUCTS_KEY, products);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json({ error: "Failed to save to cloud database" }, { status: 500 });
  }
}

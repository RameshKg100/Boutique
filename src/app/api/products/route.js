import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import fs from "fs";
import path from "path";

// Cache key for products in KV
const KV_PRODUCTS_KEY = "boutique_products";

// Check if KV is configured
const isKVEnabled = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// Fallback to local file for development
const localFilePath = path.join(process.cwd(), "src/data/products.json");

// Helper to seed KV from local JSON (only runs if KV is empty)
const seedKVIfEmpty = async () => {
  if (!isKVEnabled) return null;
  try {
    const existing = await kv.get(KV_PRODUCTS_KEY);
    if (!existing) {
      const localData = fs.readFileSync(localFilePath, "utf8");
      const products = JSON.parse(localData);
      await kv.set(KV_PRODUCTS_KEY, products);
      return products;
    }
    return existing;
  } catch (error) {
    return null;
  }
};

const readLocalProducts = () => {
  try {
    const data = fs.readFileSync(localFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeLocalProducts = (products) => {
  try {
    fs.writeFileSync(localFilePath, JSON.stringify(products, null, 2), "utf8");
    return true;
  } catch (error) {
    return false;
  }
};

export async function GET() {
  try {
    if (!isKVEnabled) {
      return NextResponse.json(readLocalProducts());
    }

    let products = await kv.get(KV_PRODUCTS_KEY);
    if (!products) {
      products = await seedKVIfEmpty();
    }
    return NextResponse.json(products || readLocalProducts());
  } catch (error) {
    return NextResponse.json(readLocalProducts());
  }
}

export async function POST(request) {
  try {
    const newProduct = await request.json();
    
    let products;
    if (isKVEnabled) {
      products = await kv.get(KV_PRODUCTS_KEY);
      if (!products) products = await seedKVIfEmpty();
    } else {
      products = readLocalProducts();
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

    // Save to Persistence
    if (isKVEnabled) {
      await kv.set(KV_PRODUCTS_KEY, products);
    } else {
      writeLocalProducts(products);
    }

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}

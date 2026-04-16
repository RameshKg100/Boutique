import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import fs from "fs";
import path from "path";

const KV_PRODUCTS_KEY = "boutique_products";
const isKVEnabled = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
const localFilePath = path.join(process.cwd(), "src/data/products.json");

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

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    let products;

    if (isKVEnabled) {
      products = await kv.get(KV_PRODUCTS_KEY);
    } else {
      products = readLocalProducts();
    }
    
    if (!products) {
      return NextResponse.json({ error: "Storage is empty" }, { status: 404 });
    }

    const initialLength = products.length;
    products = products.filter((p) => Number(p.id) !== Number(id));
    
    if (products.length === initialLength) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (isKVEnabled) {
      await kv.set(KV_PRODUCTS_KEY, products);
    } else {
      writeLocalProducts(products);
    }

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

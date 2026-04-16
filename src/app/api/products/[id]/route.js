import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const productsFilePath = path.join(process.cwd(), "src/data/products.json");

const readProducts = () => {
  try {
    const data = fs.readFileSync(productsFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeProducts = (products) => {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), "utf8");
    return true;
  } catch (error) {
    return false;
  }
};

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    let products = readProducts();
    
    const initialLength = products.length;
    products = products.filter((p) => p.id !== id);
    
    if (products.length === initialLength) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const success = writeProducts(products);
    if (!success) {
      return NextResponse.json({ error: "Failed to update storage" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const productsFilePath = path.join(process.cwd(), "src/data/products.json");

// Helper to read products
const readProducts = () => {
  try {
    const data = fs.readFileSync(productsFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading products.json:", error);
    return [];
  }
};

// Helper to write products
const writeProducts = (products) => {
  try {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing to products.json:", error);
    return false;
  }
};

export async function GET() {
  const products = readProducts();
  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    const newProduct = await request.json();
    let products = readProducts();

    // If it has an ID, we update, otherwise we create
    if (newProduct.id) {
      const index = products.findIndex((p) => p.id === newProduct.id);
      if (index !== -1) {
        products[index] = { ...products[index], ...newProduct };
      } else {
        // Handle as new if ID not found but provided (unlikely case)
        products.push(newProduct);
      }
    } else {
      // Create new with auto-increment ID
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

    const success = writeProducts(products);
    if (!success) {
      return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
    }

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }
}

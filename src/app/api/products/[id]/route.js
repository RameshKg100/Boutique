import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

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
    const id = params.id;

    if (supabase) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true, message: "Product deleted" });
    } else {
      let products = readLocalProducts();
      
      if (!products) {
        return NextResponse.json({ error: "Storage is empty" }, { status: 404 });
      }

      const initialLength = products.length;
      products = products.filter((p) => String(p.id) !== String(id));
      
      if (products.length === initialLength) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      writeLocalProducts(products);
      return NextResponse.json({ success: true, message: "Product deleted" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

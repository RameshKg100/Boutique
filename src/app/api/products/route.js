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

export async function GET() {
  try {
    if (supabase) {
      const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
        
      if (error) {
        console.error("Supabase GET error:", error);
        return NextResponse.json(readLocalProducts());
      }
      return NextResponse.json(products || []);
    }
    return NextResponse.json(readLocalProducts());
  } catch (error) {
    return NextResponse.json(readLocalProducts());
  }
}

export async function POST(request) {
  try {
    const newProduct = await request.json();
    
    const generatedSlug = newProduct.name 
        ? newProduct.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") 
        : newProduct.slug;
        
    const productData = {
        ...newProduct,
        slug: generatedSlug,
        rating: newProduct.rating || 0,
        reviews: newProduct.reviews || 0,
    };

    if (supabase) {
      if (newProduct.id) {
         const { data, error } = await supabase
           .from('products')
           .update(productData)
           .eq('id', newProduct.id)
           .select();
           
         if (error) throw error;
         return NextResponse.json({ success: true, product: data[0] });
      } else {
         if (!productData.id) {
           delete productData.id;
         }
         
         const { data, error } = await supabase
           .from('products')
           .insert([productData])
           .select();
           
         if (error) throw error;
         return NextResponse.json({ success: true, product: data[0] });
      }
    } else {
      let products = readLocalProducts();
      
      if (newProduct.id) {
        const index = products.findIndex((p) => Number(p.id) === Number(newProduct.id));
        if (index !== -1) {
          const updatedProduct = { 
            ...products[index], 
            ...productData
          };
          products[index] = updatedProduct;
        } else {
          products.push(productData);
        }
      } else {
        const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
        productData.id = maxId + 1;
        products.push(productData);
      }

      writeLocalProducts(products);
      return NextResponse.json({ success: true, product: productData });
    }
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to save data: " + error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    if (supabase) {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return NextResponse.json({ success: true });
    } else {
      let products = readLocalProducts();
      products = products.filter(p => Number(p.id) !== Number(id));
      writeLocalProducts(products);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

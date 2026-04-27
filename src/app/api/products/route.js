import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import fs from "fs";
import path from "path";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
        .select(`
          *,
          category:categories(name, slug)
        `)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Supabase GET error:", error);
        return NextResponse.json(readLocalProducts());
      }

      // Map snake_case to camelCase and extract category name
      const mappedProducts = products.map(p => ({
        ...p,
        category: p.category?.slug || 'all',
        categoryName: p.category?.name || 'Uncategorized',
        shortDescription: p.short_description,
        originalPrice: p.original_price,
        isFeatured: p.is_featured,
        isNew: p.is_new,
        inStock: p.in_stock,
        // Keep the original fields just in case
      }));

      return NextResponse.json(mappedProducts);
    }
    return NextResponse.json(readLocalProducts());
  } catch (error) {
    console.error("API GET Catch error:", error);
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
        name: newProduct.name,
        slug: generatedSlug,
        description: newProduct.description,
        short_description: newProduct.shortDescription,
        price: newProduct.price,
        original_price: newProduct.originalPrice,
        images: newProduct.images || [],
        sizes: newProduct.sizes || [],
        colors: newProduct.colors || [],
        is_featured: newProduct.isFeatured || false,
        is_new: newProduct.isNew || false,
        in_stock: newProduct.inStock || true,
    };

    if (supabaseAdmin) {
      // 1. Get Category ID from slug
      const { data: catData, error: catError } = await supabaseAdmin
        .from('categories')
        .select('id')
        .eq('slug', newProduct.category)
        .single();
      
      if (catData) {
        productData.category_id = catData.id;
      }

      if (newProduct.id && isNaN(newProduct.id)) { // UUID check
         const { data, error } = await supabaseAdmin
           .from('products')
           .update(productData)
           .eq('id', newProduct.id)
           .select();
           
         if (error) throw error;
         return NextResponse.json({ success: true, product: data[0] });
      } else {
         // If it's a new product or has a numeric ID (from local storage)
         const { data, error } = await supabaseAdmin
           .from('products')
           .insert([productData])
           .select();
           
         if (error) throw error;
         return NextResponse.json({ success: true, product: data[0] });
      }
    } else {
      let products = readLocalProducts();
      const localProductData = {
        ...newProduct,
        slug: generatedSlug,
        rating: newProduct.rating || 0,
        reviews: newProduct.reviews || 0,
      };
      
      if (newProduct.id) {
        const index = products.findIndex((p) => String(p.id) === String(newProduct.id));
        if (index !== -1) {
          products[index] = { ...products[index], ...localProductData };
        } else {
          products.push(localProductData);
        }
      } else {
        const maxId = products.reduce((max, p) => (Number(p.id) > max ? Number(p.id) : max), 0);
        localProductData.id = maxId + 1;
        products.push(localProductData);
      }

      writeLocalProducts(products);
      return NextResponse.json({ success: true, product: localProductData });
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

    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return NextResponse.json({ success: true });
    } else {
      let products = readLocalProducts();
      products = products.filter(p => String(p.id) !== String(id));
      writeLocalProducts(products);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}


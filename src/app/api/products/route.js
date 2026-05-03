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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');

    if (supabase) {
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories(name, slug)
        `);
        
      if (slug) {
        query = query.eq('slug', slug).single();
      } else if (category) {
        // Need to join with categories to filter by slug
        // Actually, the category filter should probably be on category_id
        // But for simplicity, let's just fetch all and filter in JS if category join is complex
        // Or better: filter by category.slug
        query = query.eq('categories.slug', category).order('created_at', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
        
      if (error) {
        console.error("Supabase GET error:", error);
        const localData = readLocalProducts();
        if (slug) return NextResponse.json(localData.find(p => p.slug === slug) || null);
        if (category) return NextResponse.json(localData.filter(p => p.category === category));
        return NextResponse.json(localData);
      }

      const mapProduct = (p) => {
        if (!p) return null;
        return {
          ...p,
          category: p.category?.slug || p.category || 'all',
          categoryName: p.category?.name || 'Uncategorized',
          shortDescription: p.short_description || p.shortDescription,
          originalPrice: p.original_price || p.originalPrice,
          isFeatured: p.is_featured || p.isFeatured,
          isNew: p.is_new || p.isNew,
          inStock: p.in_stock || p.inStock,
        };
      };

      if (slug) {
        if (!data) return NextResponse.json(null);
        return NextResponse.json(mapProduct(data));
      }
      
      // Handle the case where data might be filtered by category but still needs mapping
      const dataArray = Array.isArray(data) ? data : (data ? [data] : []);
      return NextResponse.json(dataArray.map(mapProduct));
    }

    const localData = readLocalProducts();
    if (slug) return NextResponse.json(localData.find(p => p.slug === slug) || null);
    if (category) return NextResponse.json(localData.filter(p => p.category === category));
    return NextResponse.json(localData);
  } catch (error) {
    console.error("API GET Catch error:", error);
    return NextResponse.json([]);
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
        is_featured: newProduct.isFeatured ?? false,
        is_new: newProduct.isNew ?? false,
        in_stock: newProduct.inStock ?? true,
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


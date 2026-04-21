import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import fs from "fs";
import path from "path";
import { reviews } from "@/data/reviews";
import { categories as staticCategories } from "@/data/products";

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ success: false, error: "Supabase not connected. check .env.local" }, { status: 500 });
    }


    // 1. Data eduka (Products)
    const localFilePath = path.join(process.cwd(), "src/data/products.json");
    const localData = fs.readFileSync(localFilePath, "utf8");
    const productsData = JSON.parse(localData);

    const results = {
      categories: { added: 0, errors: [] },
      products: { added: 0, errors: [] },
      reviews: { added: 0, errors: [] }
    };

    // 2. Insert Categories
    const categoryMap = {}; // name -> id
    for (const cat of staticCategories) {
      if (cat.slug === 'all') continue;
      
      const { data, error } = await supabaseAdmin
        .from("categories")
        .upsert({ name: cat.name, slug: cat.slug }, { onConflict: 'slug' })
        .select();

      if (error) {
        results.categories.errors.push({ name: cat.name, error: error.message });
      } else {
        categoryMap[cat.slug] = data[0].id;
        results.categories.added++;
      }
    }

    // 3. Insert Products
    for (const product of productsData) {
      const dbProduct = {
        name: product.name,
        slug: product.slug,
        description: product.description,
        short_description: product.shortDescription,
        price: product.price,
        original_price: product.originalPrice || null,
        images: product.images || [],
        sizes: product.sizes || [],
        colors: product.colors || [],
        is_featured: product.isFeatured || false,
        is_new: product.isNew || false,
        in_stock: product.inStock || true,
        category_id: categoryMap[product.category] || null
      };

      const { error } = await supabaseAdmin
        .from("products")
        .upsert([dbProduct], { onConflict: 'slug' });
      
      if (error) {
        results.products.errors.push({ name: product.name, error: error.message });
      } else {
        results.products.added++;
      }
    }

    /* 4. Insert Reviews
    for (const review of reviews) {
      const dbReview = {
        user_name: review.name,
        user_location: review.location,
        rating: review.rating,
        comment: review.text,
        status: "PUBLISHED"
      };

      const { error } = await supabaseAdmin.from("reviews").insert([dbReview]);

      if (error) {
        results.reviews.errors.push({ name: review.name, error: error.message });
      } else {
        results.reviews.added++;
      }
    } */


    return NextResponse.json({ 
      success: true, 
      message: "Data Migration Complete!", 
      results
    });

  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

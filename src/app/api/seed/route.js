import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";
import { reviews } from "@/data/reviews";

export async function GET() {
  try {
    // 1. Data eduka (Products)
    const localFilePath = path.join(process.cwd(), "src/data/products.json");
    const localData = fs.readFileSync(localFilePath, "utf8");
    const productsData = JSON.parse(localData);

    let insertedProductsCount = 0;
    let insertedReviewsCount = 0;

    // 2. Insert Products
    for (const product of productsData) {
      // Map JSON to match Database columns
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
      };

      const { error } = await supabase.from("products").insert([dbProduct]);
      if (error) {
        // Ignores unique slug errors if you run this multiple times
        if (error.code !== '23505') {
            console.error("Product Insert Error:", error);
        }
      } else {
        insertedProductsCount++;
      }
    }

    // 3. Insert Reviews
    for (const review of reviews) {
      const dbReview = {
        user_name: review.name,
        user_location: review.location,
        rating: review.rating,
        comment: review.text,
        status: "PUBLISHED"
      };

      const { error } = await supabase.from("reviews").insert([dbReview]);
      if (error) {
        console.error("Review Insert Error:", error);
      } else {
        insertedReviewsCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Data Migration Complete!", 
      productsAdded: insertedProductsCount,
      reviewsAdded: insertedReviewsCount
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

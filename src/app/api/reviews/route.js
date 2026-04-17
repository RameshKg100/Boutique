import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import fs from "fs";
import path from "path";

// Cache key for reviews in KV
const KV_REVIEWS_KEY = "boutique_reviews";

// Check if KV is configured
const isKVEnabled = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// Fallback to local file for development
const localFilePath = path.join(process.cwd(), "src/data/reviews.json");

// Helper to seed KV from local JSON (only runs if KV is empty)
const seedKVIfEmpty = async () => {
  if (!isKVEnabled) return null;
  try {
    const existing = await kv.get(KV_REVIEWS_KEY);
    if (!existing) {
      const localData = fs.readFileSync(localFilePath, "utf8");
      const reviews = JSON.parse(localData);
      await kv.set(KV_REVIEWS_KEY, reviews);
      return reviews;
    }
    return existing;
  } catch (error) {
    return null;
  }
};

const readLocalReviews = () => {
  try {
    const data = fs.readFileSync(localFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeLocalReviews = (reviews) => {
  try {
    fs.writeFileSync(localFilePath, JSON.stringify(reviews, null, 2), "utf8");
    return true;
  } catch (error) {
    return false;
  }
};

export async function GET() {
  try {
    if (!isKVEnabled) {
      return NextResponse.json(readLocalReviews());
    }

    let reviews = await kv.get(KV_REVIEWS_KEY);
    if (!reviews) {
      reviews = await seedKVIfEmpty();
    }
    return NextResponse.json(reviews || readLocalReviews());
  } catch (error) {
    return NextResponse.json(readLocalReviews());
  }
}

export async function POST(request) {
  try {
    const updatedReview = await request.json();
    
    let reviews;
    if (isKVEnabled) {
      reviews = await kv.get(KV_REVIEWS_KEY);
      if (!reviews) reviews = await seedKVIfEmpty();
    } else {
      reviews = readLocalReviews();
    }

    // Update or Create
    if (updatedReview.id) {
      const index = reviews.findIndex((r) => Number(r.id) === Number(updatedReview.id));
      if (index !== -1) {
        // Update existing review
        reviews[index] = { ...reviews[index], ...updatedReview };
      } else {
        reviews.push(updatedReview);
      }
    } else {
      const maxId = reviews.reduce((max, r) => (r.id > max ? r.id : max), 0);
      const reviewToSave = {
        ...updatedReview,
        id: maxId + 1,
        date: new Date().toISOString().split('T')[0]
      };
      reviews.push(reviewToSave);
    }

    // Save to Persistence
    if (isKVEnabled) {
      await kv.set(KV_REVIEWS_KEY, reviews);
    } else {
      writeLocalReviews(reviews);
    }

    return NextResponse.json({ success: true, review: updatedReview });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not connected" }, { status: 500 });
    }

    const { data, error } = await supabaseAdmin
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Map Supabase fields to frontend fields
    const mappedReviews = data.map(r => ({
      id: r.id,
      name: r.user_name,
      location: r.user_location,
      rating: r.rating,
      text: r.comment,
      avatar: r.avatar || (r.user_name ? r.user_name.slice(0, 2).toUpperCase() : "??"),
      date: new Date(r.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }),
      status: r.status
    }));

    return NextResponse.json(mappedReviews);
  } catch (error) {
    console.error("API Error (GET):", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not connected" }, { status: 500 });
    }

    const body = await request.json();
    
    const dbReview = {
      user_name: body.name,
      user_location: body.location,
      rating: parseInt(body.rating),
      comment: body.text,
      avatar: body.avatar,
      status: body.status || "PUBLISHED"
    };

    let result;
    
    // If ID is a UUID (contains a hyphen), it's an update
    if (body.id && body.id.toString().includes("-")) {
      result = await supabaseAdmin
        .from("reviews")
        .update(dbReview)
        .eq("id", body.id);
    } else {
      // Create new
      result = await supabaseAdmin
        .from("reviews")
        .insert([dbReview]);
    }

    if (result.error) throw result.error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error (POST):", error);
    return NextResponse.json({ error: error.message || "Failed to save review" }, { status: 500 });
  }
}

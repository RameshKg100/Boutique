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
    const mappedReviews = data.map(r => {
      // Handle combined comment and photo
      let text = r.comment || "";
      let photo = "";
      
      if (text.includes("|||")) {
        const parts = text.split("|||");
        text = parts[0].trim();
        photo = parts[1].trim();
      }

      return {
        id: r.id,
        name: r.user_name,
        location: r.user_location,
        rating: r.rating,
        text: text,
        avatar: photo || (r.user_name ? r.user_name.slice(0, 2).toUpperCase() : "??"),
        date: new Date(r.created_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }),
        status: r.status
      };
    });

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
    
    // Combine text and avatar into the comment field since 'avatar' column is missing
    const combinedComment = body.avatar ? `${body.text} ||| ${body.avatar}` : body.text;

    const dbReview = {
      user_name: body.name,
      user_location: body.location,
      rating: parseInt(body.rating),
      comment: combinedComment,
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

export async function DELETE(request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not connected" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Review ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("reviews")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error (DELETE):", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}

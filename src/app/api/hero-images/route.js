import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not connected" }, { status: 500 });
    }

    const { data, error } = await supabaseAdmin
      .from("hero_images")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      // If table doesn't exist, return empty array instead of crashing
      if (error.code === 'PGRST116' || error.code === '42P01') {
        console.warn("hero_images table does not exist yet.");
        return NextResponse.json([]);
      }
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Hero images fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase not connected" }, { status: 500 });
    }

    const body = await request.json();
    const { action, id, url, display_order, active } = body;

    if (action === "delete") {
      const { error } = await supabaseAdmin
        .from("hero_images")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    if (action === "update") {
      const { error } = await supabaseAdmin
        .from("hero_images")
        .update({ url, display_order, active })
        .eq("id", id);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    if (action === "add") {
      const { error } = await supabaseAdmin
        .from("hero_images")
        .insert([{ url, display_order: display_order || 0, active: active !== undefined ? active : true }]);
      if (error) throw error;
      return NextResponse.json({ success: true });
    }

    if (action === "reorder") {
       const { images } = body;
       for (const img of images) {
          const { error } = await supabaseAdmin
             .from("hero_images")
             .update({ display_order: img.display_order })
             .eq("id", img.id);
          if (error) throw error;
       }
       return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Hero images post error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('order_index', { ascending: true });
        
      if (error) throw error;
      return NextResponse.json(data);
    }
    // Fallback for local
    return NextResponse.json([
      { name: "Maxis", slug: "maxis", order_index: 1 },
      { name: "Feeding Maxis", slug: "feeding-maxis", order_index: 2 },
      { name: "Tops", slug: "tops", order_index: 3 },
      { name: "Kurtis", slug: "kurtis", order_index: 4 },
      { name: "Sarees", slug: "sarees", order_index: 5 },
    ]);
  } catch (error) {
    console.error("Categories GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, order_index } = await request.json();
    const slug = name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('categories')
        .insert([{ name, slug, order_index }])
        .select();
      
      if (error) throw error;
      return NextResponse.json({ success: true, category: data[0] });
    }
    return NextResponse.json({ error: "Service key missing" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (supabaseAdmin && id) {
      const { error } = await supabaseAdmin
        .from('categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

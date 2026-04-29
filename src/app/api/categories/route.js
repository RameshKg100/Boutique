import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (supabase) {
      const { data: categories, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) {
        console.error("Supabase categories GET error:", error);
        return NextResponse.json([]);
      }
      return NextResponse.json(categories);
    }
    // Fallback to static if no supabase
    return NextResponse.json([
      { id: 1, name: "Maxis", slug: "maxis", display_order: 1 },
      { id: 2, name: "Sarees", slug: "sarees", display_order: 4 },
      { id: 3, name: "Tops", slug: "tops", display_order: 3 },
      { id: 4, name: "Kurtis", slug: "kurtis", display_order: 3 },
    ]);
  } catch (error) {
    console.error("API categories GET Catch error:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    const categoryData = await request.json();
    
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('categories')
        .upsert(categoryData, { onConflict: 'slug' })
        .select();
        
      if (error) throw error;
      return NextResponse.json({ success: true, category: data[0] });
    }
    return NextResponse.json({ success: false, error: "No Supabase Admin" });
  } catch (error) {
    console.error("Category POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('categories')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: "No Supabase Admin" });
  } catch (error) {
    console.error("Category DELETE error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

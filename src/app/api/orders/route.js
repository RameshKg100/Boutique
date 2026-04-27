import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, orders: data || [] });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  }

  try {
    const orderData = await request.json();
    
    const orderId = `SB-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;
    
    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert([{
        id: orderId,
        customer_name: orderData.customerName,
        customer_phone: orderData.customerPhone,
        customer_location: orderData.customerLocation,
        payment_mode: orderData.paymentMode || "Not specified",
        items: orderData.items,
        total_amount: orderData.totalAmount,
        status: "Pending",
        payment_method: "WhatsApp",
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Database not connected" }, { status: 500 });
  }

  try {
    const { id, status } = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

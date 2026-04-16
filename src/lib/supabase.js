import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Helper functions for future Supabase integration
export async function fetchProducts(category = "all") {
  if (!supabase) return null;
  let query = supabase.from("products").select("*");
  if (category !== "all") {
    query = query.eq("category", category);
  }
  const { data, error } = await query;
  if (error) {
    console.error("Error fetching products:", error);
    return null;
  }
  return data;
}

export async function fetchProductBySlug(slug) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
}

export async function submitContactForm(formData) {
  if (!supabase) return { success: false, message: "Database not connected" };
  const { error } = await supabase.from("contact_submissions").insert([formData]);
  if (error) {
    console.error("Error submitting form:", error);
    return { success: false, message: error.message };
  }
  return { success: true, message: "Form submitted successfully" };
}

export async function createOrder(orderData) {
  if (!supabase) return { success: false, message: "Database not connected" };
  const { data, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select()
    .single();
  if (error) {
    console.error("Error creating order:", error);
    return { success: false, message: error.message };
  }
  return { success: true, data };
}

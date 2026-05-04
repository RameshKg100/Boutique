import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const info = {
    hasUrl: !!url,
    hasAnonKey: !!anonKey,
    hasServiceKey: !!serviceKey,
    serviceKeyPrefix: serviceKey ? serviceKey.substring(0, 20) + "..." : "MISSING",
  };

  if (!id) {
    return NextResponse.json({ info, error: "Pass ?id=<product-id> to test delete" });
  }

  if (!url || !serviceKey) {
    return NextResponse.json({ info, error: "Missing Supabase env vars" }, { status: 500 });
  }

  const adminClient = createClient(url, serviceKey);

  const { data, error } = await adminClient
    .from("products")
    .delete()
    .eq("id", id)
    .select();

  return NextResponse.json({
    info,
    id,
    deleted: data,
    error: error ? { message: error.message, code: error.code, details: error.details } : null,
  });
}

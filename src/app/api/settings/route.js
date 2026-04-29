import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src", "data");
const settingsPath = path.join(dataDir, "settings.json");

const getLocalSettings = () => {
  try {
    if (!fs.existsSync(settingsPath)) return { paymentQRCode: "" };
    const data = fs.readFileSync(settingsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { paymentQRCode: "" };
  }
};

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('store_settings')
        .select('value')
        .eq('key', 'payment_qr_code')
        .single();
      
      if (data) {
        return NextResponse.json({ paymentQRCode: data.value });
      }
    }
    return NextResponse.json(getLocalSettings());
  } catch (error) {
    return NextResponse.json(getLocalSettings());
  }
}

export async function POST(request) {
  try {
    const newSettings = await request.json();
    const qrCodeUrl = newSettings.paymentQRCode;

    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('store_settings')
        .upsert({ key: 'payment_qr_code', value: qrCodeUrl }, { onConflict: 'key' });
      
      if (error) {
        // If table doesn't exist, this will fail. We catch it in the catch block.
        throw error;
      }
      return NextResponse.json({ success: true });
    }

    // Local fallback for development only
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2), "utf8");
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Settings POST error:", error);
    return NextResponse.json({ 
      error: "Vercel Error: Read-only filesystem. Please ensure the 'store_settings' table is created in Supabase. Details: " + error.message 
    }, { status: 500 });
  }
}


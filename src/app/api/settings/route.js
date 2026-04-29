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
        .maybeSingle(); // maybeSingle doesn't throw error if not found
      
      if (data && data.value) {
        return NextResponse.json({ paymentQRCode: data.value });
      }
      if (error) console.error("Supabase settings fetch error:", error);
    }
    return NextResponse.json(getLocalSettings());
  } catch (error) {
    console.error("GET Settings catch error:", error);
    return NextResponse.json(getLocalSettings());
  }
}

export async function POST(request) {
  try {
    const newSettings = await request.json();
    const qrCodeUrl = newSettings.paymentQRCode;

    if (!qrCodeUrl) {
      return NextResponse.json({ error: "No QR Code URL provided" }, { status: 400 });
    }

    if (supabaseAdmin) {
      const { error } = await supabaseAdmin
        .from('store_settings')
        .upsert({ key: 'payment_qr_code', value: qrCodeUrl }, { onConflict: 'key' });
      
      if (error) {
        console.error("Supabase Settings Update Error:", error);
        return NextResponse.json({ 
          error: `Database Error: ${error.message}. Please ensure the 'store_settings' table exists in your Supabase dashboard.` 
        }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    }

    // Local fallback for development only
    try {
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2), "utf8");
      return NextResponse.json({ success: true });
    } catch (fsError) {
      return NextResponse.json({ 
        error: "Vercel Read-only Filesystem: You must set up Supabase to save settings in production." 
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Settings POST catch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



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
      return NextResponse.json({ error: "No image URL provided. Please upload an image first." }, { status: 400 });
    }

    // 1. Try Supabase (for Production/Vercel)
    if (supabaseAdmin) {
      console.log("Attempting to save to Supabase...");
      const { error } = await supabaseAdmin
        .from('store_settings')
        .upsert({ key: 'payment_qr_code', value: qrCodeUrl }, { onConflict: 'key' });
      
      if (!error) {
        console.log("Successfully saved to Supabase");
        return NextResponse.json({ success: true, method: 'database' });
      }

      console.error("Supabase Save Error:", error);
      return NextResponse.json({ 
        error: `Database Save Failed: ${error.message}. \n\nThis usually means the 'store_settings' table doesn't exist yet. Did you run the SQL command in your Supabase dashboard?` 
      }, { status: 500 });
    }

    // 2. Local Fallback (for Local Development ONLY)
    try {
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2), "utf8");
      return NextResponse.json({ success: true, method: 'local' });
    } catch (fsError) {
      console.error("Local Save Error:", fsError);
      return NextResponse.json({ 
        error: "Vercel Error: This environment is read-only. You MUST set up Supabase to save settings. Please ensure your Supabase environment variables are set in Vercel." 
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Settings API Catch Error:", error);
    return NextResponse.json({ error: "Critical Error: " + error.message }, { status: 500 });
  }
}




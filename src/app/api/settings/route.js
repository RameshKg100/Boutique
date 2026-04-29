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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Use supabaseAdmin to ensure we can read settings even if RLS is on
    const client = supabaseAdmin || supabase;
    if (client) {
      const { data, error } = await client
        .from('store_settings')
        .select('key, value')
        .in('key', ['payment_qr_code', 'business_logo']);
      
      if (data) {
        const settings = {};
        data.forEach(item => {
          if (item.key === 'payment_qr_code') settings.paymentQRCode = item.value;
          if (item.key === 'business_logo') settings.businessLogo = item.value;
        });
        return NextResponse.json(settings);
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
    const businessLogoUrl = newSettings.businessLogo;

    // 1. Try Supabase (for Production/Vercel)
    if (supabaseAdmin) {
      console.log("Attempting to save to Supabase...");
      
      const upserts = [];
      if (qrCodeUrl !== undefined) {
        upserts.push({ key: 'payment_qr_code', value: qrCodeUrl });
      }
      if (businessLogoUrl !== undefined) {
        upserts.push({ key: 'business_logo', value: businessLogoUrl });
      }

      if (upserts.length > 0) {
        const { error } = await supabaseAdmin
          .from('store_settings')
          .upsert(upserts, { onConflict: 'key' });
        
        if (error) {
           console.error("Supabase Save Error:", error);
           return NextResponse.json({ 
             error: `Database Save Failed: ${error.message}. \n\nThis usually means the 'store_settings' table doesn't exist yet. Did you run the SQL command in your Supabase dashboard?` 
           }, { status: 500 });
        }
      }

      console.log("Successfully saved to Supabase");
      return NextResponse.json({ success: true, method: 'database' });
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




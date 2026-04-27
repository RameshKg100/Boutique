import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

    if (supabaseAdmin) {
      // Production: Upload to Supabase Storage bucket named 'uploads'
      const bytes = await file.arrayBuffer();
      
      const { data, error } = await supabaseAdmin.storage
        .from('uploads')
        .upload(uniqueFilename, bytes, {
          contentType: file.type || 'image/jpeg',
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("Supabase Storage Error:", error);
        throw error;
      }

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('uploads')
        .getPublicUrl(uniqueFilename);

      return NextResponse.json({ success: true, url: publicUrl });
      
    } else {
      // Local Development: Save to public/uploads
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = path.join(process.cwd(), "public/uploads");
      
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, uniqueFilename);
      fs.writeFileSync(filePath, buffer);
      
      return NextResponse.json({ 
        success: true, 
        url: `/uploads/${uniqueFilename}` 
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
  }
}

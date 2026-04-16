import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename") || `upload-${Date.now()}`;
    
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Vercel Blob Storage
    const blob = await put(file.name || filename, file, {
      access: "public",
    });

    return NextResponse.json({ 
      success: true, 
      url: blob.url 
    });
  } catch (error) {
    console.error("Error uploading file to Vercel Blob:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

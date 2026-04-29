import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { password } = await request.json();
    const secureKey = process.env.ADMIN_PASSWORD || "admin123";

    if (password === secureKey) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

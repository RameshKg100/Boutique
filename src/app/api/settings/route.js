import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src", "data");
const settingsPath = path.join(dataDir, "settings.json");

const getSettings = () => {
  try {
    if (!fs.existsSync(settingsPath)) {
      return { paymentQRCode: "" };
    }
    const data = fs.readFileSync(settingsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Read settings error:", error);
    return { paymentQRCode: "" };
  }
};

const saveSettings = (settings) => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf8");
};

export async function GET() {
  return NextResponse.json(getSettings());
}

export async function POST(request) {
  try {
    const newSettings = await request.json();
    const currentSettings = getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
    saveSettings(updatedSettings);
    return NextResponse.json({ success: true, settings: updatedSettings });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.CONGRESS_API_KEY;
  const API_URL = `https://api.congress.gov/v3/bill?limit=250&api_key=${API_KEY}`;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch bills");

    const data = await res.json();
    console.log("Response from api.congress.gov/v3/bill: ", data);
    return NextResponse.json(data.bills);
  } catch {
    return NextResponse.json(
      { error: "Failed to load bills" },
      { status: 500 }
    );
  }
}

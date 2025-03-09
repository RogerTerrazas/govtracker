import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: { params: { congress: string; billType: string; billNumber: string } }
) {
  const API_KEY = process.env.CONGRESS_API_KEY;
  const { congress, billType, billNumber } = params;
  const API_URL = `https://api.congress.gov/v3/bill/${congress}/${billType}/${billNumber}?format=json&api_key=${API_KEY}`;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch bill details");

    const data = await res.json();
    return NextResponse.json(data.bill);
  } catch (error) {
    console.error("Error fetching bill:", error);
    return NextResponse.json(
      { error: "Failed to load bill details" },
      { status: 500 }
    );
  }
}

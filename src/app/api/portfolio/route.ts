import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/data";

// GET endpoint to fetch current portfolio data
export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolio data" },
      { status: 500 }
    );
  }
}

// POST endpoint to update portfolio data (for future use)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Here you can implement logic to update your data source
    // For example, updating a database, CMS, or external API

    // For now, we'll just return the received data
    return NextResponse.json({
      message: "Data update received",
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update portfolio data" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { getWorkMediaPreloadItems } from "@/lib/work-media";

export async function GET() {
  try {
    const items = await getWorkMediaPreloadItems();

    return NextResponse.json(
      { items },
      {
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to load work media preload manifest" },
      { status: 500 }
    );
  }
}

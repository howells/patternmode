import { NextResponse } from "next/server";
import {
  getApprovedExperiments,
  markFeatured,
  selectRandomExperiments,
} from "@/lib/experiments";

export async function GET() {
  try {
    const approved = await getApprovedExperiments();
    const random = selectRandomExperiments(approved, 12);
    const withFeatured = markFeatured(random);

    return NextResponse.json({
      experiments: withFeatured,
      count: withFeatured.length,
    });
  } catch (error) {
    console.error("Failed to load experiments:", error);
    return NextResponse.json({ experiments: [], count: 0 }, { status: 500 });
  }
}

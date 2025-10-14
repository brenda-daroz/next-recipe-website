import { NextRequest, NextResponse } from "next/server";
import { createRecipe } from "@/app/db/recipes";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const updated = await createRecipe(data);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 });
  }
}

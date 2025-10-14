import { NextRequest, NextResponse } from "next/server";
import { editRecipe } from "@/app/db/recipes";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const updated = await editRecipe(data);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to edit recipe" }, { status: 500 });
  }
}

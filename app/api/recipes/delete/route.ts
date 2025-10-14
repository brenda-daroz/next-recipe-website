import { NextRequest, NextResponse } from "next/server";
import { deleteRecipe } from "@/app/db/recipes";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const id = data.id;

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    console.log("Deleting recipe with ID:", id);

    const deleted = await deleteRecipe(id);
    return NextResponse.json(deleted);
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}

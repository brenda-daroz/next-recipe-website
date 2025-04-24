import { Pool } from "pg";
import { z } from "zod";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const recipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  ingredients: z.string(),
  instructions: z.array(z.string()),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

const recipeArraySchema = z.array(recipeSchema);

const recipeMinimalSchema = recipeSchema
  .omit({
    ingredients: true,
    instructions: true,
    created_at: true,
    updated_at: true,
  })
  .extend({
    id: z.string(),
    title: z.string(),
    category: z.string(),
  });

export type Recipe = z.infer<typeof recipeSchema>;
export type RecipeMinimal = z.infer<typeof recipeMinimalSchema>;

export async function getHomePageData() {
  const query =
    "SELECT id, title, category FROM recipes ORDER BY created_at DESC";

  try {
    const { rows } = await pool.query(query);
    const validatedRows = rows.map((row: RecipeMinimal) =>
      recipeMinimalSchema.parse(row),
    );
    return validatedRows;
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    throw new Error("Failed to fetch data from database");
  }
}

export async function getRecipeById(id: string) {
  const query = "SELECT * FROM recipes WHERE id = $1";

  try {
    const { rows } = await pool.query(query, [id]);
    console.log("getRecipeById:", rows);
    const validatedRows = recipeArraySchema.parse(rows);
    console.log("one recipe?", validatedRows);
    return rows;
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    throw new Error("Failed to fetch data from database");
  }
}

export async function getAllRecipes() {
  const query = "SELECT * FROM recipes";

  try {
    const { rows } = await pool.query(query);
    const validatedRows = rows.map((row: Recipe) => recipeSchema.parse(row));
    console.log("getAllRecipes:", validatedRows);
    return rows;
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    throw new Error("Failed to fetch data from database");
  }
}

import { Pool } from "pg";
import { z } from "zod";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const IngredientItemSchema = z.object({
  name: z.string(),
  quantity: z.string(),
});

export const NestedIngredientsSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    z.array(IngredientItemSchema),
    z.record(NestedIngredientsSchema),
  ])
);

export const CategoryEnum = z.enum(["savory", "sweet", "bread"]);

const recipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: CategoryEnum,
  ingredients: NestedIngredientsSchema,
  instructions: z.array(z.string()),
  created_at: z.date(),
  updated_at: z.date(),
  image_url: z.string().optional().nullable()
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
    category: CategoryEnum,
    image_url: z.string().optional().nullable()
  });

export type RecipeProps = z.infer<typeof recipeSchema>;
export type RecipeMinimal = z.infer<typeof recipeMinimalSchema>;
export type RecipeCategory = z.infer<typeof CategoryEnum>;

export async function getHomePageData() {
  const query =
    "SELECT id, title, category, image_url FROM recipes ORDER BY created_at DESC";

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

export async function getRecipeById(id: string): Promise<RecipeProps[]> {
  const query = "SELECT * FROM recipes WHERE id = $1";

  try {
    const { rows } = await pool.query(query, [id]);
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
    const validatedRows = rows.map((row: RecipeProps) => recipeSchema.parse(row));
    return validatedRows;
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    throw new Error("Failed to fetch data from database");
  }
}

"use client";

import { useFormik } from "formik";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RecipeProps } from "@/app/db/recipes";
import { IngredientsForm } from "./ingredients-form";
import { InstructionsForm } from "./instructions-form";

interface IngredientItem {
  name: string;
  quantity: string;
}

interface FormValues {
  title: string;
  category: string;
  ingredients: {
    [section: string]: IngredientItem[];
  };
  instructions: string[];
}

interface EditRecipeFormProps {
  recipe?: RecipeProps;
}

export default function EditRecipeForm({ recipe }: EditRecipeFormProps) {
  const recipeCategories = ["savory", "sweet", "bread"] as const;
  const formik = useFormik<FormValues>({
    initialValues: {
      title: recipe?.title || "",
      category: recipe?.category || "",
      ingredients: recipe?.ingredients
        ? Array.isArray(recipe.ingredients) && recipe.ingredients.length
          ? { "": recipe.ingredients }
          : Object.fromEntries(
              Object.entries(recipe.ingredients).map(([section, items]) => [
                section,
                Array.isArray(items)
                  ? (items as IngredientItem[])
                  : Object.entries(items as Record<string, string>).map(
                      ([name, quantity]) => ({ name, quantity })
                    ),
              ])
            )
        : { "": [] },
      instructions: recipe?.instructions || [""],
    },
    onSubmit: (data) => {
      console.log("Updated recipe:", data);
    },
  });

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-lg p-6 shadow-xl rounded-2xl border">
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Title"
              {...formik.getFieldProps("title")}
            />

            <Label>Category</Label>
            <select
              {...formik.getFieldProps("category")}
              className="border rounded p-2 w-full"
            >
              {recipeCategories.map((item) => (
                <option key={item} value={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </option>
              ))}
            </select>
            <Label>Ingredients</Label>
            <IngredientsForm
              ingredients={formik.values.ingredients}
              onChange={(newIngredients) =>
                formik.setFieldValue("ingredients", newIngredients)
              }
            />

            {/* Instructions */}
            <Label>Instructions</Label>
            <InstructionsForm
              instructions={formik.values.instructions}
              onChange={(newInstructions) =>
                formik.setFieldValue("instructions", newInstructions)
              }
            />
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

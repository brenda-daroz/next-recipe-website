"use client";

import { useFormik } from "formik";
import { RecipeProps } from "@/app/db/recipes";
import { IngredientsForm } from "./ingredientsForm";
import { InstructionsForm } from "./instructionsForm";
import { useState } from "react";

interface IngredientItem {
  name: string;
  quantity: string;
}

interface FormValues {
  title: string;
  category: "savory" | "sweet" | "bread";
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
  const defaultCategory: FormValues["category"] = "savory";
  const [message, setMessage] = useState<string | null>(null);
  const formik = useFormik<FormValues>({
    initialValues: {
      title: recipe?.title || "",
      category: recipe?.category || defaultCategory,
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
    onSubmit: async (data) => {
      if (!recipe?.id) return;

      try {
        console.log("Submitting data:", { ...data, id: recipe.id });
        const res = await fetch("/api/recipes/edit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id: recipe.id }),
        });

        if (!res.ok) throw new Error("Failed to update recipe");
        
        setMessage("Recipe updated successfully!");
      } catch (err) {
        setMessage(`Failed to update recipe: ${err}`);
        console.error(err);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto my-6 p-8 bg-yellow-50 border-4 border-pink-500 font-['Comic_Sans_MS'] text-black">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <label className="block font-bold text-black">
          Title
          <input
            type="text"
            placeholder="Title"
            {...formik.getFieldProps("title")}
            className="block w-full mt-1 border-2 border-black bg-white px-2 py-1 font-mono text-sm focus:outline-none focus:bg-yellow-100"
          />
        </label>

        <label className="block font-bold text-black">
          Category
          <select
            {...formik.getFieldProps("category")}
            className="block w-full mt-1 border-2 border-black bg-white px-2 py-1 font-mono text-sm focus:outline-none focus:bg-yellow-100"
          >
            {recipeCategories.map((item) => (
              <option key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="block font-bold text-black">Ingredients</label>
        <IngredientsForm
          ingredients={formik.values.ingredients}
          onChange={(newIngredients) =>
            formik.setFieldValue("ingredients", newIngredients)
          }
        />

        <label className="block font-bold text-black">Instructions</label>
        <InstructionsForm
          instructions={formik.values.instructions}
          onChange={(newInstructions) =>
            formik.setFieldValue("instructions", newInstructions)
          }
        />

        <div className="flex justify-between pt-2">
          <button
            type="submit"
            className="bg-gray-200 border-2 border-black px-4 py-1 font-mono text-sm hover:bg-yellow-200 active:translate-y-[1px]"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => formik.resetForm()}
            className="bg-gray-200 border-2 border-black px-4 py-1 font-mono text-sm hover:bg-yellow-200 active:translate-y-[1px]"
          >
            Reset
          </button>
        </div>
      </form>
      {message && <p className="mt-4 font-bold">{message}</p>}
    </div>
  );
}

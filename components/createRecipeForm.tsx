"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { IngredientsForm } from "./ingredientsForm";
import { InstructionsForm } from "./instructionsForm";

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

export default function CreateRecipeForm() {
  const recipeCategories = ["savory", "sweet", "bread"] as const;
  const defaultCategory: FormValues["category"] = "savory";

  const [message, setMessage] = useState<string | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      title: "",
      category: defaultCategory,
      ingredients: { "": [] },
      instructions: [""],
    },
    onSubmit: async (data) => {
      setMessage(null);
      try {
        console.log("Submitting new recipe:", data);

        const res = await fetch("/api/recipes/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to create recipe");
        }

        const createdRecipe = await res.json();
        setMessage("Recipe created successfully!");
        console.log("Created recipe:", createdRecipe);

        formik.resetForm(); // optionally reset the form
      } catch (err: any) {
        console.error(err);
        setMessage(`Failed to create recipe: ${err.message}`);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto my-6 p-8 bg-green-50 border-4 border-green-600 font-['Comic_Sans_MS'] text-black">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <label className="block font-bold text-black">
          Title
          <input
            type="text"
            placeholder="Title"
            {...formik.getFieldProps("title")}
            className="block w-full mt-1 border-2 border-black bg-white px-2 py-1 font-mono text-sm focus:outline-none focus:bg-green-100"
          />
        </label>

        <label className="block font-bold text-black">
          Category
          <select
            {...formik.getFieldProps("category")}
            className="block w-full mt-1 border-2 border-black bg-white px-2 py-1 font-mono text-sm focus:outline-none focus:bg-green-100"
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
            className="bg-gray-200 border-2 border-black px-4 py-1 font-mono text-sm hover:bg-green-200 active:translate-y-[1px]"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => {
              formik.resetForm();
              setMessage(null);
            }}
            className="bg-gray-200 border-2 border-black px-4 py-1 font-mono text-sm hover:bg-green-200 active:translate-y-[1px]"
          >
            Reset
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 font-bold ${
              message.includes("Failed") ? "text-red-700" : "text-green-700"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

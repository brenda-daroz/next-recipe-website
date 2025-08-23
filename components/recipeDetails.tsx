"use client";
import React from "react";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { RecipeProps } from "../app/db/recipes";

type NormalizedIngredient = {
  name: string;
  quantity: string | number;
};

export default function Recipe(recipe: RecipeProps) {
  const parsedIngredients = recipe.ingredients;

  const renderIngredients = (ingredients: RecipeProps) => {
    if (Array.isArray(ingredients)) {
      return (
        <ul className="pl-6 mb-6 list-none">
          {ingredients.map((item: NormalizedIngredient) => (
            <li key={item.name} className="mb-2 leading-snug">
              {capitalizeFirstLetter(item.name)} - {item.quantity}
            </li>
          ))}
        </ul>
      );
    } else if (typeof ingredients === "object") {
      return (
        <>
          {Object.entries(ingredients).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-base font-bold text-purple-800 mt-4 mb-2 underline decoration-dotted">
                {capitalizeFirstLetter(section)}:
              </h4>
              {renderIngredients(items)}
            </div>
          ))}
        </>
      );
    }
    return null;
  };

  return (
    <div className="max-w-3xl mx-auto my-6 p-8 bg-yellow-50 border-4 border-pink-500 font-['Comic_Sans_MS'] text-black">
      <h1 className="text-3xl mb-6 text-center text-blue-700 tracking-wide">
        {capitalizeFirstLetter(recipe.title)}
      </h1>

      <h2 className="text-xl font-bold mb-4 border-b-2 border-dashed border-green-600 pb-1">
        Ingredients
      </h2>
      {renderIngredients(parsedIngredients)}

      {recipe.instructions.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4 border-b-2 border-dashed border-green-600 pb-1">
            Steps
          </h2>
          <ul className="pl-6 list-decimal list-inside space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="leading-snug ">
                {step}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

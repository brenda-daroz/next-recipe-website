"use client";

import CreateRecipeForm from "@/components/createRecipeForm";

export default function CreateRecipePage() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Recipe</h1>
      <CreateRecipeForm />
    </div>
  );
}

"use client";
import DeleteButton from "@/components//ui/deleteButton";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { RecipeMinimal } from "../db/recipes";
import { useSession } from "../lib/context/SessionContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteModal from "@/components/deleteModal";

function RecipeCard({ recipe }: { recipe: RecipeMinimal }) {
  const { isAdmin } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      onClick={() => router.push(`/recipes/${recipe.id}`)}
      className="relative group border-2 border-black bg-gray-200 cursor-pointer"
      style={{
        fontFamily: "'Courier New', monospace",
      }}
    >
      <div className="h-32 sm:h-34 md:h-48 w-full flex items-center justify-center bg-white text-black text-lg font-bold px-2 text-center">
        {capitalizeFirstLetter(recipe.title)}
      </div>

      <div className="absolute inset-0 bg-pink-400 text-black opacity-0 group-hover:opacity-90 flex items-center justify-center text-lg font-extrabold transition uppercase border-black">
        {capitalizeFirstLetter(recipe.title)}
      </div>

      {isAdmin && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`recipes/${recipe.id}/edit`);
            }}
            className="absolute top-2 right-2 bg-yellow-300 text-black text-xs px-3 py-1 font-mono border-2 border-black"
            style={{
              borderStyle: "outset",
              fontFamily: "'Courier New', monospace",
              boxShadow: "2px 2px 0px #333",
            }}
            onMouseDown={(e) => (e.currentTarget.style.borderStyle = "inset")}
            onMouseUp={(e) => (e.currentTarget.style.borderStyle = "outset")}
          >
            EDIT
          </button>
          <>
            <DeleteButton onClick={() => setShowModal(true)} />
            {showModal && (
              <DeleteModal
                recipeId={recipe.id}
                onClose={() => setShowModal(false)}
              />
            )}
          </>
        </>
      )}
    </div>
  );
}

export default function Index({ recipes }: { recipes: RecipeMinimal[] }) {
  const { isAdmin } = useSession();
  const router = useRouter();

  const grouped = recipes.reduce<Record<string, RecipeMinimal[]>>(
    (acc, recipe) => {
      if (!acc[recipe.category]) acc[recipe.category] = [];
      acc[recipe.category].push(recipe);
      return acc;
    },
    {}
  );

  return (
    <div className="p-4 max-w-8xl mx-auto">
      {isAdmin && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => router.push("/create-recipe")}
            className="bg-pink-400 text-black text-sm px-4 py-2 font-mono border-2 border-black"
            style={{
              borderStyle: "outset",
              fontFamily: "'Courier New', monospace",
              boxShadow: "3px 3px 0px #333",
            }}
            onMouseDown={(e) => (e.currentTarget.style.borderStyle = "inset")}
            onMouseUp={(e) => (e.currentTarget.style.borderStyle = "outset")}
          >
            CREATE NEW RECIPE
          </button>
        </div>
      )}

      {Object.entries(grouped).map(([category, groupedRecipes]) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-bold uppercase mb-4 underline decoration-wavy">
            {capitalizeFirstLetter(category)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

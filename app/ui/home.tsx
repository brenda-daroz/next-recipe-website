"use client";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { RecipeMinimal } from "../db/recipes";
import { useSession } from "../lib/context/SessionContext";
import { useRouter } from "next/navigation";

function RecipeCard({ recipe }: { recipe: RecipeMinimal }) {
  const { isAdmin } = useSession();
  const router = useRouter();

  console.log(recipe);

  return (
    <div
      onClick={() => router.push(`/recipes/${recipe.id}`)}
      className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
    >
      <div className="h-48 w-full bg-gray-200 flex items-center justify-center overflow-hidden">
        <div className="h-full w-full flex items-center justify-center text-gray-500 text-lg font-semibold">
          {capitalizeFirstLetter(recipe.title)}
        </div>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-lg font-bold">
        {capitalizeFirstLetter(recipe.title)}
      </div>
      {isAdmin && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            router.push(`/edit/${recipe.id}`);
          }}
          className="absolute top-2 right-2 bg-white text-sm px-2 py-1 rounded shadow hover:bg-gray-100 transition"
        >
          Edit
        </button>
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
    <div className="p-4 max-w-6xl mx-auto">
      {isAdmin && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => router.push("/create-recipe")}
            className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
          >
            Create New Recipe
          </button>
        </div>
      )}

      {Object.entries(grouped).map(([category, groupedRecipes]) => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-semibold uppercase mb-4">
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

"use client";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import styled from "styled-components";
import Link from "next/link";
import { RecipeMinimal } from "../db/recipes";
import { useSession } from "../lib/context/SessionContext";
import { redirect } from "next/navigation";

const ListContainer = styled.div`
  margin-top: 20px;
`;

const RecipeLink = styled.div`
  display: inline-block;
  font-size: 1rem;
  color: #333;
  text-decoration: none;

  &:hover {
    color: #ff5733;
  }
`;

function RecipeList({
  recipes,
  category,
}: {
  recipes: RecipeMinimal[];
  category: string;
}) {
  const { isAdmin } = useSession();
  const handleEdit = (id: string) => {
    redirect(`/edit/${id}`);
  };

  return (
    <ListContainer>
      <div className="text-2xl underline mb-4">
        {capitalizeFirstLetter(category)}
      </div>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="flex items-center gap-4">
            <Link
              href={`/recipes/${recipe.id}`}
              passHref
            >
              <RecipeLink>{capitalizeFirstLetter(recipe.title)}</RecipeLink>
            </Link>

            {isAdmin && (
              <button
                onClick={() => handleEdit(recipe.id)}
                className="text-sm text-blue-600 underline hover:text-blue-800 cursor-pointer"
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
    </ListContainer>
  );
}

export default function Index({ recipes }: { recipes: RecipeMinimal[] }) {

  const grouped = recipes.reduce<Record<string, RecipeMinimal[]>>((acc, recipe) => {
    if (!acc[recipe.category]) {
      acc[recipe.category] = [];
    }
    acc[recipe.category].push(recipe);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(grouped).map(([category, groupedRecipes]) => (
          <RecipeList key={category} recipes={groupedRecipes} category={category} />
      ))}
    </div>
  );
}

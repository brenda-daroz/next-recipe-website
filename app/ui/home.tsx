'use client';
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import styled from "styled-components";
import Link from "next/link.js";
import { RecipeMinimal } from "../db/recipes";

const ListContainer = styled.div`
  margin-top: 20px;
`;

const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const RecipeLink = styled.div`
  display: inline-block;
  font-size: 1.2rem;
  color: #333;
  text-decoration: none;
  margin-bottom: 5px;

  &:hover {
    color: #ff5733;
  }
`;

function RecipeList ({ recipes, category }: { recipes: RecipeMinimal[]; category: string}) {
  return (
  <ListContainer>
    <div className="text-3xl font-bold underline">{capitalizeFirstLetter(category)}</div>
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <Link
            href={{
              pathname: `/recipes/${encodeURIComponent(recipe.id)}`,
              query: { object: JSON.stringify(recipe) },
            }}
            as={`/recipes/${recipe.id}`}
          >
            <RecipeLink>{capitalizeFirstLetter(recipe.title)}</RecipeLink>
          </Link>
        </li>
      ))}
    </ul>
  </ListContainer>
    )
}

export default function Index({ recipes }: { recipes: RecipeMinimal[] }) {

  const savory = recipes.filter((recipe) => recipe.category === "savory");
  const sweet = recipes.filter((recipe) => recipe.category === "sweet");


  return (
    <div className="p-4">
      <RecipeList recipes={savory} category="savory" />
      <RecipeList recipes={sweet} category="sweet" />
    </div>
  );
}

import capitalizeFirstLetter from "../utils/capitalizeFirstLetter.js";
import styled from "styled-components";
import Link from "next/link.js";

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

export default function BigUseClient({ recipes }) {
  const savory = recipes.filter((recipe) => recipe.type === "savory");
  const sweet = recipes.filter((recipe) => recipe.type === "sweet");

  const RecipeList = ({ recipes, category }) => (
    <ListContainer>
      <CategoryTitle>{capitalizeFirstLetter(category)}</CategoryTitle>
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
  );

  return (
    <>
      <h1>Recipes</h1>
      <RecipeList recipes={savory} category="savory" />
      <RecipeList recipes={sweet} category="sweet" />
    </>
  );
}

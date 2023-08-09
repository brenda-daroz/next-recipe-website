"use client"
import Link from 'next/link'
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter.js'


export default function BigUseClient({ data }) {

  const savory = data.recipes.filter(recipe => recipe.type === "savory")
  const sweet = data.recipes.filter(recipe => recipe.type === "sweet")


  const RecipeList = ({ recipes, category }) => (
    <>
      <h2>{capitalizeFirstLetter(category)}</h2>
      <ul>
        {recipes.map((recipe) => (
          <li
          key={recipe.id}>
            <Link href={{pathname:`/recipes/${encodeURIComponent(recipe.title)}`, query: { object: JSON.stringify(recipe) }}} as={`/recipes/${recipe.title}`}>
              <h3>{capitalizeFirstLetter(recipe.title)}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      <h1>Recipes</h1>
      <RecipeList recipes={savory} category="savory" />
      <RecipeList recipes={sweet} category="sweet" />
    </>
  );


}

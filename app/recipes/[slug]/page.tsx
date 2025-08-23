import React from "react";
import Recipe from "../../../components/recipeDetails";
import { getHomePageData, getRecipeById } from "../../db/recipes";

export const generateStaticParams = async () => {
  const recipes = await getHomePageData();
  const paths = recipes.map((recipe) => ({
    slug: recipe.id,
  }));
  return paths;
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipes = await getRecipeById(slug);
  const recipe = recipes.find((recipe) => recipe.id === slug);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <>
      <div>
        <Recipe {...recipe} />
      </div>
    </>
  );
}

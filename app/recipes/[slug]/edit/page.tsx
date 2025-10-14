import { getRecipeById } from "@/app/db/recipes";
import EditRecipeForm from "@/components/form";
import { ReactElement } from "react";

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function EditRecipePage({
  params,
}: Props): Promise<ReactElement> {
  const { slug } = await params;

  const recipe = await getRecipeById(slug);

  if (!recipe || recipe.length === 0) {
    return <div>Recipe not found</div>;
  }

  return <EditRecipeForm recipe={recipe[0]} />;
}

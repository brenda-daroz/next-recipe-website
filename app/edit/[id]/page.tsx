import { getRecipeById } from "@/app/db/recipes";
import EditRecipeForm from "@/components/form";
import { ReactElement } from "react";

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function EditRecipePage({
  params,
}: Props): Promise<ReactElement> {
  const { id } = await params;

  const recipe = await getRecipeById(id);

  if (!recipe || recipe.length === 0) {
    return <div>Recipe not found</div>;
  }

  return <EditRecipeForm recipe={recipe[0]} />;
}

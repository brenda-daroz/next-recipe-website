import { getRecipeById } from "@/app/db/recipes";
import EditRecipeForm from "@/components/form";

interface Params {
  id: string;
}

export default async function EditRecipePage({ params }: { params: Params }) {
  const recipe = await getRecipeById(params.id);
  if (!recipe) return <div>Recipe not found</div>;

  console.log("EditRecipePage recipe", recipe);

  return <EditRecipeForm recipe={recipe[0]} />;
}
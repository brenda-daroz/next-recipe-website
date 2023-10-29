import { useRouter } from "next/router";
import Recipe from "../../components/Recipe";
import { recipes } from "@/recipes";

export const getStaticPaths = async () => {
  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const recipe = recipes.find((recipe) => recipe.id.toString() === params.slug);
  return { props: { recipe } };
};

export default function Page({ recipe }) {
  const router = useRouter();

  return (
    <>
      <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>
      <div className="container">
        <h1> {recipe.title} </h1>
        <Recipe ingredients={recipe?.ingredients} steps={recipe?.steps} />
      </div>
    </>
  );
}

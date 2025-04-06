import { useRouter } from "next/router";
import { recipes, RecipeProps } from "../../recipes";
import Recipe from "../../components/Recipe";


export const getStaticPaths = async () => {
  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const recipe = recipes.find((recipe) => recipe.id.toString() === params.slug);
  return { props: { recipe } };
};

export default function Page({ recipe }: { recipe: RecipeProps }) {
  const router = useRouter();

  return (
    <>
      <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>
      <div className="container">
        <Recipe {...recipe} />
      </div>
    </>
  );
}

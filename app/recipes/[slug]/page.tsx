import { recipes } from "../../../recipes";
import Recipe from "../../../components/Recipe";

export const generateStaticParams = async () => {
    const paths = recipes.map((recipe) => ({
        params: { slug: recipe.id },
    }))
    return paths;
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const recipe = recipes.find((recipe) => recipe.id === slug);

    if (!recipe) {
        return <div>Recipe not found</div>;
    }

    return (
        <>
            <div className="container">
                <Recipe {...recipe} />
            </div>
        </>
    );
}
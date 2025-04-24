import Index from "./ui/home";
import Head from "next/head";
import { getHomePageData } from "./db/recipes";

export default async function Page() {
  const recipes = await getHomePageData();
  return (
    <>
      <Head>
        {/* HTML Meta Tags */}
        <title>Brenda Recipes</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="description" content="Brenda's Favorite Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Index recipes={recipes} />
    </>
  );
}

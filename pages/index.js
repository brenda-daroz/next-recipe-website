import BigUseClient from "@/components/BigUseClient";
import { recipes } from "../recipes.js";
import Head from "next/head";

export default function Page({ recipes }) {
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
      <BigUseClient recipes={recipes} />
    </>
  );
}

export const getStaticProps = () => {
  return { props: { recipes: recipes } };
};

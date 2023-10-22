import BigUseClient from "@/components/BigUseClient";
import {recipes} from '../recipes.js'
import Head from "next/head";

export default function Page({ data }) {


  return (

    <>
      <Head>
        {/* HTML Meta Tags */}
        <title>Brenda's Recipes</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="description" content="Brenda's Favorite Recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <BigUseClient data={data} />
    </>
  );
}
export async function fazTudo() {
  const response = await recipes;
  // console.log(discographyData)
  return response;
}


export const getStaticProps = async () => {
  const data = await fazTudo()
  return { props: { data } }
}

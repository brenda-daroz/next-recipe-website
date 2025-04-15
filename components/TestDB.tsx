import getData from "../app/db";


export default async function Page() {
  const data = await getData();
  return <>{data}</>;
}
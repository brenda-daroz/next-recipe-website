import { neon } from '@neondatabase/serverless';

export default async function getData() {
  const sql = neon(process.env.DATABASE_URL ?? '');
  const response = await sql`SELECT * FROM recipes where recipe_key = 'pizza'`;
  return response[0].recipe_key;
}

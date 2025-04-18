import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getHomePageData() {
  const query = 'SELECT id, title, category FROM recipes ORDER BY created_at DESC';

  try {
    const { rows } = await pool.query(query); 
    console.log('Data fetched from PostgreSQL:', rows);
    return rows; 
  } catch (error) {
    console.error('Error fetching data from PostgreSQL:', error);
    throw new Error('Failed to fetch data from database');
  }
}

export async function getRecipeById(id: string) {
  const query = 'SELECT * FROM recipes WHERE id = $1';

  try {
    const { rows } = await pool.query(query, [id]); 
    console.log('one recipe?', rows);
    return rows; 
  } catch (error) {
    console.error('Error fetching data from PostgreSQL:', error);
    throw new Error('Failed to fetch data from database');
  }
}

export async function getAllRecipes() {
  const query = 'SELECT * FROM recipes';

  try {
    const { rows } = await pool.query(query); 
    console.log('getAllRecipes:', rows);
    return rows; 
  } catch (error) {
    console.error('Error fetching data from PostgreSQL:', error);
    throw new Error('Failed to fetch data from database');
  }
}
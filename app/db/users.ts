import { Pool } from "pg";
import { z } from "zod";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const SignupFormSchema = z.object({
  name: z.string().trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().trim(),
});

export async function getUserByEmail(email: string) {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  try {
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user from database");
  }
}

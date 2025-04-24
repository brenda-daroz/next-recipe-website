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

export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  console.log("createUser", name, email, password);
  const validatedFields = SignupFormSchema.safeParse({
    name: name,
    email: email,
    password: password,
  });

  if (!validatedFields.success) {
    throw new Error(
      "Validation failed: " + JSON.stringify(validatedFields.error.format()),
    );
  }
  const query =
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
  const values = [name, email, password];

  try {
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user in database");
  }
}

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

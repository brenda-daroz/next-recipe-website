"use server";
import { getUserByEmail } from "../db/users";
import { createSession } from "../lib/session";
import bcrypt from "bcryptjs";

export async function signin(data: { email: string; password: string }) {
  const { email, password } = data;
  const user = await getUserByEmail(email);
  if (!user) return { success: false, message: "User not found" };

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return { success: false, message: "Invalid password" };

  await createSession(user.id, user.name, user.role);
  return { success: true, user };
}

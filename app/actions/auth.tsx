"use server";
import { createUser, getUserByEmail } from "../db/users";
import { createSession } from "../lib/session";
import bcrypt from "bcryptjs";

export async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return { success: true, user };
  } catch (err: any) {
    if (err.message.includes("already exists")) {
      return { success: false, message: "Email is already taken" };
    }
    return { success: false, message: "An error occurred while creating your account" };
  }
}

export async function signin(data: { email: string; password: string }) {
  const { email, password } = data;
  const user = await getUserByEmail(email);
  if (!user) return { success: false, message: "User not found" };

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return { success: false, message: "Invalid password" };

  await createSession(user.id, user.name, user.role);
  return { success: true, user };
}

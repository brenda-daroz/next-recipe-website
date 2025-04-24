"use server";
import { createUser, getUserByEmail } from "../db/users";
import { createSession } from "../lib/session";
const bcrypt = require("bcrypt");

export async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  await createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  const user = data["email"];
  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
}

export async function signin(data: { email: string; password: string }) {
  const { email, password } = data;
  const user = await getUserByEmail(email);
  if (!user) {
    return {
      message: "User not found",
    };
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return {
      message: "Invalid password",
    };
  }
  if (isValid) {
    await createSession(user.id, user.name);
    return {
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}

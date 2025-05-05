import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export type SessionPayload = {
  userId: string;
  userName: string;
  role: string;
  expiresAt: Date;
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(userId: string, userName: string, role: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await encrypt({ userId, userName, expiresAt, role });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSessionFromCookies() {
  const cookieStore = cookies();
  const session = (await cookieStore).get("session")?.value;
  if (!session) return null;

  try {
    const payload = await decrypt(session);
    return payload; // { userId, userName, role }
  } catch (err) {
    console.error("Failed to decrypt session", err);
    return null;
  }
  // const cookieStore = cookies();
  // const session = (await cookieStore).get("session")?.value;

  // return await decrypt(session);
}

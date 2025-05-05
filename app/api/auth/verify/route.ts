// app/api/auth/verify/route.ts
import { NextResponse } from 'next/server';
import { getSessionFromCookies } from '../../../lib/session';  // Adjust path to session logic

export async function GET() {
  const session = await getSessionFromCookies();

  if (session) {

    return NextResponse.json({ message: "Session is valid", session }, { status: 200 });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

import { getSessionFromCookies } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getSessionFromCookies()

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Admin: {String(session.role)}</h1>
      <p>Welcome user: {String(session.userName)}</p>
    </div>
  );
}

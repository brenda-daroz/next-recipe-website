import Link from "next/link";
import { PersonIcon, HomeIcon } from "@radix-ui/react-icons"
import { getSessionFromCookies } from "../lib/session";


export async function Header() {
  const session = await getSessionFromCookies()
  console.log('session', session)
  const router = session?.userId ? '/admin' : '/login'
  return (
    <header className="h-10">
      <nav className="flex items-center justify-between w-full">

        <Link href="/" className="text-2xl font-bold">
          Brenda Recipes
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="ml-4">
            <HomeIcon className="cursor-pointer" />
          </Link>
          <Link href={router}>
            <PersonIcon className="cursor-pointer" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
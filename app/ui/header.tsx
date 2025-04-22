import Link from "next/link";
import { PersonIcon, HomeIcon } from "@radix-ui/react-icons"


export function Header() {
  return (
    <header className="h-18 p-4">
      <nav className="flex items-center justify-between w-full">

        <Link href="/" className="text-2xl font-bold">
          Brenda Recipes
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="ml-4">
            <HomeIcon className="cursor-pointer" />
          </Link>
          <Link href="/login">
            <PersonIcon className="cursor-pointer" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
import Link from "next/link";

export async function Header() {
  return (
    <header
      className="h-16 border-b-2 border-black bg-yellow-200 px-4 flex items-center"
      style={{
        fontFamily: "'Courier New', monospace",
      }}
    >
      <nav className="flex items-center justify-between w-full">
        <Link
          href="/"
          className="text-xl font-bold text-black px-2 py-1 border-2 border-black bg-yellow-100 hover:bg-yellow-300 active:border-t-[4px] active:border-l-[4px] active:border-b-[2px] active:border-r-[2px]"
        >
          Brenda Recipes
        </Link>
      </nav>
    </header>
  );
}

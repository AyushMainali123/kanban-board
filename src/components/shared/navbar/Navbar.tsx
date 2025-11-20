import Link from "next/link";

export function Navbar() {
  return (
    <nav
      className={"bg-background border-b shadow-sm flex items-center justify-between px-6 py-4"}
    >
      <h1 className="text-xl font-bold">
        <Link href={"/"}>
            Kanban Board
        </Link>
      </h1>
    </nav>
  );
}
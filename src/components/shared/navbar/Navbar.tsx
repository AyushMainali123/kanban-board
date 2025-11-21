import Link from 'next/link';

export function Navbar() {
  return (
    <nav
      className={
        'bg-background flex items-center justify-between border-b px-6 py-4 shadow-sm'
      }
    >
      <h1 className="text-xl font-bold">
        <Link href={'/'}>Kanban Board</Link>
      </h1>
    </nav>
  );
}

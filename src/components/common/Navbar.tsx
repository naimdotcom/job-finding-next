import Link from "next/link";

export default async function Navbar() {
  return (
    <nav className="bg-zinc-200 dark:bg-zinc-900 drop-shadow-md text-white p-4 py-6 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          JobFinder
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/jobs" className="hover:underline">
              Jobs
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

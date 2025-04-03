import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModalToggle";

async function fetchData() {}

export default async function Navbar() {
  return (
    <nav className="bg-zinc-200 dark:bg-zinc-900 drop-shadow-md text-white p-4 py-6 sticky top-0">
      <div className="container mx-auto flex justify-between items-center text-zinc-900 dark:text-white">
        <Link href="/" className="text-2xl font-bold">
          JobFinder
        </Link>
        <div>
          <ul className="flex space-x-6 items-center">
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
            <div className="flex gap-1.5">
              <li>
                <Link href="/log-in" className="hover:underline">
                  <Button>log in</Button>
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:underline">
                  <Button variant={"link"}>sign up</Button>
                </Link>
              </li>
            </div>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

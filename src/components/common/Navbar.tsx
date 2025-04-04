import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModalToggle";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";

async function fetchData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jobfindertoken")?.value || "";
    if (!token) return null;
    const data = await axiosInstance
      .get("/auth/verify", {
        // for server component
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .catch(() => null);
    return data;
  } catch (error) {
    console.log("error while fetching auth", error);
  }
}

export default async function Navbar() {
  const user = await fetchData();
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
            {user.data && user.data.id ? (
              <div className="flex gap-1.5">
                <li>
                  <Link href="/signup" className="hover:underline">
                    <Button variant={"link"}>profile</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/log-in" className="hover:underline">
                    <Button>log out</Button>
                  </Link>
                </li>
              </div>
            ) : (
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
            )}
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

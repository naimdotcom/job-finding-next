import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModalToggle";
import { cookies } from "next/headers";
import axiosInstance from "@/lib/axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

async function fetchData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jobfindertoken")?.value || "";
    if (!token) return {};
    const data = await axiosInstance
      .get("/auth/verify", {
        // for server component
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .catch(() => {});
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
              <Link href="/company" className="hover:underline">
                Company
              </Link>
            </li>

            {user.data && user.data.id ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="px-2 py-1 rounded-full">
                  <User size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={"/profile"}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

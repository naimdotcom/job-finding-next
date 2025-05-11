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
import { User, Menu } from "lucide-react";

async function fetchData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jobfindertoken")?.value || "";
    if (!token) return {};
    const data = await axiosInstance
      .get("/auth/verify", {
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
    <nav className="bg-zinc-200 dark:bg-zinc-900 drop-shadow-md text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center text-zinc-900 dark:text-white">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button would go here */}
          <Link href="/" className="text-xl sm:text-2xl font-bold">
            JobFinder
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/jobs" className="hover:underline text-sm sm:text-base">
            Jobs
          </Link>
          <Link
            href="/company"
            className="hover:underline text-sm sm:text-base"
          >
            Company
          </Link>

          {user.data && user.data.id ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <User size={18} />
                  <span className="text-sm sm:text-base">Account</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link href="/log-in">
                <Button size="sm" className="text-xs sm:text-sm">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-4">
              <DropdownMenuItem asChild>
                <Link href="/jobs">Jobs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/company">Company</Link>
              </DropdownMenuItem>

              {user.data && user.data.id ? (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/log-in">Log In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signup">Sign Up</Link>
                  </DropdownMenuItem>
                </>
              )}

              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <ModeToggle />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

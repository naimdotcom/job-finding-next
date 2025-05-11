import SearchComponent from "@/components/common/Search";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, ChevronRight, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-zinc-800 dark:bg-zinc-900 text-white py-12 md:py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Find Your Dream Job Today
          </h1>
          <p className="text-base sm:text-lg mt-3 max-w-2xl mx-auto">
            Discover thousands of job opportunities from top companies worldwide
          </p>

          <div className="mt-6 max-w-2xl mx-auto">
            <SearchComponent />
          </div>
        </div>
      </header>

      {/* Featured Jobs */}
      <section className="max-w-5xl mx-auto mt-8 sm:mt-12 px-4 sm:px-6 w-full">
        <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-white">
                Featured Jobs
              </h2>
              <Link href="/jobs">
                <Button
                  variant="link"
                  className="text-blue-600 dark:text-blue-400"
                >
                  View all jobs
                </Button>
              </Link>
            </div>

            <div className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-700">
              {[1, 2, 3].map((job) => (
                <div
                  key={job}
                  className="py-4 px-2 sm:px-4 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors rounded-md"
                >
                  <Link href="#" className="block">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Briefcase className="mr-2 h-5 w-5 text-blue-500" />
                          <h3 className="text-lg font-semibold text-zinc-800 dark:text-white">
                            Software Engineer {job}
                          </h3>
                        </div>
                        <div className="flex items-center mt-1 sm:mt-2 ml-7">
                          <MapPin className="mr-2 h-4 w-4 text-red-500" />
                          <p className="text-zinc-600 dark:text-zinc-300">
                            New York, USA
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-blue-600 dark:text-blue-400"
                      >
                        Apply <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Employer CTA */}
      <section className="bg-zinc-800 dark:bg-zinc-900 text-white py-12 px-4 text-center mt-10 sm:mt-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold">Hire Top Talent</h2>
          <p className="text-base sm:text-lg mt-3 max-w-2xl mx-auto">
            Post your job openings and connect with qualified professionals
          </p>
          <Link href="/company">
            <Button
              variant="outline"
              className="mt-4 bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-transparent dark:text-white dark:hover:bg-zinc-800"
              size="lg"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Post a Job
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-zinc-500 dark:text-zinc-400 mt-auto">
        <div className="container mx-auto px-4">
          © {new Date().getFullYear()} JobFinder. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

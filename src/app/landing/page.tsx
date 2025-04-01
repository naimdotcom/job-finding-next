import SearchComponent from "@/components/common/Search";
import { Search, Briefcase, MapPin, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Hero Section */}
      <header className="bg-dark-secondary text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Find Your Dream Job</h1>
        <p className="text-lg mt-2">
          Search thousands of jobs from top companies.
        </p>

        <SearchComponent />
      </header>

      {/* Featured Jobs */}
      <section className="max-w-5xl mx-auto mt-10 p-6 bg-light-primary shadow-2xl rounded-lg">
        <h2 className="text-2xl font-bold">Featured Jobs</h2>
        <div className="mt-4">
          {[1, 2, 3].map((job) => (
            <div
              key={job}
              className="p-4 border-b border-zinc-300 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold flex items-center">
                  <Briefcase className="mr-2 text-blue-500" /> Software Engineer
                </h3>
                <p className="text-gray-500 flex items-center">
                  <MapPin className="mr-2 text-red-500" /> New York, USA
                </p>
              </div>
              <button className="flex items-center text-blue-accent">
                Apply <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Employer CTA */}
      <section className="bg-dark-secondary text-white py-12 text-center mt-10">
        <h2 className="text-2xl font-bold">Hire the Best Talent</h2>
        <p className="text-lg mt-2">
          Post a job today and get matched with top professionals.
        </p>
        <button className="mt-4 bg-blue-accent px-6 py-3 rounded-lg text-black font-semibold">
          Post a Job
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500">
        © 2025 JobFinder. All rights reserved.
      </footer>
    </div>
  );
}

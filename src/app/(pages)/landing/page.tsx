import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Jobs | Naimdotcom Job Board",
  description: "Find your dream job from thousands of listings. Apply now!",
};

export default function Home() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 py-10">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
        Find Your <span className="text-primary">Dream Job</span> Here
      </h1>
      <p className="max-w-2xl text-muted-foreground mb-8 text-lg">
        Explore thousands of job opportunities from top companies. Start your
        career journey today with naimdotcom-job-finding!
      </p>

      <div className="flex gap-4">
        <Link href="/jobs">
          <Button size="lg">Browse Jobs</Button>
        </Link>
        <Link href="/company">
          <Button size="lg" variant="outline">
            Post a Job
          </Button>
        </Link>
      </div>
    </section>
  );
}

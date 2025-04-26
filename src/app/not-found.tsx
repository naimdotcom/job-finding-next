import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-10">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <div className="flex flex-col gap-3">
        <Link href="/">
          <Button className="w-full">Go Back Home</Button>
        </Link>
        <div className="flex gap-4">
          <Link href="/signup">
            <Button variant="outline" className="">
              Create an Account
            </Button>
          </Link>
          <span>or</span>
          <Link href="/log-in">
            <Button variant="outline">Already Have an Account</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

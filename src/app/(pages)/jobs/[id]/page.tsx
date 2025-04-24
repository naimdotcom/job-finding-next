import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, DollarSign, User2 } from "lucide-react";
import Link from "next/link";

// Dummy job data (Replace with your actual data or fetch it from DB)
const job = {
  title: "Frontend Developer",
  description:
    "We are looking for a passionate frontend developer to join our team and build scalable web applications.",
  location: "New York, USA",
  startingSalary: 60000,
  endingSalary: 85000,
  company: "Softvence",
  requirements: [
    "3+ years of experience with React",
    "Strong HTML/CSS/JS fundamentals",
    "Experience with Tailwind & Shadcn",
    "Familiar with REST and GraphQL",
  ],
  jobType: "full_time",
  postedBy: "John Doe",
  expireAt: "2025-06-30",
  createdAt: "2025-04-01",
};

export default function JobDetailPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <p className="text-muted-foreground">Company: {job.company}</p>
            </div>
            <Badge className="capitalize" variant="outline">
              {job.jobType.replace("_", " ")}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={18} />
              <span>
                ${job.startingSalary.toLocaleString()} - $
                {job.endingSalary.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User2 size={18} />
              <span>Posted by: {job.postedBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              <span>
                Expires on: {new Date(job.expireAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Job Description</h2>
            <p className="text-sm leading-relaxed">{job.description}</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Requirements</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
            <Link href={`/apply/${job.title}`}>
              <Button size="lg" className="w-full">
                Apply Now
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

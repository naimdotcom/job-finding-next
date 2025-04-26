import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";
import ApplyDialog from "@/components/common/ApplyModal";

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

const fetchData = async ({ id }: { id: string }) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jobfindertoken")?.value || "";
    if (!token) return {};
    const res = await axiosInstance.get(`/jobs/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log("error while fetching company", error);
    return null;
  }
};

type props = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailPage({ params }: props) {
  const { id } = await params;
  const jobDetails = await fetchData({ id });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{jobDetails?.title}</h1>
              <p className="text-muted-foreground">
                Company: {jobDetails?.company?.name}
              </p>
            </div>
            <Badge className="capitalize" variant="outline">
              {jobDetails.jobType.replace("_", " ")}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{jobDetails.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={18} />
              <span>
                ${jobDetails.startingSalary.toLocaleString()}k - $
                {jobDetails.endingSalary.toLocaleString()}k
              </span>
            </div>
            {/* <div className="flex items-center gap-2">
              <User2 size={18} />
              <span>Posted by: {jobDetails.postedBy}</span>
            </div> */}
            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              <span>
                Expires on: {new Date(jobDetails.expireAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Job Description</h2>
            <p className="text-sm leading-relaxed">{jobDetails.description}</p>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Requirements</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {jobDetails.requirements.map((req: string, index: number) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
            <ApplyDialog />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, DollarSign } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";
import ApplyDialog from "@/components/common/ApplyModal";

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
    return res.data.data;
  } catch (error) {
    console.log("error while fetching job details", error);
    return null;
  }
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const jobDetails = await fetchData({ id });

  if (!jobDetails) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Card>
          <CardContent className="p-6 text-center">
            <p>Failed to load job details</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Card className="shadow-sm">
        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Job Title Section */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold">
                {jobDetails.title}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Company: {jobDetails.company?.name}
              </p>
            </div>
            <Badge
              className="capitalize text-sm sm:text-base"
              variant="outline"
            >
              {jobDetails.jobType.replace("_", " ")}
            </Badge>
          </div>

          {/* Job Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>{jobDetails.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>
                ${jobDetails.startingSalary.toLocaleString()}k - $
                {jobDetails.endingSalary.toLocaleString()}k
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>
                Expires: {new Date(jobDetails.expireAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg sm:text-xl">
              Job Description
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-justify">
              {jobDetails.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg sm:text-xl">Requirements</h2>
            <ul className="list-disc pl-5 text-sm sm:text-base space-y-1">
              {jobDetails.requirements.map((req: string, index: number) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Apply Button */}
          <div className="pt-4 w-full">
            <ApplyDialog jobId={id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

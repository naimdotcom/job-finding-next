import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/lib/axios";
import { format } from "date-fns";

type Props = {
  params: Promise<{ id: string }>;
};

interface ICompany {
  name: string;
  location: string;
  industry: string;
  website?: string;
  description: string;
  foundedYear?: number;
  employees?: number;
  aproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IJob {
  title: string;
  description: string;
  location: string;
  startingSalary?: number;
  endingSalary?: number;
  requirements: string[];
  jobType: "remote" | "onsite" | "hybrid"; // adjust to your actual enum
  expireAt: Date;
  createdAt: Date;
}

const fetchData = async ({ id }: { id: string }) => {
  try {
    const res = await axiosInstance.get(`/company/${id}`);
    return res.data.data;
  } catch (error) {
    console.log("error while fetching company", error);
    return null;
  }
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const data = await fetchData({ id });

  if (!data) return <div className="p-4">Failed to load company data.</div>;

  const { company, jobs }: { company: ICompany; jobs: IJob[] } = data;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Company Info */}
      <Card className="mb-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">{company.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{company.industry}</p>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-muted-foreground">{company.description}</p>
          <div className="text-sm text-muted-foreground">
            <div>
              <strong>Location:</strong> {company.location}
            </div>
            {company.website && (
              <div>
                <strong>Website:</strong>{" "}
                <a
                  href={company.website}
                  className="text-blue-600 underline"
                  target="_blank"
                >
                  {company.website}
                </a>
              </div>
            )}
            {company.foundedYear && (
              <div>
                <strong>Founded:</strong> {company.foundedYear}
              </div>
            )}
            {company.employees && (
              <div>
                <strong>Employees:</strong> {company.employees}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Jobs */}
      <h2 className="text-xl font-semibold mb-4">Open Positions</h2>
      <div className="space-y-4">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <Card
              key={index}
              className="shadow-sm hover:shadow-md transition-all"
            >
              <CardHeader>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {job.location} • {job.jobType}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{job.description.slice(0, 150)}...</p>
                {job.requirements.length > 0 && (
                  <div className="flex flex-wrap gap-2 my-2">
                    {job.requirements.map((req, i) => (
                      <Badge key={i} variant="outline">
                        {req}
                      </Badge>
                    ))}
                  </div>
                )}
                <Separator className="my-2" />
                <div className="text-sm text-muted-foreground flex justify-between">
                  <div>
                    <strong>Salary:</strong>{" "}
                    {job.startingSalary && job.endingSalary
                      ? `$${job.startingSalary} - $${job.endingSalary}`
                      : "Negotiable"}
                  </div>
                  <div>
                    <strong>Expires:</strong>{" "}
                    {format(new Date(job.expireAt), "PPP")}
                  </div>
                </div>
                <Separator className="my-2" />
                {/* // todo: edit button */}
                <div></div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">No job postings yet.</p>
        )}
      </div>
    </div>
  );
};

export default Page;

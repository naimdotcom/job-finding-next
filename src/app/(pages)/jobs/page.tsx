import { JobCard } from "@/components/common/JobCard";
import JobFilter from "@/components/common/JobFilter";
import Pagination from "@/components/common/Pagination";
import axiosInstance from "@/lib/axios";
import { Job } from "@/types/job";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

async function fetchData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jobfindertoken")?.value || "";
    if (!token) return [];
    const data = await axiosInstance.get("/jobs", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data.data;
  } catch (error) {
    console.log("error while fetching jobs", error);
    return [];
  }
}

const page = async ({ searchParams }: Props) => {
  const { page } = await searchParams;
  const data = await fetchData();
  const ITEM_PER_PAGE = 12;
  const currentPage = page ? parseInt(page) : 1;
  const start = (currentPage - 1) * ITEM_PER_PAGE;
  const end = start + ITEM_PER_PAGE;
  const totalPage = Math.ceil(data.length / ITEM_PER_PAGE);
  const entries = data.slice(start, end);

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row gap-6 py-6 sm:py-10">
        {/* Filter Sidebar - Full width on mobile, fixed width on desktop */}
        <div className="w-full lg:w-64 xl:w-72">
          <JobFilter />
        </div>

        {/* Job Listings */}
        <div className="flex-1">
          {/* Grid layout responsive to screen size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {entries.map((job: Job) => (
              <Link
                href={`/jobs/${job._id}`}
                key={job._id}
                className="transition-transform hover:scale-[1.02]"
              >
                <JobCard
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  requirements={job.requirements}
                  startingSalary={job.startingSalary}
                  endingSalary={job.endingSalary}
                  jobType={job.jobType}
                  expireAt={job.expireAt}
                  createdAt={job.createdAt}
                  _id={job._id}
                  description={job.description}
                  updatedAt={job.updatedAt}
                  postedBy={job.postedBy}
                />
              </Link>
            ))}
          </div>

          {/* Pagination - Centered with proper spacing */}
          <div className="mt-8 sm:mt-10">
            <Pagination currentPage={currentPage} totalPages={totalPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

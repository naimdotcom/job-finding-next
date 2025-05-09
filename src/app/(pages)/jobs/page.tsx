import { JobCard } from "@/components/common/JobCard";
import JobFilter from "@/components/common/JobFilter";
import Pagination from "@/components/common/Pagination";
import axiosInstance from "@/lib/axios";
import { Job } from "@/types/job";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

type Props = {
  // params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string }>;
};

async function fetchData() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jobfindertoken")?.value || "";
    if (!token) return [];
    const data = await axiosInstance.get("/jobs", {
      // for server component
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
  const ITEM_PER_PAGE = "12";
  const PAGE = page ? page : "1";
  const start = (Number(PAGE) - 1) * Number(ITEM_PER_PAGE);
  const end = start + Number(ITEM_PER_PAGE);
  const totalPage = Math.ceil(data.length / Number(ITEM_PER_PAGE));
  const entries = data.slice(start, end);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-6 py-10 gap-4">
        <JobFilter />
        <div className="grid grid-cols-3 col-span-5 gap-3 ">
          {entries.map((job: Job) => (
            <Link href={`/jobs/${job._id}`} key={job._id}>
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
      </div>
      <Pagination currentPage={Number(PAGE)} totalPages={totalPage} />
    </div>
  );
};

export default page;

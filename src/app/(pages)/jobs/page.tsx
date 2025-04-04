import { JobCard } from "@/components/common/JobCard";
import JobFilter from "@/components/common/JobFilter";
import axiosInstance from "@/lib/axios";
import { cookies } from "next/headers";
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
    console.log(data.data.data);
    return data.data.data;
  } catch (error) {
    console.log("error while fetching jobs", error);
    return [];
  }
}

const page = async ({ searchParams }: Props) => {
  const { jobtype, salary, experience, page } = await searchParams;
  const data = await fetchData();
  const ITEM_PER_PAGE = "12";
  const PAGE = page ? page : "1";
  const start = (Number(PAGE) - 1) * Number(ITEM_PER_PAGE);
  const end = start + Number(ITEM_PER_PAGE);
  const totalPage = Math.ceil(data.length / Number(ITEM_PER_PAGE));
  const entries = data.slice(start, end);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-5 py-10 gap-4">
        <JobFilter />
        <div className="grid grid-cols-3 col-span-4 gap-3 ">
          {entries.map((job: any) => (
            <div key={job._id}>
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
                id={job._id}
                description={job.description}
                updatedAt={job.updatedAt}
                postedBy={job.postedBy}
              />
            </div>
          ))}
          {/*<JobCard />
          <JobCard />
          <JobCard /> */}
        </div>
      </div>
    </div>
  );
};

export default page;

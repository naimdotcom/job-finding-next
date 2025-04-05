import connect from "@/server/DB";
import Company from "@/server/modals/company.model";
import Job from "@/server/modals/job.model";
import { ApiError, ApiResponse } from "@/server/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import { payload } from "../auth/verify/route";
import User from "@/server/modals/user.model";
import cache from "@/server/utils/cache";

const CACHE_KEY = "jobs";
export const GET = async (req: NextRequest) => {
  try {
    const cachedJobs = cache.get(CACHE_KEY);

    if (cachedJobs) {
      console.log("Returning cached jobs data");
      return NextResponse.json(
        new ApiResponse(cachedJobs, "successfully fetched (from cache)")
      );
    }
    // If no cached data, fetch from database
    console.log("Fetching fresh jobs data");

    await connect();
    const jobs = await Job.find()
      .populate({
        path: "company",
        model: Company,
      })
      .populate({
        path: "postedBy",
        select: "-password",
        model: User,
      });

    if (!jobs) {
      return NextResponse.json(new ApiError("Jobs not found"), {
        status: 404,
      });
    }
    const plainJobs = jobs.map((job) => (job.toObject ? job.toObject() : job));

    cache.set(CACHE_KEY, plainJobs, 600);

    const response = NextResponse.json(
      new ApiResponse(jobs, "successfully fetched")
    );

    // Set cache control headers
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=60"
    );

    return response;
  } catch (error) {
    console.log("error while fetching jobs", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connect();

    const body = await req.json();
    const header = req.headers.get("x-user-data");
    const user = JSON.parse(header || "{}") as payload;
    const {
      title,
      description,
      location,
      startingSalary,
      endingSalary,
      company,
      requirements,
      jobType,
      expireAt,
    } = body;

    if (
      !title ||
      !description ||
      !location ||
      !company ||
      !requirements ||
      !jobType ||
      !expireAt ||
      !startingSalary
    ) {
      return NextResponse.json(new ApiError("All fields are required"), {
        status: 400,
      });
    }

    const isJobExist = await Job.findOne({ title });
    if (isJobExist && isJobExist.postedBy.toString() !== user.id) {
      return NextResponse.json(new ApiError("Job already exist by you"), {
        status: 400,
      });
    }

    const isCompanyCreatedByPoster = await Company.findById(company);
    if (!isCompanyCreatedByPoster) {
      return NextResponse.json(new ApiError("Company not found"), {
        status: 404,
      });
    }

    if (isCompanyCreatedByPoster.owner.toString() !== user.id) {
      console.log(isCompanyCreatedByPoster.owner.toString(), user.id);
      return NextResponse.json(new ApiError("company not created by you"), {
        status: 401,
      });
    }

    const newJob = await Job.create({
      title,
      description,
      location,
      company,
      requirements,
      jobType,
      expireAt,
      startingSalary: startingSalary,
      ...(endingSalary && { endingSalary }),
      postedBy: user.id,
    });
    if (!newJob) {
      return NextResponse.json(new ApiError("Job not created"), {
        status: 500,
      });
    }
    return NextResponse.json(
      new ApiResponse(newJob, "job created successfully")
    );
  } catch (error) {
    console.log("error while creating jobs", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const revalidate = 600; // 10 minutes in seconds

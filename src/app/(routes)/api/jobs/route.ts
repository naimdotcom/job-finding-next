import connect from "@/server/DB";
import Company from "@/server/modals/company.model";
import Job from "@/server/modals/job.model";
import { ApiError, ApiResponse } from "@/server/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import { payload } from "../auth/verify/route";

export const GET = async (req: NextRequest) => {
  try {
    await connect();

    const jobs = await Job.find();

    return NextResponse.json(new ApiResponse(jobs, "successfully fetched"));
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
      salary,
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
      !expireAt
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
      return NextResponse.json(new ApiError("Unauthorized"), {
        status: 401,
      });
    }
    const requirementsArray = requirements
      .split(",")
      .foreach((item: string) => {
        const text = item.trim();

        return `${text[0].toUpperCase()}${text.slice(1)},`;
      });

    const newJob = await Job.create({
      title,
      description,
      location,
      ...(salary && { salary: salary }),
      company,
      requirements,
      jobType,
      expireAt,
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

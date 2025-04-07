import connect from "@/server/DB";
import Company from "@/server/modals/company.model";
import Job from "@/server/modals/job.model";
import User from "@/server/modals/user.model";
import { ApiError, ApiResponse } from "@/server/utils/ApiResponse";
import cache from "@/server/utils/cache";
import { JOB_CACHE_KEY_PREFIX } from "@/server/utils/Constant";
import { isValidObjectId, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<any> },
  searchParams: Promise<{ [key: string]: string }>
) => {
  try {
    const { id } = await context.params;
    const cachedJobs = cache.get(`${JOB_CACHE_KEY_PREFIX}${id}`);
    if (cachedJobs) {
      console.log("returning cached jobs[id] data");
      return NextResponse.json(
        new ApiResponse(cachedJobs, "successfully fetched (from cache)"),
        { status: 200 }
      );
    }
    await connect();
    const ID = isValidObjectId(id)
      ? id
      : Types.ObjectId.createFromHexString(id);

    const job = await Job.findById(ID);
    if (!job) {
      return NextResponse.json(new ApiError("Job not found"), {
        status: 404,
      });
    }
    cache.set(`${JOB_CACHE_KEY_PREFIX}${id}`, job);

    return NextResponse.json(new ApiResponse(job, "successfully fetched"));
  } catch (error: any) {
    console.log("error while geting job via id", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const PUT = async (
  req: NextRequest,
  context: {
    params: Promise<any>;
  }
) => {
  try {
    await connect();
    const { id } = await context.params;
    const body = await req.json();
    const ID = isValidObjectId(id)
      ? id
      : Types.ObjectId.createFromHexString(id);

    const updatedJob = await Job.findByIdAndUpdate(ID, body, {
      new: true,
    });

    if (!updatedJob) {
      return NextResponse.json(new ApiError("Job not found"), {
        status: 404,
      });
    }
    return NextResponse.json(
      new ApiResponse(updatedJob, "successfully fetched"),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error while geting ", error);
  }
};

export const DELETE = async (
  req: NextRequest,
  context: {
    params: Promise<any>;
  }
) => {
  try {
    await connect();
    const { id } = await context.params;
    const ID = isValidObjectId(id)
      ? id
      : Types.ObjectId.createFromHexString(id);

    const deletedJob = await Job.findByIdAndDelete(ID);
    cache.del(`${JOB_CACHE_KEY_PREFIX}${id}`);
    if (!deletedJob) {
      return NextResponse.json(new ApiError("Job not found"), {
        status: 404,
      });
    }

    return NextResponse.json(
      new ApiResponse(deletedJob, "successfully deleted"),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("error while deleting job", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

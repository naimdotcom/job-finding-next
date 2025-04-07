import connect from "@/server/DB";
import Company from "@/server/modals/company.model";
import Job from "@/server/modals/job.model";
import User from "@/server/modals/user.model";
import { ApiError, ApiResponse } from "@/server/utils/ApiResponse";
import { isValidObjectId, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<any> },
  searchParams: Promise<{ [key: string]: string }>
) => {
  try {
    await connect();
    const { id } = await context.params;
    const ID = isValidObjectId(id)
      ? id
      : Types.ObjectId.createFromHexString(id);

    const job = await Job.findById(ID);
    if (!job) {
      return NextResponse.json(new ApiError("Job not found"), {
        status: 404,
      });
    }

    return NextResponse.json(new ApiResponse(job, "successfully fetched"));
  } catch (error) {}
};

export const PATCH = async (
  req: NextRequest,
  context: {
    params: Promise<any>;
    searchParams: Promise<{ [key: string]: string }>;
  }
) => {
  try {
  } catch (error) {
    console.log("error while geting ", error);
  }
};

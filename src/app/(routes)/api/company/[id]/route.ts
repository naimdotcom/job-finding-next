import connect from "@/server/DB";
import Company from "@/server/modals/company.model";
import Job from "@/server/modals/job.model";
import User from "@/server/modals/user.model";
import { ApiError, ApiResponse } from "@/server/utils/ApiResponse";
import { Types } from "mongoose";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<any> }
) => {
  try {
    await connect();
    const { id } = await context.params;
    const ID = isValidObjectId(id)
      ? id
      : Types.ObjectId.createFromHexString(id);

    const companyJobs = await Job.find({ company: ID })
      .populate({
        path: "postedBy",
        model: User,
        select: "-password",
      })
      .lean();

    const company = await Company.findById(ID).lean();
    if (!company) {
      return NextResponse.json(new ApiError("Company not found"), {
        status: 404,
      });
    }
    return NextResponse.json(
      new ApiResponse(
        {
          company: company,
          jobs: companyJobs.length > 0 ? companyJobs : [],
        },
        "successfully fetched"
      ),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("error while fetching company and jobs", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

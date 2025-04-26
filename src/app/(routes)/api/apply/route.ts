import { NextRequest, NextResponse } from "next/server";
import { payload } from "../auth/verify/route";
import { ApiError } from "@/server/utils/ApiResponse";
import Job from "@/server/modals/job.model";
import JobApplicant from "@/server/modals/applied.model";

export const GET = async (req: NextRequest) => {
  try {
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log("error while applying job", error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log("body: ", body);
    const header = req.headers.get("x-user-data");
    const user = JSON.parse(header || "{}") as payload;
    const { jobId, coverLetter, resumeUrl } = body;
    if (!jobId || !resumeUrl || !user.id) {
      return NextResponse.json(new ApiError("All fields are required"), {
        status: 400,
      });
    }

    const isUserAppliedTheJob = await JobApplicant.findOne({
      applicant: user.id,
      job: jobId,
    });
    if (isUserAppliedTheJob) {
      return NextResponse.json(new ApiError("User already applied the job"), {
        status: 400,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json(new ApiError("Job not found"), {
        status: 404,
      });
    }

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log("error while applying job", error);
  }
};

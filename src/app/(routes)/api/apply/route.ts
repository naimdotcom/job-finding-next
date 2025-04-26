import { NextRequest, NextResponse } from "next/server";
import { payload } from "../auth/verify/route";
import { ApiError, ApiResponse } from "@/server/utils/ApiResponse";
import Job from "@/server/modals/job.model";
import JobApplicant from "@/server/modals/applied.model";
import connect from "@/server/DB";
import { JOB_APPLICANT_CACHE_KEY_PREFIX } from "@/server/utils/Constant";
import cache from "@/server/utils/cache";

export const GET = async (req: NextRequest) => {
  try {
    const header = req.headers.get("x-user-data");
    const user = JSON.parse(header || "{}") as payload;

    if (!user || !user.id) {
      return NextResponse.json(
        { message: "Unauthorized", verified: false },
        { status: 401 }
      );
    }
    const cachedJobApplication = cache.get(
      `${JOB_APPLICANT_CACHE_KEY_PREFIX}${user.id}`
    );
    if (cachedJobApplication) {
      console.log("returning cached job applications data");
      return NextResponse.json(
        new ApiResponse(
          cachedJobApplication,
          "successfully fetched (from cache)"
        ),
        { status: 200 }
      );
    }

    await connect();

    const jobApplicants = await JobApplicant.find({ applicant: user.id });
    if (!jobApplicants) {
      return NextResponse.json(new ApiError("Job Applicants not found"), {
        status: 404,
      });
    }

    cache.set(`${JOB_APPLICANT_CACHE_KEY_PREFIX}${user.id}`, jobApplicants);
    return NextResponse.json(
      new ApiResponse(jobApplicants, "successfully fetched ")
    );
  } catch (error) {
    console.log("error while applying job", error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const body = await req.json();
    const header = req.headers.get("x-user-data");
    const user = JSON.parse(header || "{}") as payload;
    console.log("body: ", body, user);
    const { jobId, coverLetter, resumeUrl } = body;
    if (!jobId || !resumeUrl || !user) {
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

    const appliedJob = await JobApplicant.create({
      job: jobId,
      applicant: user.id,
      resumeUrl: resumeUrl,
      coverLetter: coverLetter ? coverLetter : "",
    });

    if (!appliedJob) {
      return NextResponse.json(new ApiError("Failed to apply job"), {
        status: 500,
      });
    }

    return NextResponse.json(
      new ApiResponse(appliedJob, "Job applied successfully"),
      { status: 200 }
    );
  } catch (error) {
    console.log("error while applying job", error);
  }
};

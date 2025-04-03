import connect from "@/server/DB";
import Job from "@/server/modals/job.model";
import { ApiResponse } from "@/server/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";

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
    console.log("body: ", body);
    const { title, description, location, salary } = body;
  } catch (error) {
    console.log("error while creating jobs", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

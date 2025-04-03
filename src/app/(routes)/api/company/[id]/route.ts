import connect from "@/server/DB";
import Company from "@/server/modals/company.model";
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
    const ID = isValidObjectId(id) ? id : new Types.ObjectId(id);
    const company = await Company.findById(ID);
    if (!company) {
      return NextResponse.json(new ApiError("Company not found"), {
        status: 404,
      });
    }
    return NextResponse.json(new ApiResponse(company, "successfully fetched"));
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

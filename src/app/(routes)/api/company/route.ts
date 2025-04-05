import connect from "@/server/DB";
import Company from "@/server/modals/company.model";
import { ApiError, ApiResponse } from "@/server/utils/ApiResponse";
import { NextRequest, NextResponse } from "next/server";
import { payload } from "../auth/verify/route";
import { isObjectIdOrHexString, isValidObjectId } from "mongoose";
import User from "@/server/modals/user.model";

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const body = await req.json();
    const header = req.headers.get("x-user-data");
    const user = JSON.parse(header || "{}") as payload;
    console.log("body: ", body);
    const {
      name,
      location,
      industry,
      description,
      website,
      foundedYear,
      employees,
    } = body;

    if (!name || !location || !industry || !description) {
      return NextResponse.json(new ApiError("All fields are required"), {
        status: 400,
      });
    }

    const isCompanyExist = await Company.findOne({ name: name });
    console.log(isCompanyExist);
    if (isCompanyExist) {
      return NextResponse.json(new ApiError("Company already exist"), {
        status: 400,
      });
    }

    const company = await Company.create({
      name,
      location,
      industry,
      description,
      website,
      foundedYear,
      employees,
      owner: user.id,
    });
    if (!company) {
      return NextResponse.json(new ApiError("Company not created"), {
        status: 500,
      });
    }

    return NextResponse.json(new ApiResponse(company, "successfully created"), {
      status: 201,
    });
  } catch (error) {
    console.log("error while creating company", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connect();
    const header = req.headers.get("x-user-data");
    const user = JSON.parse(header || "{}") as payload;
    const userID = isValidObjectId(user.id)
      ? user.id
      : isObjectIdOrHexString(user.id);
    const companies = await Company.find({
      owner: userID,
    }).populate({
      path: "owner",
      model: User,
      select: "-password -updatedAt -__v",
    });
    if (!companies) {
      return NextResponse.json(new ApiError("Company not found"), {
        status: 404,
      });
    }

    return NextResponse.json(
      new ApiResponse(companies, "successfully fetched")
    );
  } catch (error) {
    console.log("error while fetching company", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

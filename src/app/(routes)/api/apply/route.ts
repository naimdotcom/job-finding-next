import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log("error while applying job", error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log("error while applying job", error);
  }
};

import connect from "@/server/DB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<any> }
) => {
  try {
    await connect();
    const { id } = await context.params;

    console.log(id);
    return NextResponse.json({ id });
  } catch (error) {
    console.log("error while fetching user", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

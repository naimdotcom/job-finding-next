import connect from "@/server/DB";
import { ApiResponse } from "@/server/utils/ApiResponse";
import { NextResponse } from "next/server";

export type payload = {
  id: string;
  name: string;
  email: string;
};

export const GET = async (req: Request) => {
  try {
    await connect();
    const header = req.headers.get("x-user-data");
    const user = JSON.parse(header || "{}") as payload;

    if (!user || !user.id) {
      return NextResponse.json(
        { message: "Unauthorized", verified: false },
        { status: 401 }
      );
    }
    // const id = isValidObjectId(user.id) ? new Types.ObjectId(user.id) : user.id;
    // const isUserExist = await User.findOne({ _id: id });
    // if (!isUserExist) {
    //   return NextResponse.json(new ApiError("User not found"), { status: 401 });
    // }
    return NextResponse.json(
      new ApiResponse(user, "successfully verified", null)
    );
  } catch (error) {
    console.log("error while verifying token", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

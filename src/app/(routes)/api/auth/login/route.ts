import connect from "@/server/DB";
import User from "@/server/modals/user.model";
import { ApiError, ApiResponse } from "@/server/utils/ApiResponse";
import { generateToken } from "@/server/utils/auth.middleware";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connect();
    const body = await req.json();
    const { email, password } = body;
    console.log("body: ", body);
    if (!email || !password) {
      return NextResponse.json(new ApiError("All fields are required"), {
        status: 400,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(new ApiError("User not found"), {
        status: 404,
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    console.log("isPasswordValid: ", isPasswordValid);
    if (!isPasswordValid) {
      return NextResponse.json(new ApiError("Invalid password"), {
        status: 401,
      });
    }

    console.log("user: ", user);

    // todo: varified work
    // if (!user.varified) {
    //   return NextResponse.json(
    //     { message: "User is not varified" },
    //     { status: 401 }
    //   );
    // }

    const token = await generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    const response = NextResponse.json(
      new ApiResponse(user, "successfully logged in", token),
      { status: 200 }
    );

    response.cookies.set("jobfindertoken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 10, // 7 days
    });

    return response;
  } catch (error: any) {
    console.log("error while user login", error.message);
  }
};

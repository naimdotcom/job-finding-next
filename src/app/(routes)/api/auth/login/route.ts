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

    const token = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
    });

    const response = NextResponse.redirect(new URL("/", req.url));

    response.cookies.set("jobfindertoken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.log("error while user login", error.message);
  }
};

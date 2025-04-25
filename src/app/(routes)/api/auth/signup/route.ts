import connect from "@/server/DB";
import User from "@/server/modals/user.model";
import { ApiError, ApiResponse } from "@/server/utils/ApiResponse";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connect();

    const body = await req.json();
    console.log("body: ", body);
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(new ApiError("All fields are required"), {
        status: 400,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(new ApiError("User already exists"), {
        status: 400,
      });
    }

    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
      role: "user",
    });
    if (!newUser) {
      return NextResponse.json(new ApiError("User not created"), {
        status: 500,
      });
    }

    return NextResponse.json(
      new ApiResponse(newUser, "User created successfully"),
      { status: 201, statusText: "Created" }
    );
  } catch (error) {
    console.log("error while user signup", error as Error);
    return NextResponse.json(new ApiError("User not created", error as Error), {
      status: 500,
    });
  }
};

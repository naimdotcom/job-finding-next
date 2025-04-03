import connect from "@/server/DB";
import User from "@/server/modals/user.model";

import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connect();
    const user = await User.find();
    return NextResponse.json({ message: "Login", user: user });
  } catch (error: any) {
    console.log("error while user login", error.message);
    NextResponse.json({ message: "Error" }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    await connect();
    console.log("req: ", req.headers.get("x-user-data"));
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    // todo: varified work
    // if (!user.varified) {
    //   return NextResponse.json(
    //     { message: "User is not varified" },
    //     { status: 401 }
    //   );
    // }

    return NextResponse.json({ message: "Login", body: body });
  } catch (error: any) {
    console.log("error while user login", error.message);
  }
};

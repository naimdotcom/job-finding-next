import { verifyToken } from "@/server/utils/auth.middleware";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/landing",
    "/log-in",
    "/signup",
    "/jobs",
    "/jobs/:path*",
    "/api/user/:path*",
  ],
  runtime: "nodejs",
};

export async function middleware(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get("jobfindertoken");
    const isPublicRoute =
      path === "/" ||
      path === "/landing" ||
      path === "/log-in" ||
      path === "/signup";
    const isBackend = path.startsWith("/api");

    console.log("isbackend", isBackend);

    if (!token?.name || !token?.value) {
      if (isBackend) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      if (!isPublicRoute) {
        return NextResponse.redirect(new URL("/log-in", req.url));
      }
      return NextResponse.next();
    }

    const decoded = verifyToken(token.value);
    console.log("decoded", decoded, token);
    if (!decoded) {
      if (isBackend) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const response = NextResponse.redirect(new URL("/log-in", req.url));
      response.cookies.delete("jobfindertoken");
      return response;
    }

    const requestHeader = new Headers(req.headers);
    requestHeader.set("x-user-data", JSON.stringify(token.value));

    if (isPublicRoute && !isBackend) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next({
      request: {
        headers: requestHeader,
      },
    });
  } catch (error) {
    console.log("error while middleware", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

import { verifyToken } from "@/server/utils/auth.middleware";
import { NextRequest, NextResponse } from "next/server";

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
    const isProtectedAPI = path.startsWith("/api/user");
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

    const decoded = await verifyToken(token.value);
    if (!decoded) {
      if (isBackend) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const response = NextResponse.redirect(new URL("/log-in", req.url));
      response.cookies.delete("jobfindertoken");
      return response;
    }

    const requestHeader = new Headers(req.headers);
    requestHeader.set("x-user-data", JSON.stringify(decoded));

    if (isPublicRoute && !isBackend) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (isBackend) {
      return NextResponse.next({
        request: {
          headers: requestHeader,
        },
      });
    }

    // return NextResponse.next();
  } catch (error) {
    console.log("error while middleware", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export const config = {
  matcher: [
    "/landing",
    "/log-in",
    "/signup",
    "/jobs",
    "/jobs/:path*",
    "/api/user",
    "/api/user/:path*",
    "/api/auth/verify",
    "/api/company",
    "/api/jobs",
  ],
};

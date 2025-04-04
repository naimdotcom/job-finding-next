import { verifyToken } from "@/server/utils/auth.middleware";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    const path = req.nextUrl.pathname;
    const isPublicRoute =
      path === "/landing" || path === "/log-in" || path === "/signup";
    const isBackend = path.startsWith("/api");

    // Extract token from "Authorization" header (Bearer <token>)
    let auth = req.headers.get("Authorization");
    let token = auth?.replace("Bearer ", "");

    // If no token in Authorization, fallback to cookies
    if (!token) {
      token = req.cookies.get("jobfindertoken")?.value || "";
    }

    // If no token is found, handle unauthorized access
    if (!token) {
      if (isBackend) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      if (!isPublicRoute) {
        return NextResponse.redirect(new URL("/log-in", req.url));
      }
      return NextResponse.next();
    }

    // Verify token
    const decoded = await verifyToken(token);
    if (!decoded) {
      if (isBackend) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const response = NextResponse.redirect(new URL("/log-in", req.url));
      response.cookies.delete("jobfindertoken"); // Remove invalid token
      return response;
    }

    // Prevent authenticated users from accessing public routes (like login/signup)
    if (isPublicRoute && !isBackend) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Attach user data to backend requests
    if (isBackend) {
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-data", JSON.stringify(decoded));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    return NextResponse.next();
  } catch (error) {
    console.log("Error in middleware:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Define routes to apply middleware
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
    "/api/jobs/:path*",
    "/",
  ],
};

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("token")?.value;

  const publicRoutes = ["/", "/login", "/register"];

  if (!accessToken) {
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  if ((accessToken && pathname === "/login") || pathname === "/register") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|auth|favicon.ico).*)"],
};

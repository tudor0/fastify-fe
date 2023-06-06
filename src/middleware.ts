import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/profile"];

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("jw-token");
  const currentPath = new URL(req.url, process.env.NEXT_PUBLIC_FRONTEND_URL)
    .pathname;

  const isAuthRoute = authRoutes.some((x: string) => x === currentPath);
  const isProtectedRoute = protectedRoutes.some(
    (x: string) => x === currentPath
  );

  if (!authToken && isProtectedRoute && !isAuthRoute) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (authToken && isAuthRoute && currentPath === "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"]
};

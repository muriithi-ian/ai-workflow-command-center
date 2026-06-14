import { NextRequest, NextResponse } from "next/server";

const demoSessionCookie = "demo_session";

export function middleware(request: NextRequest) {
  const session = request.cookies.get(demoSessionCookie);

  if (session?.value === "admin") {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/ai-runs/:path*",
    "/audit-logs/:path*",
    "/dashboard/:path*",
    "/documents/:path*",
    "/rag/:path*",
    "/reviews/:path*",
    "/workflows/:path*"
  ]
};

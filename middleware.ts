import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware";

export default withAuth((req) => {
  const isLoggedIn = !!req.nextauth?.token
  const { nextUrl } = req
  const isAdmin = ((req.nextauth?.token?.user as { role?: string })?.role === "admin");

  if (nextUrl.pathname === "/api/setup") {
    return NextResponse.next()
  }

  console.log('logelian ', nextUrl.pathname);
  if (nextUrl.pathname === "/api/scheduled-messages") {
    return NextResponse.next()
  }

  const isAuthRoute = nextUrl.pathname.startsWith("/auth") || nextUrl.pathname.startsWith("/api/auth")
  const isApiRoute = nextUrl.pathname.startsWith("/api")
  const isAdminRoute = nextUrl.pathname.startsWith("/admin")
  const isSetupRoute = nextUrl.pathname.startsWith("/setup")

  // Allow access to setup route
  if (isSetupRoute) {
    return NextResponse.next()
  }

  // Allow access to auth routes when not logged in
  if (!isLoggedIn && isAuthRoute) {
    return NextResponse.next()
  }

  // Allow access to API routes
  if (isApiRoute) {
    return NextResponse.next()
  }

  // Redirect to login if not logged in and trying to access protected routes
  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl.origin))
  }

  // Redirect to dashboard if logged in and trying to access auth routes
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", nextUrl.origin))
  }

  // Restrict admin routes to admin users only
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // everything except Next.js internals, "/auth/*" and "/api/auth/*"
    // everything except Next.js internals, "/auth/*" and "/api/auth/*" and "/api/setup"
    "/((?!_next/static|_next/image|favicon.ico|auth|api/auth|api/setup).*)"
  ],
  runtime: "nodejs",
}
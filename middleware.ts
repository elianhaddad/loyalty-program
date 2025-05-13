import { NextResponse } from "next/server"
import { auth } from "@/auth"

// Asegúrate de que este archivo solo se ejecute en el servidor
export const runtime = "nodejs"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req
  const isAdmin = req.auth?.user?.role === "admin"

  const isAuthRoute = nextUrl.pathname.startsWith("/auth")
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
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

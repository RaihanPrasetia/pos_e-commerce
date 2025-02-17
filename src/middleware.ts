import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_KEY = process.env.X_API_KEY || "my-secure-api-key";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session_user");
  const { pathname } = req.nextUrl;

  // **Handle API Routes**
  if (pathname.startsWith("/api")) {
    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || apiKey !== API_KEY) {
      return NextResponse.json({ message: "Invalid API Key" }, { status: 403 });
    }

    if (!session && !pathname.startsWith("/api/auth/login")) {
      return NextResponse.json(
        { message: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // **Redirect ke login jika tidak ada sesi**
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Terapkan middleware hanya untuk halaman yang perlu autentikasi
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/customers/:path*",
    "/products/:path*",
    "/transaction/:path*",
    "/order/:path*",
    "/api/:path*",
  ],
};

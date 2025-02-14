import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_KEY = process.env.X_API_KEY || "my-secure-api-key";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session_user");

  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // **Cek API Key**
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== API_KEY) {
    return NextResponse.json({ message: "Invalid API Key" }, { status: 403 });
  }

  // Jika user mencoba mengakses endpoint selain `/api/auth/login`
  if (!session && !req.nextUrl.pathname.startsWith("/api/auth/login")) {
    return NextResponse.json(
      { message: "Unauthorized: Please log in" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

// Terapkan middleware hanya untuk API endpoint
export const config = {
  matcher: ["/api/:path*"],
};

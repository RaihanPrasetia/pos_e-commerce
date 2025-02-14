import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // Next.js API for handling cookies
import { initialUser } from "@/libs/fake-db/userDb"; // Simulasi database
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Cari user berdasarkan email
    const user = initialUser.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Periksa password dengan bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Simpan session dalam cookies
    (await cookies()).set(
      "session_user",
      JSON.stringify({ id: user.id, email: user.email, role: user.role }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 8 * 60 * 60, // 8 jam
      }
    );

    return NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}

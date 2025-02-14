import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).delete("session_user"); // Hapus session user
  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}

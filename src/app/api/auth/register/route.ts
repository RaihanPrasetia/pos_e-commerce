import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { userType } from "@/type/userTypes";
import { initialUser } from "@/libs/fake-db/userDb";

// Simpan user secara sementara (seharusnya di database)

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Validasi input
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const existingUser = initialUser.find((user) => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser: userType = {
      id: uuidv4(), // Generate UUID
      email,
      password: hashedPassword, // Simpan password yang sudah di-hash
      name,
      role: "admin",
      createdDt: new Date().toISOString(),
      updateDt: null,
    };

    // Simpan user (sebaiknya di database)
    initialUser.push(newUser);

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

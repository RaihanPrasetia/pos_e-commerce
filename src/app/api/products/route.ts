import { initialProducts } from "@/libs/fake-db/productDb";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ products: initialProducts }, { status: 200 });
}

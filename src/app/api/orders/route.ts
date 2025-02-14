import { initialOrders } from "@/libs/fake-db/orderDb";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ orders: initialOrders }, { status: 200 });
}

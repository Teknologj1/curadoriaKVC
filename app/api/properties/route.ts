import { NextResponse } from "next/server";
import { getAllProperties } from "@/lib/data";

export async function GET() {
  return NextResponse.json(getAllProperties());
}


import { NextResponse } from "next/server";
import { getPropertyBySlug } from "@/lib/data";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const item = getPropertyBySlug(params.slug);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}


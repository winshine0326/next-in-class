import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get("name");
  const age = searchParams.get("age");

  return NextResponse.json({
    name,
    age,
  });
}

import { NextResponse } from "next/server";

export async function GET() {
  const date = new Date();
  console.log("ㅇㄹㅁㅇ");
  return NextResponse.json(date);
}

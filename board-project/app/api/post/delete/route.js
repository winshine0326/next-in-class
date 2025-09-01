import { connectDB } from "@/app/util/database";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());

    // console.log("ID:", body._id);

    let client = await connectDB;
    const db = client.db("board");

    if (!body._id) {
      console.log("ID가 없음");
      return NextResponse.json("id X");
    }
    const result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(body._id) });
    console.log("삭제 결과:", result);
  } catch (error) {
    console.error("삭제 중 오류:", error);
    return NextResponse.json("삭제 중 오류");
  } finally {
    return NextResponse.redirect(new URL("/list", request.url), 302);
  }
}

import { connectDB } from "../../util/database.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const client = await connectDB;
    const db = client.db("board");

    const posts = await db.collection("post").find().toArray();

    return NextResponse.json(posts, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('게시물 조회 오류:', error);
    return NextResponse.json(
      { error: "게시물을 조회하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

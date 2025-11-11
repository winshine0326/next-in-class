/* app/api/post/edit/route.js */
import { connectDB } from "@/util/database.js";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// App Router 방식에 맞게 POST 메서드로 작성
export async function POST(request) {
  try {
    // 폼 데이터 파싱
    const formData = await request.formData();
    let body = Object.fromEntries(formData.entries());

    // 기본 검증
    if (!body._id) {
      return NextResponse.json("_id가 필요합니다", { status: 400 });
    }
    if (!body.title || body.title.trim() === "") {
      return NextResponse.json("제목을 씁시다", { status: 400 });
    }

    // DB 업데이트
    const db = (await connectDB).db("board");
    await db.collection("post").updateOne(
      { _id: new ObjectId(body._id) },
    
      // body.content ?? "": 폼에서 content 값이 없으면 빈 문자열로 대체
      { $set: { title: body.title, content: body.content ?? "" } }
    );
    // App Router에서는 redirect를 NextResponse.redirect로 처리
    return NextResponse.redirect(new URL("/list", request.url), 302);
  } catch (error) {
    console.error(error);
    return NextResponse.json("서버 오류", { status: 500 });
  }
}
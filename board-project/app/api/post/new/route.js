import { connectDB } from "@/app/util/database";
import { NextResponse } from "next/server";

// App Router 방식에 맞게 POST 메서드로 작성
export async function POST(request) {
  try {
    // formData를 비동기로 파싱 (POST 요청의 form 데이터 받기)
    const formData = await request.formData();
    // formData의 entries를 객체로 변환 (key-value 쌍으로 변환)
    const body = Object.fromEntries(formData.entries());
    //}

    //body로 전송된 데이터를 DB에 저장
    let client = await connectDB;
    const db = client.db("board");
    await db.collection("post").insertOne(body);

    // App Router에서는 redirect를 NextResponse.redirect로 처리
    return NextResponse.redirect(new URL("/list", request.url), 302);
  } catch (error) {}
}

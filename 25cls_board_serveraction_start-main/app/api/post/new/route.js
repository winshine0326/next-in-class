import { authOptions } from "@/lib/auth";
import { connectDB } from "@/util/database.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
//주요기능 
// 1. App Router 방식에 맞게 POST 메서드로 글 작성하기
// 2. 글 작성시 세션 정보 (유저메일을 추가하기)
export async function POST(request) {

  let session = await getServerSession(authOptions); //2-1. 로그인 session 정보 가져오기
  console.log(session)
  try {
      const formData = await request.formData();
      // formData의 entries를 객체로 변환 (key-value 쌍으로 변환)
       let body = Object.fromEntries(formData.entries());
      if (session) {
        body.author = session.user.email; //2-2. body 정보에 author 추가
      }
     
    //}

    if (!body.title || body.title.trim() === "") {
      return NextResponse.json("제목을 씁시다", { status: 500 });
    }

    const db = (await connectDB).db("board");
    const result = await db.collection("post").insertOne(body);

    // 클라이언트에서 처리할 수 있도록 JSON 응답 반환
    return NextResponse.json({ 
      success: true, 
      message: "게시글이 성공적으로 작성되었습니다.",
      id: result.insertedId 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json("서버 오류", { status: 500 });
  }
}
 

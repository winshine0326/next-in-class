import { authOptions } from "@/lib/auth";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
    // body: JSON.stringify({ //Object를 body로 전송시 문자열로 변환 
    //     content: comment, // 댓글 내용
    //     author: author, // 부모글 작성자
    //     parent: _id, // 부모 게시글의 ID
    //   }),
 
export async function POST(request) {
 
    const body = await request.json();
    console.log('요청 본문:', body);
    
    if (!body.content || !body.parent) {
        return new Response(JSON.stringify("필수 데이터가 누락되었습니다"), { status: 400 });
    }
    const 입력내용 = {
        content: body.content,
        parent: new ObjectId(body.parent),
        author: body.author,
    };
    const db = (await connectDB).db("board");
    const result = await db.collection("comment").insertOne(입력내용);
    console.log('댓글 저장 성공:', result);
    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
    

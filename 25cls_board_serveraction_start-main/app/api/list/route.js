import { connectDB } from "@/util/database";


import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
export async function GET(request){ //default 아님 주의 (request소문자 주의))
    
    try {
        const samplePosts = [
            { _id : new ObjectId(), title: "샘플 제목 1", content: "샘플 내용 1" },
            { _id : new ObjectId(), title: "샘플 제목 2", content: "샘플 내용 2" },
            { _id : new ObjectId(), title: "샘플 제목 3", content: "샘플 내용 3" },
            { _id : new ObjectId(), title: "샘플 제목 4", content: "샘플 내용 4" },
          ];
 
        //1-3. 서버 라우트 준비  
        const db = (await connectDB).db("board");
        let result = await db.collection("post").find().toArray();
        if (result.length === 0) {

    
            await db.collection("post").insertMany(samplePosts);
            result = await db.collection("post").find().toArray();
          }
        // _id가 ObjectId 타입이므로, 클라이언트에서 사용하려면 문자열로 변환 필요
        const resultStr = result.map(item => ({
            ...item,
            _id: item._id.toString(),
        }));
        return NextResponse.json(resultStr);
    } catch (error) {
        console.error("DB 접속 에러:", error);
        return NextResponse.json({ error: "DB 접속 에러" }, { status: 500 });
    }
}

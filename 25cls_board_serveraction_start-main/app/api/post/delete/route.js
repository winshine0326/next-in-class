import { authOptions } from "@/lib/auth"; //2-0
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";//2-0

import { NextResponse } from "next/server";
//주요기능
//1. _id가 일치하면 삭제기능
//2. user정보가 일치하면 삭제기능
export async function DELETE(request) {
    try {
       
        // body에서 id 값 추출 (fetch에서 body로 id를 보냄)
        const body = await request.text();
        if (!body) {
            return NextResponse.json("삭제할 id가 필요합니다", { status: 400 });
        }

        const db = (await connectDB).db("board");
        // 삭제할 데이터가 실제로 존재하는지 확인
        const 찾은거 = await db.collection('post').findOne({ _id: new ObjectId(body) });
        if (!찾은거) {
            return NextResponse.json("해당 게시글을 찾을 수 없습니다", { status: 404 });
        }
         
        //2-1. 세션 정보 가져오기 (await 추가)
         const session = await getServerSession(authOptions);
         // 2-2. 로그인 여부 확인
         if (!session || !session.user || !session.user.email) {
             return NextResponse.json("로그인이 필요합니다", { status: 401 });
         }
        //2-3. 로그인한 유저의 email과 DB의 email(author)이 일치하는지 확인
        if (찾은거.author !== session.user.email) {
            return NextResponse.json("삭제 권한이 없습니다", { status: 403 });
        }

        // 실제 삭제 진행
        const delResult = await db.collection("post").deleteOne({ _id: new ObjectId(body) });
        if (delResult.deletedCount === 1) {
            return NextResponse.json(body + " 삭제성공", { status: 200 });
        } else {
            return NextResponse.json("삭제 실패", { status: 500 });
        }
    } catch (error) {
    console.error(error);
    return NextResponse.json("서버오류", { status: 500 });
    }
}


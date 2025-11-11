  import { NextResponse } from "next/server";
  import { connectDB } from "@/util/database";
  import { ObjectId } from "mongodb";
  
  export async function GET(request, {params}){
    try {
      const {id} = await params;
      if (!id) {
        return NextResponse.json("조회할 id가 필요합니다", { status: 400 });
      }

      const db = (await connectDB).db("board");
      const post = await db.collection('post').findOne({ _id: new ObjectId(id) });

      if (!post) {
        return NextResponse.json("해당 게시글을 찾을 수 없습니다", { status: 404 });
      }

      // ObjectId를 문자열로 변환해서 반환
      return NextResponse.json({
        ...post,
        _id: post._id.toString()
      }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json("서버오류", { status: 500 });
    }
  }
  // app router 방식(GET, DELETE 등 함수로 export)
  export async function DELETE(request, { params }) {
    // params.id로 동적 라우트 id 접근
    try {
      const {id} = await params;
      if (!id) {
        return NextResponse.json("삭제할 id가 필요합니다", { status: 400 });
      }
  
      const db = (await connectDB).db("board");
      // 삭제할 데이터가 실제로 존재하는지 확인
      const 찾은거 = await db.collection('post').findOne({ _id: new ObjectId(id) });
      if (!찾은거) {
        return NextResponse.json("해당 게시글을 찾을 수 없습니다", { status: 404 });
      }
      else { console.log(id)}
      // 실제 삭제 진행
      const delResult = await db.collection("post").deleteOne({ _id: new ObjectId(id) });
      if (delResult.deletedCount === 1) {
        return NextResponse.json(id + " 삭제성공", { status: 200 });
      } else {
        return NextResponse.json("삭제 실패", { status: 500 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json("서버오류", { status: 500 });
    }
  }
  
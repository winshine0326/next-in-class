import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb"; //1-2. ObjectId 임포트
 
//주요기능
//1. 부모게시물 id를 요청 파라미터로 받아서  댓글 입력

export async function GET(request, {params}) {//params는 폴더명[id]로 전송
  try {
    // params.id에서 id 추출 (app router 방식)
    const {id} =  await params;
    const db = (await connectDB).db("board");
    const comments = await db
      .collection("comment")
      .find({ parent: new ObjectId(id) })
      .toArray();

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("서버 오류:", error);
    return new Response(JSON.stringify("서버오류"), { status: 500 });
  }
}

export async function DELETE(request, {params} ){
  try {
    const {id} = await params;
 
    const db = (await connectDB).db("board");
 
    const result = await db.collection("comment").deleteOne({ _id: new ObjectId(id) });
    return new Response(JSON.stringify({ deletedCount: result.deletedCount }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("삭제 중 오류:", error);
    return new Response(JSON.stringify("서버오류"), { status: 500 });
  }
}
export async function PATCH(request, {params} ) {
  try {
  const {id} = await params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify("로그인이 필요합니다"), { status: 401 });
    }
    if (!id) {
      return new Response(JSON.stringify("id가 필요합니다"), { status: 400 });
    }
    const body = await request.json();
    if (!body.content) {
      return new Response(JSON.stringify("내용이 필요합니다"), { status: 400 });
    }

    const db = (await connectDB).db("board");
    // 댓글 작성자인지 확인
    const comment = await db.collection("comment").findOne({ _id: new ObjectId(id) });
    if (!comment) {
      return new Response(JSON.stringify("댓글을 찾을 수 없습니다"), { status: 404 });
    }
    if (comment.author !== session.user.email) {
      return new Response(JSON.stringify("권한이 없습니다"), { status: 403 });
    }

    const result = await db.collection("comment").updateOne(
      { _id: new ObjectId(id) },
      { $set: { content: body.content } }
    );

    return new Response(JSON.stringify({ modifiedCount: result.modifiedCount }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("댓글 수정 중 오류:", error);
    return new Response(JSON.stringify("서버오류"), { status: 500 });
  }
}


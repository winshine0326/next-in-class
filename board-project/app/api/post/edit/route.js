/* app/api/post/edit/route.js */
import { connectDB } from "../../../util/database.js";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {

    const formData = await request.formData();
    const body = Object.fromEntries(formData.entries());

    if (!body._id) {
      return NextResponse.json("게시글 ID가 없습니다!", { status: 500 });
    }

    if (!body.title || body.title.trim() === "") {
      return NextResponse.json("제목을 입력해주세요!", { status: 500 });
    }

    const client = await connectDB;
    const db = client.db("board");

    await db.collection("post").updateOne(
      { _id: new ObjectId(body._id) },
      {
        $set: {
          title: body.title,
          content: body.content ?? "",
          updatedAt: new Date()
        }
      }
    );

    return NextResponse.redirect(new URL(`/detail/${body._id}`, request.url), 302);
  } catch (error) {
    console.error(error);
    return NextResponse.json("서버 오류", { status: 500 });
  }
}

"use server";
// /app/actions/create-comment.js
import { revalidateTag } from "next/cache";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

// useActionState는 첫 인자로 이전 상태(previousState)를 받습니다.
export async function createCommentAction(prevState, formData) {
  try {
    const db = (await connectDB).db("board");
    //1. form Data를 객체 변수 commentData 에 저장하기
    const content = formData.get("content");
    const author = formData.get("author");
    const parent = formData.get("parent");

    //2. DB의 comment 컬렉션에 commentData 입력하기
    const commentData = {
      content: content,
      parent: new ObjectId(parent),
      author: author,
    };

    //3. `comment-${postId)}` 옵션으로 fetch한 데이터만 새로고침하기
    await db.collection("comment").insertOne(commentData);

    revalidateTag(`comment-${parent}`);
    //4. 폼state 리턴
    return { status: "success", message: "댓글이 성공적으로 작성되었습니다." };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { status: "error", message: "댓글 작성 중 오류가 발생했습니다." };
  }
}

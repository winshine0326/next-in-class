"use server";

import { revalidateTag } from "next/cache";

export async function deleteCommentAction(state, formData) {
  const commentId = formData.get("commentId")?.toString();
  const postId = formData.get("postId")?.toString();
  const author = formData.get("author")?.toString();
  //1. formData에서 commentId,postId,author저장하기

  try {
    //2.commentId이용하여 DELETE (api/comment/list/commentId)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/list/${commentId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    //3. 새로고침(revalidateTag option값:`comment-${postId}`)

    return {
      //4. 서버액션상태 리턴
      status: true,
      error: "",
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다 : ${err}`,
    };
  }
}

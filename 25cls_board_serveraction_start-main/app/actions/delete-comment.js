"use server";

import { revalidateTag } from "next/cache";

export async function deleteCommentAction(state, formData) {
 //1. formData에서 commentId,postId,author저장하기
 
 //2.commentId이용하여 DELETE (api/comment/list/commentId)
  
 //3. 새로고침(revalidateTag 이용)

 //4. 서버액션 상태 리턴

  } catch (err) {
    return {
      status: false,
      error: `리뷰 삭제에 실패했습니다 : ${err}`,
    };
  }
}
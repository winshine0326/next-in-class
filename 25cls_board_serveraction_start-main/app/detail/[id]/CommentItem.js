'use client'
//import CommentItemDeleteButton from "./comment-delete";
import { deleteCommentAction } from "@/actions/delete-comment";
import { useActionState, useEffect, useRef } from "react";

export  function DeleteButton({
  // DeleteButton 으로 네이밍 변경
  commentId,
  postId,
  author
}) {
   //코드 작성

  return (
    <form  >//속성 추가하기
      <input name="commentId" value={commentId} type="hidden" readOnly/>
      <input name="postId" value={postId} type="hidden" readOnly/>
      <input name="author" value={author} type="hidden" readOnly/>
      {isPending ? (
        <div>삭제중...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>
          삭제하기
        </div>
      )}
    </form>
  );
}

export default function CommentItem({_id, content, author,parent}){
   
  
  return (
    <div className="comment-card" >
      <div className="comment-meta">
        <span className="comment-author">{ author}</span>
      </div>
      <div className="comment-content-box">
        <span className="mention">{content}</span> 
      </div>
      <div className="comment-actions">
     
     // DeleteButton 컴포넌트 추가
      </div>
    </div>
  );

} 
"use client";
import { createCommentAction } from "@/actions/create-comment";
import { useActionState, useEffect } from "react";

export default function CommentEditor({postId, author}){
    
     //폼요소 useRef로 저장 
     //useActionState사용 
    return(
    <section  style={{maxWidth: '700px', margin: '30px auto'}}>
        <form className="write-form"  > //폼속성 수정하기
         
          parent<input name="parent" value={postId}  type ="hidden" readOnly />
          author<input name="author" value={author}  type="hidden" readOnly />
          <input
          name="content"
          disabled={isPending}
          required
          className="write-input"
          placeholder="댓글을 입력하세요"
          
          />
           //버튼 코드 작성
        
        </form>
    </section>
)}
// /app/detail/[id]/CommentEditor.js
"use client";
import { createCommentAction } from "@/actions/create-comment";
import { useActionState, useEffect } from "react";

export default function CommentEditor({ postId, author }) {
  const formRef = useRef(null);
  const [state, formAction, isPending] = useActionState(
    createCommentAction,
    null
  );

  useEffect(() => {
    if (state && state.status === "error") {
      alert(state.message);
    } else if (state && state.status === "success") {
      // 성공 시 폼 초기화
    }
  }, [state]);
  return (
    <section style={{ maxWidth: "700px", margin: "30px auto" }}>
      <form className="write-form" action={formAction}>
        parent
        <input name="parent" value={postId} type="hidden" readOnly />
        author
        <input name="author" value={author} type="hidden" readOnly />
        <input
          name="content"
          disabled={isPending}
          required
          className="write-input"
          placeholder="댓글을 입력하세요"
        />
        <button disabled={isPending} type="submit">
          {isPending ? "...작성중" : "작성하기"}
        </button>
      </form>
    </section>
  );
}

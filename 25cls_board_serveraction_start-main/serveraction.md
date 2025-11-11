# 📝 Next.js 서버 액션으로 댓글 기능 구현하기 (feat. useActionState)

안녕하세요! 이 가이드는 Next.js 프로젝트에서 댓글 기능을 구현할 때, React의 최신 훅인 `useActionState`를 활용하여 사용자 경험(UX)이 향상된 서버 액션을 작성하는 방법을 안내합니다.

### 학습 목표
1.  `useActionState`를 활용해 서버 액션의 'pending', 'success', 'error' 상태를 관리합니다.
2.  액션 실행 중 버튼을 비활성화하고 로딩 상태를 표시합니다.
3.  액션 결과를 UI에 피드백(에러 메시지, 성공 처리)으로 반영합니다.
4.  `revalidateTag`를 사용하여 데이터 변경 후 UI를 자동으로 업데이트합니다.

---

### **1단계: 상태를 반환하는 서버 액션 만들기**

`useActionState`와 함께 사용하기 위해, 서버 액션이 항상 명시적인 상태 객체(예: `{status, message}`)를 반환하도록 수정합니다.

#### **1-1. 댓글 생성 액션 (`create-comment.js`)**

```javascript
// /app/actions/create-comment.js
"use server";

import { revalidateTag } from "next/cache";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

// useActionState는 첫 인자로 이전 상태(previousState)를 받습니다.
export async function createComment(previousState, formData) {
  try {
    const db = (await connectDB).db("forum");
    
    const commentData = {
      content: formData.get("comment"),
      parent: new ObjectId(formData.get("postId")),
      author: formData.get("author"),
      authorName: formData.get("authorName"),
      createdAt: new Date(),
    };

    if (!commentData.content) {
      return { status: "error", message: "댓글 내용을 입력하세요." };
    }

    await db.collection("comment").insertOne(commentData);

    revalidateTag(`comment-${formData.get("postId")}`);
    return { status: "success", message: "댓글이 성공적으로 작성되었습니다." };

  } catch (error) {
    console.error("Error creating comment:", error);
    return { status: "error", message: "댓글 작성 중 오류가 발생했습니다." };
  }
}
```

#### **1-2. 댓글 삭제 액션 (`delete-comment.js`)**

```javascript
// /app/actions/delete-comment.js
"use server";

import { revalidateTag } from "next/cache";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function deleteComment(previousState, formData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { status: "error", message: "로그인이 필요합니다." };
    }

    const db = (await connectDB).db("forum");
    const commentId = formData.get("commentId");
    const postId = formData.get("postId");

    const comment = await db.collection("comment").findOne({ _id: new ObjectId(commentId) });

    if (!comment || comment.author !== session.user.email) {
      return { status: "error", message: "삭제 권한이 없습니다." };
    }

    await db.collection("comment").deleteOne({ _id: new ObjectId(commentId) });

    revalidateTag(`comment-${postId}`);
    return { status: "success", message: "댓글이 삭제되었습니다." };

  } catch (error) {
    console.error("Error deleting comment:", error);
    return { status: "error", message: "삭제 중 오류가 발생했습니다." };
  }
}
```

---

### **2단계: `useActionState`로 컴포넌트 리팩토링**

이제 컴포넌트에서 `useActionState`를 사용하여 액션의 상태 변화에 따라 UI를 동적으로 변경합니다.

#### **2-1. `CommentEditor` 컴포넌트 수정**

```javascript
// /app/detail/[id]/CommentEditor.js
"use client";

import { useActionState, useEffect, useRef } from "react";
import { createComment } from "@/app/actions/create-comment";

export default function CommentEditor({ postId, author, authorName }) {
  const [state, formAction, isPending] = useActionState(createComment, null);
  const formRef = useRef(null);

  useEffect(() => {
    if (state?.status === "success") {
      formRef.current?.reset(); // 성공 시 폼 리셋
    } else if (state?.status === "error") {
      alert(state.message); // 실패 시 에러 메시지 표시
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} style={{ maxWidth: '700px', margin: '30px auto' }} className="write-form">
      <input type="hidden" name="postId" value={postId} />
      <input type="hidden" name="author" value={author} />
      <input type="hidden" name="authorName" value={authorName} />
      <textarea
        name="comment"
        required
        className="write-input"
        placeholder="따뜻한 댓글을 남겨주세요."
        disabled={isPending} // 전송 중 비활성화
      />
      <button type="submit" className="write-button" disabled={isPending}>
        {isPending ? "작성 중..." : "댓글 작성"}
      </button>
    </form>
  );
}
```
**주요 변경 사항:**
- `useActionState`: `[state, formAction, isPending]`을 반환합니다.
  - `state`: 액션이 반환한 가장 최신 상태.
  - `formAction`: `<form>`의 `action`에 전달할 함수.
  - `isPending`: 액션이 실행 중이면 `true`.
- `useEffect`: `state`가 변경될 때마다 성공/실패에 따른 부수 효과(form 리셋, alert)를 처리합니다.
- `disabled={isPending}`: 액션 실행 중 사용자가 중복 제출하는 것을 방지합니다.

#### **2-2. `CommentItem` 컴포넌트 수정**

```javascript
// /app/detail/[id]/CommentItem.js
"use client";

import { useSession } from "next-auth/react";
import { deleteComment } from "@/app/actions/delete-comment";
import { useActionState } from "react";

export default function CommentItem({ _id, content, author, authorName, parent }) {
  const { data: session } = useSession();
  const [state, formAction, isPending] = useActionState(deleteComment, null);

  // 삭제 버튼 UI
  const deleteButton = (
    <form action={formAction} className="comment-delete-form">
      <input type="hidden" name="commentId" value={_id.toString()} />
      <input type="hidden" name="postId" value={parent.toString()} />
      <button type="submit" disabled={isPending}>
        {isPending ? "삭제 중..." : "삭제"}
      </button>
    </form>
  );

  // 삭제 성공 시 UI에서 즉시 숨김 처리
  if (state?.status === 'success') {
    return null;
  }

  return (
    <div className="comment-item">
      <div className="comment-author">{authorName || author}</div>
      <p className="comment-content">{content}</p>
      {session?.user?.email === author && deleteButton}
      {state?.status === 'error' && <p style={{color: 'red', fontSize: '12px', marginTop: '5px'}}>{state.message}</p>}
    </div>
  );
}
```
**주요 변경 사항:**
- 각 댓글 아이템이 자신의 `isPending` 상태를 가집니다.
- 삭제 성공 시, `return null`을 통해 컴포넌트를 즉시 렌더링하지 않아 사용자에게 즉각적인 피드백을 줍니다.
- 삭제 실패 시, 컴포넌트 하단에 에러 메시지를 표시합니다.

---

### **3단계: 메인 페이지 확인 (`page.js`)**

`page.js`는 `CommentEditor`에 필요한 `authorName` 같은 props를 잘 전달하고 있는지 확인합니다. 이 부분은 이전과 동일합니다.

```javascript
// /app/detail/[id]/page.js
// ... (생략)
export default async function Page({ params }) {
  // ... (생략)
  const session = await getServerSession(authOptions);
  // ... (생략)
  return (
    <div className="detail-page-container">
      {/* ... */}
      {session ? (
        <CommentEditor 
          postId={id} 
          author={session.user.email}
          authorName={session.user.name} // 이 prop이 잘 전달되는지 확인
        />
      ) : (
        <p style={{textAlign: 'center', margin: '20px'}}>로그인 시 댓글을 작성할 수 있습니다.</p>
      )}
      <CommentList postId={id} />
    </div>
  );
}
```

### **결론**

`useActionState`를 사용하면 서버 액션의 상태 변화에 따른 UI 로직을 매우 선언적이고 간결하게 작성할 수 있습니다. 이를 통해 사용자는 로딩 상태와 에러 상황을 명확하게 인지할 수 있게 되어 전반적인 애플리케이션의 품질이 향상됩니다.
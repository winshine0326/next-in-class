"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
  };

  return (
    <main>
      <h1>글 작성</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          required
        />
        <button type="submit">등록</button>
      </form>
    </main>
  );
}

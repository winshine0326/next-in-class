'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ListPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    //fetch('/api/posts') 작성
    //posts변경 
  };

  useEffect(() => {
   //fetchPosts 실행
   fetchPosts();
  }, []);

  const handleDelete =   ( ) => {
    //delete api실행
  };

  return (
    <main>
      <h1>게시물 목록</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
            <div>{post.content}</div>
            <button className="button" onClick={() => }>삭제</button>
            <span className = "button"><     >수정</Link></span>
          </li>
        ))}
      </ul>
    </main>
  );
}
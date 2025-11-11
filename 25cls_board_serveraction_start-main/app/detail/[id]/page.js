import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

 //4-0. 댓글 컴포넌트 임포트
//주요기능
//1. id를 전달받아 조건에 맞는 레코드 요청하기 
import CommentItem from "./CommentItem";
import CommentEditor from "./CommentEditor";

async function PostDetail({post}) {
   

  return (
    <div >
      <div className="detail-card">
        <h2 className="detail-title">상세페이지</h2>
        
        <div className="detail-meta">
          <span className="detail-author">{post.author}</span>
        </div>
        <h4 className="detail-post-title">{post.title}</h4>
        <div className="detail-content">{post.content}</div>
        
      </div>
    </div>
  );
}

async function CommentList({postId}) {
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL }/api/comment/list/${postId}`,
    { next: { tags: [`comment-${postId}`] } }
  );

  // if (!response.ok) {
  //   throw new Error(`Review fetch failed : ${response.statusText}`);
  // }

  const comments = await response.json();

  return (
    <div style={{maxWidth: '700px', margin: '30px auto'}}>
      
      {comments.length > 0 ? 
        comments.map((comment, i) => 
          <CommentItem key={i} {...comment}/>
          ) : 
          <div>댓글이 없습니다.</div>}

  
    </div>
  );
}

export default async function Page({ params }) {
   
  const { id } = await params;
  
  let session = await getServerSession(authOptions);
  if (!session) console.log("상세페이지에서 session없음")
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${BASE_URL}/api/post/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(id ,"게시물 데이터를 불러오지 못했습니다");
  }
  const post = await res.json();
  return (
    <div className="detail-page-container">
      <PostDetail post={post} />
      {session ? <CommentEditor postId={id} author={session.user.email}/> : "로그인 시 댓글을 작성할 수 있습니다."}
      <CommentList postId={id} />
    </div>
  );
}
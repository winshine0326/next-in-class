"use client";
import Link from "next/link";
//주요기능
//1. 클릭한 제목의 데이터를 하나의 div안에 제목과 내용 보여주기
//2-1. 삭제 (TanStack Query mutation 사용)
export default function ListItem({item, onDelete, isDeleting}) {

  return (
    
    <div className="list-item-card" >
     
        <div className="list-item-header">
          <Link href={"/detail/" + item._id} className="list-item-title-link">
            <h4 className="list-item-title">{item.title}</h4>
          </Link>
        </div>
          <div className="list-item-actions">
            <button className="list-btn edit-btn">
              <Link href={"/edit/" + item._id} >수정</Link>
            </button>
            <button
              className="list-btn delete-btn"
              onClick={() => onDelete(item._id)}
              disabled={isDeleting}
            >
              {isDeleting ? "삭제중..." : "삭제"}
            </button>
            <button
              className="list-btn test-btn"
              onClick={() => {
                fetch("api/test?name=kim&age=20")
                .then(r=> { return r.json()})
                .then(r=> alert(JSON.stringify(r))) // 2-1. get요청시 query로 데이터 전송하기)
               // fetch("api/abc/kim"); //2-2. 다이렉트 라우터로 값('kim') <api/abc/[query].js
              }}
            >
              쿼리 & 다이나믹 라우터 연습
            </button>
            <button
              className="list-btn dynamic-btn"
              onClick={() => onDelete(item._id)}
              disabled={isDeleting}
            >
              {isDeleting ? "삭제중..." : "다이나믹 라우터로 삭제해보기"}
            </button>
          </div>
        
        <p className="list-item-content">{item.content}</p> 
        <p className="list-item-content">{item.author}</p> 
      </div>
   
  ) 
}

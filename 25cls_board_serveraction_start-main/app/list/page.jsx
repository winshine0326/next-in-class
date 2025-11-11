import ListClient from "./ListClient";

//1-5. 주요기능
//1. TanStack Query를 사용한 클라이언트 사이드 데이터 패칭
//2. 서버 컴포넌트에서 클라이언트 컴포넌트로 위임

export default function List() {
  return (
    <div className="list-page-container">
      <h2 className="list-page-title">게시글 목록</h2>
      <ListClient />
    </div>
  );
}

"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postListKey, fetchPostList, deletePost } from "@/lib/queries/postQueries";
import ListItem from "./ListItem";
import { ErrorBoundary } from "react-error-boundary";
// 에러 폴백 컴포넌트
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="list-bg">
      <div className="error-message">
        <h3>에러가 발생했습니다</h3>
        <p>{error?.message || "알 수 없는 오류"}</p>
        <button 
          onClick={resetErrorBoundary}
          className="retry-btn"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}

// 메인 컴포넌트 (Suspense와 호환)
//1-5.React Query로 구현한 클라이언트 컴포넌트 생성
function ListContent() {
  const queryClient = useQueryClient();

  // 게시글 목록 조회 (Suspense 모드)
  const { data: posts } = useQuery({
    queryKey: postListKey,
    queryFn: fetchPostList,
    staleTime: 30_000, // 30초
    gcTime: 5 * 60_000, // 5분
    suspense: true, // Suspense 모드 활성화
  });

  // 1-6. 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // 삭제 성공 시 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: postListKey });
    },
    onError: (error) => {
      alert(`삭제 실패: ${error.message}`);
    },
  });

  // 삭제 핸들러
  const handleDelete = (id) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="list-bg">
      {posts?.length === 0 ? (
        <div className="empty-state">
          <h3>게시글이 없습니다</h3>
          <p>첫 번째 게시글을 작성해보세요!</p>
        </div>
      ) : (
        posts?.map((item) => (
          <ListItem 
            key={item._id} 
            item={item} 
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending}
          />
        ))
      )}
    </div>
  );
}

export default function ListClient() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // 에러 리셋 시 쿼리 캐시 클리어
        window.location.reload();
      }}
    >
      <ListContent />
    </ErrorBoundary>
  );
}

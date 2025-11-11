"use client";
import { useState, Suspense } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postListKey, createPost } from "../lib/queries/postQueries";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

// 로딩 컴포넌트
function WriteLoadingFallback() {
  return (
    <div className="write-form-container">
      <h4 className="write-form-title">글작성</h4>
      <div className="loading-skeleton">
        <div className="skeleton-item" style={{ height: '40px', marginBottom: '10px' }}></div>
        <div className="skeleton-item" style={{ height: '40px', marginBottom: '10px' }}></div>
        <div className="skeleton-item" style={{ height: '40px', width: '100px' }}></div>
      </div>
    </div>
  );
}

// 에러 폴백 컴포넌트
function WriteErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="write-form-container">
      <h4 className="write-form-title">글작성</h4>
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

// 메인 컴포넌트
function WriteContent() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  // 게시글 생성 mutation
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 성공 시 목록 새로고침하고 목록 페이지로 이동
      queryClient.invalidateQueries({ queryKey: postListKey });
      router.push("/list");
    },
    onError: (error) => {
      alert(`게시글 작성 실패: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }
    
    if (!formData.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    createMutation.mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="write-form-container">
      <h4 className="write-form-title">글작성</h4>
      <form onSubmit={handleSubmit} className="write-form">
        <input
          type="text"
          name="title"
          placeholder="글제목"
          className="write-input"
          value={formData.title}
          onChange={handleChange}
          disabled={createMutation.isPending}
        />
        <input
          type="text"
          name="content"
          placeholder="글내용"
          className="write-input"
          value={formData.content}
          onChange={handleChange}
          disabled={createMutation.isPending}
        />
        <button 
          type="submit" 
          className="write-btn"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "작성중..." : "작성하기"}
        </button>
      </form>
    </div>
  );
}

export default function WriteClient() {
  return (
    <ErrorBoundary
      FallbackComponent={WriteErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      <Suspense fallback={<WriteLoadingFallback />}>
        <WriteContent />
      </Suspense>
    </ErrorBoundary>
  );
}

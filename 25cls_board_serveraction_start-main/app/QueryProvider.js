"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, useState } from "react";

// 로딩 컴포넌트
function LoadingFallback() {
  return (
    <div className="list-bg">
      <div className="loading-skeleton">
        <div className="skeleton-item">페이 로딩중입니다...</div>
        <div className="skeleton-item"></div>
        <div className="skeleton-item"></div>
      </div>
    </div>
  );
}
//1. 전역 Provider 구성
export default function QueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1분간 데이터를 신선한 것으로 간주
        gcTime: 5 * 60 * 1000, // 5분 후 캐시 삭제
        retry: 2,//2회 재도
        refetchOnWindowFocus: false, //탭 복귀시 자동 새로 고침 x
        suspense: true, // Suspense 모드 활성화
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingFallback />}>
        {children}
      </Suspense>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools 
          initialIsOpen={false} 
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  );
}

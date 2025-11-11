'use client'
import { useEffect, useState } from "react";

export default function DarkMode(){
    const [isDark, setIsDark] = useState(false);
    
    // 쿠키에서 mode 값을 안전하게 가져오는 함수
    const getCookie = (name) => {
      if (typeof document === 'undefined') return 'light'; // 서버사이드 렌더링 방지
      const cookies = document.cookie.split("; ");
      for (let c of cookies) {
        const [key, val] = c.split("=");
        if (key === name) return val;
      }
      return 'light'; // 기본값
    };
    
    // 쿠키 설정 함수 - Next.js 스타일에 맞게 개선
    const setCookie = (name, value, days = 400) => {
      if (typeof document === 'undefined') return; // 서버사이드 렌더링 방지
      
      const maxAge = days * 24 * 60 * 60; // 초 단위로 변환
      document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`;
    };
    
    useEffect(()=>{ //2. 쿠키 생성
      const currentMode = getCookie('mode');
      setIsDark(currentMode === 'dark');
    },[]);
    
  return (
    <span 
      onClick={()=>{ 
        const currentMode = getCookie('mode');
        const newMode = currentMode === 'light' ? 'dark' : 'light';
        
        setCookie('mode', newMode);
        setIsDark(newMode === 'dark');
        window.location.reload(); // 페이지 새로고침
      }}
      style={{ cursor: 'pointer' }}
    > 
      {isDark ? '☀️' : '🌙'} 
    </span>
  )
}
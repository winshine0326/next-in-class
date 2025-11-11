"use client";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
//주요기능
//1. 로그인/아웃 컴포넌트(클라이언트 기능)
//2. localstorage로 다크모드 구현
//3. cookie로 다크모드 구현

export default function LoginBtn() {
  //2-0. ocalstorege : Next.js에서는 useEffect내에서 작성할것
  useEffect(()=>{ //렌더링 이후 실행됨-> 깜빡임 발생(이유: 라이트모드 보여준 후 다크모드 실행))
    if (typeof window != 'undefined'){ //2-1. 클라이언트 컴포넌트 조건 체크
      localStorage.setItem('mode','dark') 
    }
  },[]);
  return (
    <button
      className="login-btn"
      onClick={() => signIn()}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <img
        src="/github-mark.png"
        alt="GitHub Logo"
        width={20}
        height={20}
        style={{ marginRight: 8 }}
      /> github logo*/}
      <span>Login</span>
    </button>
  );
}

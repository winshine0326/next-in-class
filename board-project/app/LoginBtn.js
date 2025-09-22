"use client";
import { signIn, signOut } from "next-auth/react";

export default function LoginBtn({ session }) {
  // 로그인되어 있으면 사용자 정보와 로그아웃 버튼 표시
  if (session) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ color: "black" }}>
          {session.user?.name || session.user?.email}님
        </span>
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="프로필"
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          />
        )}
        <button
          onClick={() => signOut()}
          style={{
            padding: "8px 16px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </div>
    );
  }

  // 로그인되어 있지 않으면 로그인 버튼 표시
  return <button onClick={() => signIn()}>로그인</button>;
}

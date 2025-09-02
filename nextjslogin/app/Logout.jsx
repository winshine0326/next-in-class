"use client";
import { signIn, signOut } from "next-auth/react";

const Logout = () => {
  return <button onClick={() => signOut()}>로그아웃</button>;
};

export default Logout;

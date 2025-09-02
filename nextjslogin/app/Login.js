"use client";
import { signIn, signOut } from "next-auth/react";

const Login = () => {
  return <button onClick={() => signIn()}>로그인</button>;
};

export default Login;

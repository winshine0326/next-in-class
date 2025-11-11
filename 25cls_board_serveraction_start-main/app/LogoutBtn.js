"use client";
import {signOut} from 'next-auth/react';
export default function LogoutBtn() {
  return (
    <button className="login-btn" onClick={() => signOut()}>
     Logout
    </button>
  );
}
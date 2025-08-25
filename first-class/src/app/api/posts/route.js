//app/api/posts/route.js
import { getPosts, addPost } from "@/app/data/posts";
import { NextResponse } from "next/server";

export async function GET() {
  //작성
  const data = getPosts();
  return NextResponse.json(data);
}

export async function POST(request) {
  const { title, content } = await request.json();
  //작성
  addPost(title, content);
  return NextResponse.json({ title: title, content: content });
}

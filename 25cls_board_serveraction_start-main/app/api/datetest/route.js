import { NextResponse } from 'next/server';

export async function GET() {
  const now = new Date();
  console.log('GET /api/datetest', now);
  return NextResponse.json(now);
}

/*
- NextResponse.json(객체)
  - Next.js API Route(app router의 route handler 포함)에서 사용
  - JSON 형식의 응답(Response) 객체를 쉽게 생성

- 주요 동작
  - 전달된 객체를 JSON 문자열로 변환
  - Content-Type 헤더를 'application/json'으로 자동 설정
  - HTTP 응답(Response) 객체를 반환

- 사용 예시
  - return NextResponse.json({ name: "kim" })
    → 클라이언트는 { "name": "kim" } 형태의 JSON 데이터 수신

- 요약
  - 서버에서 JSON 데이터를 반환할 때 매우 간편하게 사용 가능
*/

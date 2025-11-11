import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

//주요기능
//1. /list 접근시 : 날짜, 접속OS 출력
//2. /write 접근시 : 로그인 안된경우 토큰체크 후 로그인 페이지 redirect
//3. /register(가입): 방문한적 없으면 visited = true 쿠키 생성하기
export async function middleware(request) {
    // console.log('middleware 실행됨: ' + request.nextUrl.pathname);
    // console.log('쿠키:', request.cookies);
    // console.log('헤더:', request.headers);
    
    // 모든 요청에 대해 기본적으로 다음 단계로 진행
    const response = NextResponse.next();
    
    // 특정 경로에 대한 추가 처리
    if (request.nextUrl.pathname === '/list') {//1.
        // console.log('리스트 페이지 접근:', new Date().toLocaleString());
        // console.log('플랫폼:', request.headers.get('sec-ch-ua-platform'));
    }
    if (request.nextUrl.pathname.startsWith('/write')) {//2.
        const session = await getToken({ req : request }) //로그인한 유저 정보(JWT)
        //console.log('세션', session)
        if (session == null) {
          return NextResponse.redirect(new URL('/api/auth/signin', request.url));
          //잘 안되면 'http://localhost:3000/api/auth/signin')
        }
      }
      if (request.nextUrl.pathname.startsWith('/register')) {//3.
        
        if (request.cookies.has('visited') == false) {
          const response = NextResponse.next()
          response.cookies.set({
            name: 'visited',
            value: 'true',
            maxAge: 3600,
          })
          return response
        }
        
        return NextResponse.next()
        
      }
//특정페이지 접속시 쿠기 만들기 예제(서버에서 생성:서버API 또는 middleware에서 생성 가능)
//   request.cookies.get('쿠키이름')  //출력
//   request.cookies.has('쿠키이름')  //존재확인
//   request.cookies.delete('쿠키이름')  //삭제
  
//   const response = NextResponse.next()
//   response.cookies.set({
//     name: 'mode',
//     value: 'dark',
//     maxAge: 3600,
//     httpOnly : true //유저가 자바스크립트 조작 방지
//   })  
//   return response  //쿠키생성
    return response;
}

// middleware가 실행될 경로 설정
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
} 
import { NextResponse } from 'next/server';

export async function GET(request,{params}) {//params는 경로, searchParams는 쿼리스트링
 
  // searchParams의 전체값을 출력하려면 아래와 같이 Object.fromEntries를 사용해야 합니다.
  const { searchParams } = new URL(request.url);
  const queryStrings =   Object.fromEntries(searchParams.entries());
  console.log( queryStrings);
  console.log('name:', searchParams.get('name'));

  // GET 요청이 들어오면 실행되고  콘솔에 요청 로그 출력
  console.log('GET api/test' );
  console.log('GET api/test?이름=kim' );

 return NextResponse.json({params : JSON.stringify(params), query: queryStrings });

  // 리다이렉트 응답 생성
    
}

export async function POST(request) {
  /*
    - POST 요청시 request 객체에서 body를 JSON 형태로 파싱함
    - 파싱한 body 데이터를 { received: body } 형태로 응답에 담아 반환
    - 클라이언트가 보낸 데이터를 서버가 잘 받았는지 확인할 때 사용
  */
  const body = await request.json().catch(() => null);
  return NextResponse.json({ received: body }, { status: 201 });
}


import { NextResponse } from 'next/server';
export async function GET(request,{params}){
    
    return NextResponse.json({params:params})
}
 

  // 리다이렉트 응답 생성
  

  

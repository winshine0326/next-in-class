import { connectDB } from "@/util/database";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
 
export async function POST(request) {
    /*
      - POST 요청시 request 객체에서 body를 JSON 형태로 파싱함
      - 파싱한 body 데이터를 { received: body } 형태로 응답에 담아 반환
      - 클라이언트가 보낸 데이터를 서버가 잘 받았는지 확인할 때 사용
    */
    const formData = await request.json().catch(() => null);
    if (!formData || !formData.title || formData.title.trim() === "") {
      return NextResponse.json({ success: false, message: "제목을 입력하세요." }, { status: 400 });
    }
   console.log(formData);
    try{
        const db = (await connectDB).db('board') //1-4. DB에 저장하기
        await db.collection('post_test').insertOne({title:formData.title})
        console.log('입력성공')
        revalidatePath('/write2')//변경 페이지 새로고침
       }
       catch(e){
        console.log(e)
       }
    return NextResponse.json({ received: body }, { status: 201 });
  }
  
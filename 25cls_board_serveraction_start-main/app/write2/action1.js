'use server' //서버 api로 자동변환됨
import { revalidatePath } from "next/cache"
import { connectDB } from "../util/database"
 
export async function action1(formData){ //1-1. 서버 기능 함수 구현
 
   // console.log(formData) //1-2. formData구조 테스트
   console.log('^^^^' + formData.get('title')) //1-3. form 데이터 출력테스트
   try{
    const db = (await connectDB).db('board') //1-4. DB에 저장하기image.png
    await db.collection('post_test').insertOne({title:formData.get('title')})
    console.log('입력성공')
    revalidatePath('/write2')//변경 부분만 새로고침
   }
   catch(e){
    console.log(e)
   }
}  
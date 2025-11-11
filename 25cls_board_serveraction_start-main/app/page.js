import {connectDB} from "./util/database.js";
//주요 기능 : 데이터베이스 연결 후 테스트 하기(꼭 서브 컴포넌트에서 작성)
//1. 데이터베이스 연결을  파일로 분리 - dababase.js
export default async function Home() {
 
  let client = await connectDB; 
  const db = client.db('board');
  let result = await db.collection('post').find().toArray();
  console.log('post db 연결 ' + result)
  
  return (
    <div>
      {result[0].title}
    </div>
  );
}

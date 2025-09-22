/* app/detail/[id]/page.js */
import { connectDB } from "@/app/util/database"
import { ObjectId } from "mongodb"
//props = {params: {id:값},searchParams:{}}
export default async function Detail(props) {

  //조회하는 코드 작성
  let client = await connectDB
  const db = client.db('board')
  let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })

  console.log(JSON.stringify(props));
  return (
    <div>
      <h4>{result.title}</h4>
      <p>{result.content}</p>
      {result.author && (
        <p style={{ color: '#999', fontSize: '12px', marginTop: '10px' }}>
          작성자: {result.author}
        </p>
      )}
    </div>
  )
}

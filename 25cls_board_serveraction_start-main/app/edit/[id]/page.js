import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
export default async function Edit(props) {
  //1.db에 URLid와 같은 데이터 가져오기
  // let db = (await connectDB).db("board");
  // let result = await db
  //   .collection("post")
  //  .findOne({ _id: new ObjectId(props.params.id) });
 
 
  return (
    <div className="write-form-container">
      <h4 className="write-form-title">글 수정</h4>
      <form action="/api/post/edit" method="POST" className="write-form">
        {/* 2. result로 가져온 데이터 input에 보여주고, input값 모두 넘기기 */}
        <input type="text" name="title" defaultValue={result.title} className="write-input" />
        <input type="text" name="content" defaultValue={result.content} className="write-input" />
        <input type="hidden" name="_id" defaultValue={result._id.toString()} />
        <button type="submit" className="write-btn">수정</button>
      </form>
    </div>
  );
}

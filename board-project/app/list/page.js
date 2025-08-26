/* app/list/page.js */
import { connectDB } from "@/app/util/database";
import ListItem from "./listItem";

export default async function List() {
  //board DB연결후 post 테이블조회하여 result에 저장
  let client = await connectDB;
  const db = client.db("board");
  let result = await db.collection("post").find().toArray();
  const items = result.map(({ _id, ...rest }) => ({
    ...rest,
    _id: _id.toString(),
  }));

  return (
    <main>
      <h1>게시글 목록</h1>
      <div className="list-bg">
        {items.map((item) => (
          <ListItem item={item} key={item._id} />
        ))}
      </div>
    </main>
  );
}

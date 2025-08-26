/* app/edit/[id]/page.js */
import { connectDB } from "@/app/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const params = await props.params;
  let client = await connectDB;
  const db = client.db("board");

  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.id) });

  return (
    <form action="/api/post/edit" method="POST">
      <input name="title" defaultValue={result.title} />
      <input name="content" defaultValue={result.content} />
      <input type="hidden" name="_id" defaultValue={result._id.toString()} />
      <button type="submit">제출</button>
    </form>
  );
}

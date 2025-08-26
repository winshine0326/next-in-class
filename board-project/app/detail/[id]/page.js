import { connectDB } from "@/app/util/database";
import { ObjectId } from "mongodb";

const DetailPage = async (props) => {
  const client = await connectDB;
  const db = client.db("board");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  console.log(result);
  return (
    <>
      <h1>{result.title}</h1>
      <p>{result.content}</p>
    </>
  );
};

export default DetailPage;

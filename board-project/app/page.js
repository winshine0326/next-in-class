import { connectDB } from "@/app/util/database";

export default async function Home() {
  try {
    let client = await connectDB; //1.
    const db = client.db("board"); //db명
    let result = await db.collection("post").find().toArray(); //collection명

    return <main>{result[0]?.title || "No posts found"}</main>;
  } catch (error) {
    console.error("Database error:", error);
    return <main>Error loading posts</main>;
  }
}

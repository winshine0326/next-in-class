import { revalidatePath } from "next/cache";
import { connectDB } from "../util/database";
import { action1 } from "./action1";

export default async function write2() {
  //주요 기능
  //1. form 데이터 db에 저장하기
  //2. 저장된 데이터 조회하여 보여주기
  //3. 서버기능 js로 작성하여 form데이터 처리하기(1번 구현)
  const db = (await connectDB).db("board"); //2-1. 입력된 데이터 모두 조회
  const result = await db.collection("post_test").find().toArray();
  // 서버 기능 함수 구현
  async function createPostAction(formData) {
    "use server"; //1. 서버 api로 자동변환 지정
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    await fetch(`${BASE_URL}/api/test/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: formData.get("title") }),
    });
    revalidatePath("/write2"); //페이지 새로고침(전체 댓글리스트 조회)
  }

  return (
    <div className="write-form-container">
      <hr style={{ margin: "30px 0", border: "1px solid #dee2e6" }} />
      <h4 className="write-form-title">서버액션으로 form 데이터 전송하기</h4>
      //4. form에 서버액션 함수 연결하기
      <form className="write-form">
        <input
          name="title"
          className="write-input"
          placeholder="제목을 입력하세요"
        />
        <button type="submit" className="write-btn">
          저장
        </button>
      </form>
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#f8f9fa",
          borderRadius: "10px",
        }}
      >
        <h5 style={{ color: "#495057", marginBottom: "15px" }}>
          저장된 데이터:
        </h5>
        {result &&
          result.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                margin: "5px 0",
                background: "white",
                borderRadius: "5px",
                border: "1px solid #dee2e6",
              }}
            >
              제목: {item.title}
            </div>
          ))}
      </div>
    </div>
  );
}

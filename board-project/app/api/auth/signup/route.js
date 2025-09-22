// app/api/auth/signup/route.js)
import { connectDB } from "@/app/util/database";
import bcrypt from "bcrypt"; //2-1. bcrypt 모듈 임포트(npm install bcrypt)

// POST 요청 처리
export async function POST(request) {
  try {
    //0-0. register.js에서 회원가입 정보 전송시 확인용
    const formData = await request.formData();

    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("받은 데이터:", body);

    // 과제1: 빈칸 체크
    if (!body.name || !body.email || !body.password) {
      return new Response(JSON.stringify("로그인하세요"), { status: 400 });
    }

    let db = (await connectDB).db("board");

    // 과제2: 중복 이메일 체크
    const existingUser = await db
      .collection("user_cred")
      .findOne({ email: body.email });
    if (existingUser) {
      return new Response(JSON.stringify("이미 가입된 이메일입니다"), {
        status: 400,
      });
    }

    //1-1. 요청이 POST일 때 insert
    let hash = await bcrypt.hash(body.password, 10); //2-2. 비밀번호 해싱

    console.log("hasing:", hash); //2-4. 해싱된 비밀번호 확인용
    body.password = hash;
    body.role = "user"; // 기본 역할은 'user', 관리자는 수동으로 'admin'으로 변경

    //2-3. 해싱된 비밀번호로 요청
    await db.collection("user_cred").insertOne(body);
    console.log("회원가입 성공");

    return new Response(JSON.stringify("회원가입 성공"), { status: 200 });
  } catch (error) {
    console.error("회원가입 에러:", error);
    return new Response(JSON.stringify("회원가입 실패"), { status: 500 });
  }
}
//과제0. try-catch문으로 에러발생시 '회원가입 실패' json값으로 리턴
//과제1. 아틀라스 DB에 user_cred 컬렉션에 회원 정보 확인하기
//과제2. user id 빈칸인 경우체크하고 이메일 중복시 확인하기

import { connectDB } from "../../../util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"; //3-0-1. bcrypt 모듈 임포트(npm install bcrypt)

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET_ID,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      //3-1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      //3-2. 로그인요청시 실행되는코드 (중요)
      async authorize(credentials) {
        let db = (await connectDB).db("board"); //
        let user = await db
          .collection("user_cred")
          .findOne({ email: credentials.email }); //DB에서 이메일 비교

        const pwcheck = await bcrypt.compare(
          credentials.password, //입력한 password 직접 DB에서 아이디(이메일),비번 비교하고
          user.password //DB password
        );

        return user;
      },
      session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, //로그인 유지 30일
      },
    }),
  ],
  secret: "q1w2e3",
  // adapter: MongoDBAdapter(connectDB)
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

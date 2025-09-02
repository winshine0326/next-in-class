/* app/api/auth/[...nextauth]/route.js */
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
//주요기능
//깃헙 로그인기능 만들기 (OAuth 로그인)

export const authOptions = {
  providers: [
    // //1-2. 깃헙 로그인 기능 설정
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: "jwt생성시쓰는암호", //1-3
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

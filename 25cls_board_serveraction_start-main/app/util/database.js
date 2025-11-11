import { MongoClient } from "mongodb";
 //forum 데이터베이스 사용
const url =
  // "mongodb+srv://admin:qwer1234@cluster0.hkju14q.mongodb.net/forum?retryWrites=true&w=majority&appName=Cluster0";
  "mongodb+srv://admin:qwer1234@cluster0.hkju14q.mongodb.net/board?retryWrites=true&w=majority&appName=Cluster0";
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") { //개발 환경에서는 데이터베이스 연결을 캐시에 저장(JS에서 계속 접속 실행 방)
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };

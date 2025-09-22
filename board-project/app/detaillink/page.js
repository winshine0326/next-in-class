'use client'
import { usePathname, useSearchParams, useParams } from 'next/navigation'
import Link from 'next/link'

export default function DetailLink() {
  let pathname = usePathname()       // 현재 URL 경로
  let searchParams = useSearchParams() // query string
  let params = useParams()           // dynamic route 파라미터

  return (
    <div className="container">

      <main className="main-content">
        <div className="button-container">
          <Link href="/write">
            <button className="action-btn">글쓰기</button>
          </Link>
          <Link href="/mypage">
            <button className="action-btn">뒤돌아기</button>
          </Link>
          <Link href="/list">
            <button className="action-btn">리스트로</button>
          </Link>
        </div>

        <div className="current-info">
          <h2>현재 경로명 출력 : {pathname}</h2>
        </div>
      </main>
    </div>
  )
}
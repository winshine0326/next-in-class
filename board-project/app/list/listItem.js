/* app/list/ListItem.js */
'use client'
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function ListItem({ item }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      try {
        const response = await fetch('/api/post/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: item._id.toString()
        })

        if (response.ok) {
          alert('삭제되었습니다.')
          router.refresh()
        } else {
          alert('삭제에 실패했습니다.')
        }
      } catch (error) {
        console.error('삭제 오류:', error)
        alert('삭제 중 오류가 발생했습니다.')
      }
    }
  }

  // 다이나믹 라우터로 삭제하는 함수
  const handleDynamicDelete = async () => {
    if (confirm('다이나믹 라우터로 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/post/${item._id}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          alert('다이나믹 라우터로 삭제되었습니다.')
          router.refresh() // 화면 새로고침
        } else {
          alert('삭제에 실패했습니다.')
        }
      } catch (error) {
        console.error('삭제 오류:', error)
        alert('삭제 중 오류가 발생했습니다.')
      }
    }
  }

  return (
    <div className="list-item">
      <div className="content-area">
        <Link href={`/detail/${item._id}`}>
          <h4>{item.title}</h4>
        </Link>
        <p>{item.content}</p>
        {item.author && (
          <p className="author-info">작성자: {item.author}</p>
        )}
      </div>
      <div className="button-area">
        <Link href={`/edit/${item._id}`}>
          <button className="edit-btn">수정</button>
        </Link>
        <button className="delete-btn" onClick={handleDelete}>삭제</button>
        <button
          className="list-btn dynamic-btn"
          onClick={handleDynamicDelete}
        >
          다이나믹 라우터로 삭제해보기
        </button>
      </div>
    </div>
  )
}

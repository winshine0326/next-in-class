/* app/edit/[id]/page.js */
import { connectDB } from "../../util/database"
import { ObjectId } from "mongodb"

export default async function Edit(props) {
  // DB에서 해당 ID의 게시글 조회
  let client = await connectDB
  const db = client.db('board')
  let result = await db.collection('post').findOne({ _id: new ObjectId(props.params.id) })

  if (!result) {
    return <div>게시글을 찾을 수 없습니다.</div>
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>글 수정</h1>
      <form action="/api/post/edit" method="POST">
        <div style={{ marginBottom: '1rem' }}>
          <label>글제목:</label><br />
          <input
            name="title"
            defaultValue={result.title}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>글내용:</label><br />
          <textarea
            name="content"
            defaultValue={result.content}
            rows="10"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            required
          />
        </div>
        <input type="hidden" name="_id" defaultValue={result._id.toString()} />
        <button
          type="submit"
          style={{
            padding: '0.7rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          수정
        </button>
      </form>
    </div>
  )
}

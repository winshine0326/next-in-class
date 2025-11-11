
'use client'

export default function Error({error, reset}){
  return (
    <div>
      <h4>에러가 발생하였습니다!</h4>
      <button onClick={()=>{ reset() }}>다시시도</button>
    </div>
  )
}

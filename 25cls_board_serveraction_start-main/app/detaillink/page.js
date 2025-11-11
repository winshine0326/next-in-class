'use client'
import {useRouter} from 'next/navigation'; //1-1. useRouter import(클라이언트 컴포넌트에서는 navigation)
import {usePathname, useSearchParams, useParams} from 'next/navigation' //2-1. path ,param import
import Link from 'next/link';
export default function DetailLink(){
    let router = useRouter(); //1-2. router 변수 useRouter로 저장
    let a = usePathname() //2-2. 현재 URL이 궁금할때 저장
    // let b = useSearchParams() // query string
    // let c = useParams() //  [dynamic route]에 입력한내용 (URL 파라미터)
  
     console.log('현재 URL: ' + a.toString())
    return(
        <div className="detail-link-container">
            <button onClick = {()=>router.push('/') }> 홈으로</button> {/*1-3. router.push('/경로명') */} 
            <button onClick = {()=>{router.back()}}>뒤로가기</button> 
            <button onClick = {()=>{router.push('/list')}}>리스트로</button>
            <h4>현재 경로명 출력 : {a.toString()}</h4>  {/*2-3. 현재 경로명 보여주기 */} 
            {/* <button onClick={()=>{ router.forward() }}>앞으로</button>
            <button onClick={()=>{ router.refresh() }}>새로고침</button>
            <button onClick={()=>{ router.prefetch('/') }}>미리로드</button>
            <Link href={'/list'} prefetch={false}>미리로드 false</Link> */}
         
        </div>
)
}
// 쿼리 키: 목록은 단일 키 배열로 사용
export const postListKey = ["posts"]; //1-4. 쿼리 키 정의

// 기본 URL 설정
const getBaseUrl = () => process.env.NEXTAUTH_URL || 'http://localhost:3000';

// 게시글 목록 조회
export async function fetchPostList() { //fetch함수 정의
  const res = await fetch(`${getBaseUrl()}/api/list`, { 
    cache: "no-store",
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch post list: ${res.status}`);
  }
  
  return res.json();
}

// 게시글 상세 조회
export async function fetchPostDetail(id) {
  const res = await fetch(`${getBaseUrl()}/api/post/${id}`, {
    cache: "no-store",
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch post detail: ${res.status}`);
  }
  
  return res.json();
}

// 게시글 생성
export async function createPost(data) {
  const formData = new FormData();
  formData.append('title', data.title)
  formData.append('content', data.content);
  
  const res = await fetch(`${getBaseUrl()}/api/post/new`, {
    method: "POST",
    body: formData,
  });
  
  if (!res.ok) {
    throw new Error(`Failed to create post: ${res.status}`);
  }
  
  return res.json();
}

// 게시글 수정
export async function updatePost(id, data) {
  const res = await fetch(`${getBaseUrl()}/api/post/edit`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...data }),
  });
  
  if (!res.ok) {
    throw new Error(`Failed to update post: ${res.status}`);
  }
  
  return res.json();
}

// 게시글 삭제
export async function deletePost(id) {
  const res = await fetch(`${getBaseUrl()}/api/post/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (!res.ok) {
    throw new Error(`Failed to ${id}delete post: ${res.status}`);
  }
  
  return res.json();
}

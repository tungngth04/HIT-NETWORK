import { useState, useEffect } from 'react'

// --- MOCK DATA ---
const initialPosts = [
  {
    id: 1,
    user: {
      name: 'Vishnu Kumar Agrawal',
      title: 'UX Designer @ Devn Technology',
      timestamp: '25 Nov at 12:24 PM',
      avatar: 'https://placehold.co/48x48/EFEFEF/AAAAAA?text=A',
    },
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    media: 'https://placehold.co/600x250/F0F2F5/CCCCCC?text=Post+Image',
    stats: { likes: 14, comments: 16, applies: 52 },
  },
]
// --- KẾT THÚC MOCK DATA ---

export const usePosts = () => {
  const [posts, setPosts] = useState(initialPosts)

  // Trong thực tế, bạn sẽ gọi API để lấy danh sách bài đăng ở đây
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const data = await getPostsApi(); // Giả sử bạn có hàm getPostsApi
  //     setPosts(data);
  //   };
  //   fetchPosts();
  // }, []);

  // Hàm để thêm một bài đăng mới vào đầu danh sách
  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts])
  }

  return {
    posts,
    addPost,
  }
}
// Hook này sẽ được sử dụng trong các component khác để lấy danh sách bài đăng
// và thêm bài đăng mới. Bạn có thể mở rộng hook này để bao gồm các chứcn năng khác như xóa bài đăng, cập nhật bài đăng, v.v.

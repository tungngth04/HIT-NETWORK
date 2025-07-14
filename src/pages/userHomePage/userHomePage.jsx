import React from 'react'
import CreatePost from '../../components/createPost/createPost'
import PostCard from '../../components/postCard/postCard'
import SidebarWidget from '../../components/sidebarWidget/sidebarWidget'
import './UserHomePage.scss' // Import CSS styles for UserHomePage component
import { usePosts } from '../../hooks/userPosts' // Import hook quản lý posts

// --- MOCK DATA CHO SIDEBAR (có thể chuyển vào hook nếu cần) ---
const recruitmentPosts = [
  {
    id: 1,
    date: { day: '03', month: 'Dec' },
    title: 'Design Thinking',
    subtitle: 'Creative Town Hall',
  },
  {
    id: 2,
    date: { day: '12', month: 'Dec' },
    title: 'Information Architecture',
    subtitle: 'Creative Town Hall',
  },
]
const upcomingEvents = [
  {
    id: 1,
    date: { day: '03', month: 'Dec' },
    title: 'Design Thinking',
    subtitle: 'Creative Town Hall',
  },
]
// --- KẾT THÚC MOCK DATA ---

const UserHomePage = () => {
  // Chỉ cần gọi hook để lấy danh sách posts và hàm để thêm post mới
  const { posts, addPost } = usePosts()

  return (
    <div className='user-homepage-container'>
      <div className='main-content'>
        {/* Truyền hàm addPost xuống làm callback onPostCreated */}
        <CreatePost onPostCreated={addPost} />

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <aside className='sidebar'>
        <SidebarWidget title='Recruitment Posts' items={recruitmentPosts} />
        <SidebarWidget title='Upcoming Events' items={upcomingEvents} />
      </aside>
    </div>
  )
}

export default UserHomePage

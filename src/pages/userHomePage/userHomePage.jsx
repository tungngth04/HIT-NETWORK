import React from 'react'
import CreatePost from '../../components/createPost/createPost'
import PostCard from '../../components/postCard/postCard'
import SidebarWidget from '../../components/sidebarWidget/sidebarWidget'
import Pagination from '../../components/pagination/pagination'
import { usePosts } from '../../hooks/userPosts'
import './userHomePage.scss'

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

const UserHomePage = () => {
  const { posts, isLoading, currentPage, totalPages, addPost, goToPage } = usePosts()

  return (
    <div className='user-homepage-container'>
      <div className='main-content'>
        <CreatePost onPostCreated={addPost} />

        {isLoading ? (
          <div className='loading-indicator'>Đang tải bài viết...</div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </div>
      <aside className='sidebar'>
        <SidebarWidget title='Recruitment Posts' items={recruitmentPosts} />
        <SidebarWidget title='Upcoming Events' items={upcomingEvents} />
      </aside>
    </div>
  )
}

export default UserHomePage

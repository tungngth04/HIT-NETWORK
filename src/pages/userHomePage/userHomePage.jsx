import React from 'react'
import CreatePost from '../../components/createPost/createPost'
import PostCard from '../../components/postCard/postCard'
import SidebarWidget from '../../components/sidebarWidget/sidebarWidget'
import './UserHomePage.scss' 
import { usePosts } from '../../hooks/userPosts' 

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
  const { posts, addPost } = usePosts()

  return (
    <div className='user-homepage-container'>
      <div className='main-content'>
   
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

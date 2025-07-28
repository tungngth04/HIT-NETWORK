import React, { useState, useEffect, useCallback } from 'react'
import { Pagination } from 'antd'
import toast from 'react-hot-toast'
import CreatePost from '../../components/createPost/createPost'
import PostCard from '../../components/postCard/postCard'
import SidebarWidget from '../../components/SidebarWidget/sidebarWidget'
import { getPostsApi } from '../../apis/posts.api' // <-- Import API service
import './userHomePage.scss'

const POSTS_PER_PAGE = 5

// Dữ liệu cho sidebar nên được lấy từ API hoặc để trống
const recruitmentPosts = []
const upcomingEvents = []

const UserHomePage = () => {
  // --- Toàn bộ logic được chuyển từ hook vào đây ---
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)

  const goToPage = useCallback(async (pageNum) => {
    const apiPage = pageNum - 1
    if (apiPage < 0) return

    setIsLoading(true)
    try {
      const response = await getPostsApi({ page: apiPage, limit: POSTS_PER_PAGE })
      const responseData = response.data.data
      setPosts(responseData.content || [])
      setCurrentPage(pageNum)
      setTotalPosts(responseData.totalElements || 0)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      toast.error('Không thể tải danh sách bài đăng.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    goToPage(1)
  }, [goToPage])

  const addPost = () => {
    // Gọi lại trang đầu tiên để thấy bài đăng mới nhất
    goToPage(1)
  }
  // --- Kết thúc phần logic ---

  return (
    <div className='user-homepage-container'>
      <div className='main-content'>
        <CreatePost onPostCreated={addPost} />

        {isLoading ? (
          <div className='loading-indicator'>Đang tải bài viết...</div>
        ) : posts && posts.length > 0 ? (
          posts.map((post, index) => <PostCard key={post.id || index} post={post} />)
        ) : (
          <div className='no-posts-message'>Chưa có bài đăng nào để hiển thị.</div>
        )}

        <div className='pagination-wrapper'>
          {totalPosts > 0 && !isLoading && (
            <Pagination
              current={currentPage}
              total={totalPosts}
              pageSize={POSTS_PER_PAGE}
              onChange={goToPage}
              showSizeChanger={false}
            />
          )}
        </div>
      </div>
      <aside className='sidebar'>
        <SidebarWidget title='Recruitment Posts' items={recruitmentPosts} />
        <SidebarWidget title='Upcoming Events' items={upcomingEvents} />
      </aside>
    </div>
  )
}

export default UserHomePage

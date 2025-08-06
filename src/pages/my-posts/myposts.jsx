import React, { useState, useEffect, useCallback, use } from 'react'
import { Pagination } from 'antd'
import toast from 'react-hot-toast'
import CreatePost from '../../components/createPost/createPost'
import { getmyposts } from '../../apis/posts.api'
import './myposts.scss'
import MyPosts from '../../components/myPosts/myPosts'

const Myposts = () => {
  const [pagination, setPagination] = useState({
    current: 0,
    size: 10,
  })
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)
  console.log('Cấu trúc của một bài đăng:', posts[0]) // Xem log này trong Console

  const fetchPosts = async () => {
    try {
      const response = await getmyposts({
        page: pagination.current,
        size: pagination.size,
      })
      setPosts(response?.data?.content)
      setTotalPosts(response?.data?.totalElements || 0)
      setIsLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      toast.error('Không thể tải bài đăng. Vui lòng thử lại sau.')
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [pagination])
  const handlePostCreated = () => {
    if (pagination.current === 0) {
      fetchPosts()
    } else {
      setPagination((prev) => ({ ...prev, current: 0 }))
    }
  }

  const handlePageChange = (pageCurrent, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: pageCurrent - 1,
      size: pageSize || prev.size,
    }))
  }
  // HÀM QUAN TRỌNG: Nhận bài đăng đã cập nhật và thay thế nó trong state
  const handlePostUpdated = (updatedPost) => {
    console.log('Myposts Page: Hàm handlePostUpdated ĐÃ ĐƯỢC GỌI với:', updatedPost)

    setPosts((currentPosts) =>
      currentPosts.map((posts) => (posts.postId == updatedPost.postId ? updatedPost : posts)),
    )
    toast.success('Bài đăng đã được cập nhật!')
  }

  if (isLoading) {
    return <div>Đang tải bài viết...</div>
  }

  return (
    <div className='user-homepage-container'>
      <div className='main-content'>
        <CreatePost posts={posts} onPostCreated={handlePostCreated} />
        {isLoading ? (
          <div className='loading-indicator'>Đang tải bài viết...</div>
        ) : posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <MyPosts key={post.id || index} post={post} onPostUpdated={handlePostUpdated} />
          ))
        ) : (
          <div className='no-posts-message'>Chưa có bài đăng nào để hiển thị.</div>
        )}
        <div className='pagination-wrapper'>
          {totalPosts > 0 && !isLoading && (
            <Pagination
              current={pagination.current + 1}
              total={totalPosts}
              pageSize={pagination.size}
              showSizeChanger
              onChange={handlePageChange}
              onShowSizeChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Myposts

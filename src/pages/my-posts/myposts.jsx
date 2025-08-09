import React, { useState, useEffect, useCallback, use } from 'react'
import { Pagination } from 'antd'
import toast from 'react-hot-toast'
import CreatePost from '../../components/createPost/createPost'
import { getmyposts } from '../../apis/posts.api'
import './myposts.scss'
import MyPosts from '../../components/myPosts/myPosts'
import MyPostDtails from '../../components/myPostDetails/myPostDetails'
import CircularProgress from '@mui/joy/CircularProgress'

const Myposts = () => {
  const [pagination, setPagination] = useState({
    current: 0,
    size: 10,
  })
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)
  const [selectedPost, setSelectedPost] = useState(null)

  const fetchPosts = async () => {
    try {
      const response = await getmyposts({
        page: pagination.current,
        size: pagination.size,
      })
      setPosts(response?.data?.content)
      setTotalPosts(response?.data?.totalElements || 0)
      setIsLoading(false)
    } catch (error) {
      toast.error('Không thể tải bài đăng. Vui lòng thử lại sau.')
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [pagination, posts])
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
  const handleViewPostDetail = (postToView) => {
    setSelectedPost(postToView)
  }
  const handleCommentAdded = (targetPostId) => {
    setPosts((currentPosts) =>
      currentPosts.map((p) => {
        if ((p.postId === targetPostId) === targetPostId) {
          return { ...p, countComment: p.countComment + 1 }
        }
        return p
      }),
    )
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
  }
  const handlePostUpdated = (updatedPost) => {
    setPosts((currentPosts) =>
      currentPosts.map((posts) => (posts.postId == updatedPost.postId ? updatedPost : posts)),
    )
    toast.success('Bài đăng đã được cập nhật!')
  }

  return (
    <div className='user-homepage-container'>
      <div className='main-content'>
        {!isLoading && <CreatePost posts={posts} onPostCreated={handlePostCreated} />}

        {isLoading ? (
          <div className='loading-container'>
            <CircularProgress color='warning' />
          </div>
        ) : posts && posts.length > 0 ? (
          posts.map((post) => (
            <MyPosts
              key={post.postId || post.eventId}
              post={post}
              onPostUpdated={handlePostUpdated}
              onViewDetail={handleViewPostDetail}
            />
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
        {selectedPost && (
          <MyPostDtails
            key={selectedPost.postId || selectedPost.eventId}
            post={selectedPost}
            onClose={handleCloseModal}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
    </div>
  )
}

export default Myposts

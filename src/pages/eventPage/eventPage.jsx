import React, { useState, useEffect, useCallback, use } from 'react'
import { Pagination } from 'antd'
import toast from 'react-hot-toast'
import CreatePost from '../../components/createPost/createPost'
import { getEventApi, getPostsApi } from '../../apis/posts.api'

import './eventPage.scss'
import EventPostCard from '../../components/eventPostCard/evenPostCard'
import EventDetails from '../../components/eventDetails/evenDetails'
import CircularProgress from '@mui/joy/CircularProgress'

const EventPage = () => {
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
      const response = await getEventApi({
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

  if (isLoading) {
    return <CircularProgress color='warning' />
  }

  return (
    <div className='user-homepage-container '>
      <div className='main-content'>
        {!isLoading && <CreatePost posts={posts} onPostCreated={handlePostCreated} />}

        {isLoading ? (
          <div className='loading-container'>
            <CircularProgress color='warning' />
          </div>
        ) : posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <EventPostCard key={post.id || index} post={post} onViewDetail={handleViewPostDetail} />
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
          <EventDetails
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

export default EventPage

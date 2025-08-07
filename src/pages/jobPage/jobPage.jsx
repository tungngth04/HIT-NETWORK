import React, { useState, useEffect, useCallback, use } from 'react'
import { Pagination } from 'antd'
import toast from 'react-hot-toast'
import CreatePost from '../../components/createPost/createPost'
import { getJobApi } from '../../apis/posts.api'
import './jobPage.scss'
import JobPostCard from '../../components/jobPostCard/jobPostCard'
import JobDetails from '../../components/jobDetails/jobDetails'
import Loading from '../../components/loading/loading'

const JobPage = () => {
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
      const response = await getJobApi({
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
    return <Loading isLoading={true} />
  }
  return (
    <div className='user-homepage-container'>
      <div className='main-content'>
        <CreatePost posts={posts} onPostCreated={handlePostCreated} />
        {isLoading ? (
          <div className='loading-indicator'>Đang tải bài viết...</div>
        ) : posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <JobPostCard key={post.id || index} post={post} onViewDetail={handleViewPostDetail} />
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
          <JobDetails
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

export default JobPage

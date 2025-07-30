import React, { useState, useEffect, useCallback, use } from 'react'
import { Pagination } from 'antd'
import toast from 'react-hot-toast'
import CreatePost from '../../components/createPost/createPost'
import PostCard from '../../components/postCard/postCard'
import SidebarWidget from '../../components/SidebarWidget/sidebarWidget'
import { getEventApi, getPostsApi } from '../../apis/posts.api'
import './jobPage.scss'
import { current } from '@reduxjs/toolkit'
import EventPostCard from '../../components/eventPostCard/evenPostCard'
import JobPostCard from '../../components/jobPostCard/jobPostCard'

const JobPage = () => {
  const [pagination, setPagination] = useState({
    current: 0,
    size: 10,
  })
  const [posts, setPosts] = useState([])
  const [jobPosts, setJobPosts] = useState([])
  const [eventPosts, setEventPost] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)

  const fetchPosts = async () => {
    try {
      const response = await getPostsApi({
        page: pagination.current,
        size: pagination.size,
      })
      console.log('response', response)
      setPosts(response?.data?.data?.content)
      setJobPosts(response?.data?.data?.content)
      setEventPost(response?.data?.data?.content)
      setTotalPosts(response?.data?.data?.totalElements || 0)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Không thể tải bài đăng. Vui lòng thử lại sau.')
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [pagination])
  console.log('totalelement', totalPosts)
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
          posts.map((post, index) => <JobPostCard key={post.id || index} post={post} />)
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

export default JobPage

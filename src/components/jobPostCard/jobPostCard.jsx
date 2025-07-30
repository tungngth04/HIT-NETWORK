import React, { useState } from 'react'
import {
  HandThumbsUpFill,
  HandThumbsUp,
  Chat,
  BookmarkFill,
  Bookmark,
  Handbag,
} from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
// import { likePostApi, applyToPostApi, bookmarkPostApi } from '../../apis/posts.api'
import './jobPostCard.scss'

const JobPostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.reacted || false)
  const [likeCount, setLikeCount] = useState(post.countReaction || 0)
  const [isBookmarked, setIsBookmarked] = useState(post.bookmarked || false)
  const [isLoadingApply, setIsLoadingApply] = useState(false)

  const handleLike = async () => {
    const originalLikedState = isLiked
    const originalLikeCount = likeCount
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    try {
      await likePostApi(post.id)
    } catch (error) {
      setIsLiked(originalLikedState)
      setLikeCount(originalLikeCount)
      toast.error('Đã có lỗi xảy ra.')
    }
  }

  const handleBookmark = async () => {
    const originalBookmarkState = isBookmarked
    setIsBookmarked(!isBookmarked)
    try {
      await bookmarkPostApi(post.id)
    } catch (error) {
      setIsBookmarked(originalBookmarkState)
      toast.error('Đã có lỗi xảy ra.')
    }
  }

  const handleApply = async () => {
    setIsLoadingApply(true)
    try {
      await applyToPostApi(post.id)
      toast.success('Ứng tuyển thành công!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Ứng tuyển không thành công.')
    } finally {
      setIsLoadingApply(false)
    }
  }
  console.log(post)

  return (
    <>
      {post.targetType === 'JOB' && (
        <div className='post-card'>
          <div className='post-header'>
            <img
              src={post.creator.avatarUrl || 'https://placehold.co/48x48/EFEFEF/AAAAAA?text=A'}
              alt={`${post.creator.fullName}'s avatar`}
              className='post-avatar'
            />
            <div className='post-user-info'>
              <span className='post-user-name'>{post.creator.fullName}</span>
              <span className='post-user-details'>
                {post.description} • {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            {post.targetType === 'JOB' && <span className='recruit-tag'>Recruitment</span>}
          </div>
          <p className='post-content'>{post.title}</p>
          {post.urlImage && (
            <div className='post-media-container'>
              <img src={post.urlImage} alt='Post media' className='post-media' />
            </div>
          )}
          <div className='post-actions'>
            <div className='action-group'>
              <button onClick={handleLike} className={`action-button ${isLiked ? 'active' : ''}`}>
                {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />} <span>{likeCount}</span>
              </button>
              <button className='action-button'>
                <Chat /> <span>{post.countComment}</span>
              </button>
              {post.targetType === 'JOB' && (
                <button
                  onClick={handleApply}
                  className='action-button apply-button'
                  disabled={isLoadingApply}>
                  <Handbag /> <span>{isLoadingApply ? 'Applying...' : 'Apply'}</span>
                </button>
              )}
            </div>
            <button
              onClick={handleBookmark}
              className={`action-button ${isBookmarked ? 'active' : ''}`}>
              {isBookmarked ? <BookmarkFill /> : <Bookmark />}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default JobPostCard

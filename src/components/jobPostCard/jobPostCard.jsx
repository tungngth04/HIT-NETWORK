import React, { useEffect, useState } from 'react'
import { HandThumbsUpFill, HandThumbsUp, Chat, Handbag } from 'react-bootstrap-icons'
import toast from 'react-hot-toast'
// import { likePostApi, applyToPostApi, bookmarkPostApi } from '../../apis/posts.api'
import './jobPostCard.scss'
import { likePostApi, dellikePostApi } from '../../apis/posts.api'
import ImportCvModal from '../importcv/importcv'
import { useSelector } from 'react-redux'
import { info } from '../../apis/userProfile.api'

const JobPostCard = ({ post, onViewDetail }) => {
  const authState = useSelector((state) => state.auth.auth)
  const currentUser = authState
  const [isLoadingApply, setIsLoadingApply] = useState(false)
  const [isLiked, setIsLiked] = useState(post?.checkReaction || false)
  const [likeCount, setLikeCount] = useState(post?.countReaction || 0)
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const [isUpdate, setIsupdate] = useState(false)
  const [infoUser, setInfoUser] = useState()
  const handleLike = async () => {
    const originalLikedState = isLiked
    const originalLikeCount = likeCount

    setIsLiked(!originalLikedState)
    setLikeCount(originalLikedState ? likeCount - 1 : likeCount + 1)

    try {
      if (originalLikedState) {
        await dellikePostApi({
          targetId: post.postId,
          targetType: 'JOB',
        })
        setIsLiked(false)
        setLikeCount(likeCount - 1)
      } else {
        const response = await likePostApi({
          targetId: post.postId,
          targetType: 'JOB',
          emotionType: 'LIKE',
        })

        if (response?.data && onPostUpdate) {
          onPostUpdate(response.data)
        }
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi thực hiện thao tác.')
      setIsLiked(originalLikedState)
      setLikeCount(originalLikeCount)
    }
  }
  const fetchUser = async () => {
    try {
      const response = await info()
      const userData = response?.data?.fullName
      setInfoUser(userData)
    } catch (err) {
      toast.error('Lỗi khi tải thông tin người dùng')
    }
  }

  useEffect(() => {
    if (currentUser) {
      fetchUser()
    }
  }, [currentUser])

  const handleApply = () => {
    setIsCvModalOpen(true)
  }
  const handleUpdate = () => {
    setIsupdate(true)
  }

  const handleOpenDetail = () => {
    if (onViewDetail) {
      onViewDetail(post)
    }
  }

  return (
    <div className='post-card'>
      <div className='post-header'>
        <img
          src={post.creator.avatarUrl}
          alt={`${post.creator.fullName}'s avatar`}
          className='post-avatar'
        />
        <div className='post-user-info'>
          <span className='post-user-name'>{post.creator.fullName}</span>
          <span className='post-user-create'>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <span className='recruit-tag'>Recruitment</span>
      </div>
      <p className='post-title'>{post.title} </p>
      <p className='post-content'>{post.description} </p>
      {post.urlImage && post.urlImage.length > 0 && (
        <div className='post-media-container'>
          <img src={post.urlImage} alt='Post media' className='post-media' />
        </div>
      )}
      <div className='post-actions'>
        <div className='action-group'>
          <button onClick={handleLike} className={`action-button ${isLiked ? 'active' : ''}`}>
            {isLiked ? <HandThumbsUpFill /> : <HandThumbsUp />} <span>{likeCount}</span>
          </button>
          <button onClick={handleOpenDetail} className='action-button'>
            <Chat /> <span>{post.countComment}</span>
          </button>

          {post?.creator?.fullName !== infoUser && (
            <button
              onClick={handleApply}
              className='action-button apply-button'
              disabled={isLoadingApply}>
              <Handbag /> <span>{isLoadingApply ? 'Applying...' : 'Apply'}</span>
            </button>
          )}
        </div>
      </div>

      {isCvModalOpen && (
        <ImportCvModal postId={post.postId} onClose={() => setIsCvModalOpen(false)} />
      )}
    </div>
  )
}

export default JobPostCard

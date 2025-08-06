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
import './myPosts.scss'
import { likePostApi, dellikePostApi } from '../../apis/posts.api'
import ImportCvModal from '../importcv/importcv'
import UpdatePost from '../updatePost/updatePost'
import DownloadCvModal from '../downloadCv/downloadCv'

const MyPosts = ({ post, onPostUpdated }) => {
  const [isLoadingApply, setIsLoadingApply] = useState(false)
  // Sử dụng optional chaining (?.) để phòng trường hợp post không có các thuộc tính này
  const [isLiked, setIsLiked] = useState(post?.checkReaction || false)
  const [likeCount, setLikeCount] = useState(post?.countReaction || 0)
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  console.log(
    `MyPosts Card (ID: ${post.postId}): Nhận được onPostUpdated là một:`,
    typeof onPostUpdated,
  )

  console.log('post', post)

  const handleLike = async () => {
    const originalLikedState = isLiked
    const originalLikeCount = likeCount

    // --- SỬA LỖI LOGIC: Cập nhật cả isLiked và likeCount để UI phản hồi ngay lập tức ---
    setIsLiked(!originalLikedState)
    setLikeCount(originalLikedState ? likeCount - 1 : likeCount + 1)

    try {
      if (originalLikedState) {
        // Người dùng hủy like
        await dellikePostApi({
          targetId: post.postId,
          targetType: 'JOB',
        })
        // Có thể gọi onPostUpdate ở đây nếu cần cập nhật lại danh sách
        setIsLiked(false) // MỚI cập nhật UI
        setLikeCount(likeCount - 1) // Điều này khiến UI bị phụ thuộc vào API
      } else {
        // Người dùng nhấn like
        // --- SỬA LỖI NGHIÊM TRỌNG: Gán kết quả API cho biến 'response' ---
        const response = await likePostApi({
          targetId: post.postId,
          targetType: 'JOB',
          emotionType: 'LIKE',
        })
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi thực hiện thao tác.')
      // Nếu có lỗi, khôi phục lại trạng thái ban đầu
      setIsLiked(originalLikedState)
      setLikeCount(originalLikeCount)
    }
  }

  const handleApply = () => {
    setIsCvModalOpen(true)
  }
  const handleUpdate = () => {
    setIsUpdate(true)
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
          <button className='action-button'>
            <Chat /> <span>{post.countComment}</span>
          </button>

          <button
            onClick={handleApply}
            className='action-button apply-button'
            disabled={isLoadingApply}>
            <Handbag /> <span>{isLoadingApply ? 'Downloading...' : 'Download'}</span>
          </button>
          <a onClick={handleUpdate} className={`action-button-update `}>
            chỉnh sửa
          </a>
        </div>
      </div>
      {/* Render Modal có điều kiện */}
      {isCvModalOpen && (
        <DownloadCvModal postId={post.postId} onClose={() => setIsCvModalOpen(false)} />
      )}
      {isUpdate && (
        <UpdatePost
          postId={post.postId}
          onClose={() => setIsUpdate(false)}
          // Truyền hàm xuống cho popup
          onPostUpdated={onPostUpdated}
        />
      )}
    </div>
  )
}

export default MyPosts

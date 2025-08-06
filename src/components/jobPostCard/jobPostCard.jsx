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
import { likePostApi, dellikePostApi } from '../../apis/posts.api'
import ImportCvModal from '../importcv/importcv'
import UpdatePost from '../updatePost/updatePost'

const JobPostCard = ({ post }) => {
  const [isLoadingApply, setIsLoadingApply] = useState(false)
  // Sử dụng optional chaining (?.) để phòng trường hợp post không có các thuộc tính này
  const [isLiked, setIsLiked] = useState(post?.checkReaction || false)
  const [likeCount, setLikeCount] = useState(post?.countReaction || 0)
  const [showComments, setShowComments] = useState(false) // Ẩn/hiện khu vực bình luận
  const [comments, setComments] = useState([]) // Danh sách bình luận
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [newComment, setNewComment] = useState('') // Nội dung bình luận mới
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const [isUpdate, setIsupdate] = useState(false)
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

        // Kiểm tra và gọi onPostUpdate nếu có
        if (response?.data && onPostUpdate) {
          onPostUpdate(response.data)
        }
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi thực hiện thao tác.')
      // Nếu có lỗi, khôi phục lại trạng thái ban đầu
      setIsLiked(originalLikedState)
      setLikeCount(originalLikeCount)
    }
  }
  const handleCommentClick = async () => {
    // Bật/tắt khu vực bình luận
    const newShowCommentsState = !showComments
    setShowComments(newShowCommentsState)

    // Chỉ gọi API lần đầu tiên khi mở khu vực bình luận
    if (newShowCommentsState && comments.length === 0) {
      setIsLoadingComments(true)
      try {
        setComments(post.data.content || [])
      } catch (error) {
        toast.error('Không thể tải bình luận.')
      } finally {
        setIsLoadingComments(false)
      }
    }
  }
  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmittingComment(true)
    try {
      const response = await createCommentApi({ postId: post.postId, content: newComment })
      // Thêm bình luận mới vào đầu danh sách để người dùng thấy ngay lập tức
      setComments((prevComments) => [response.data.data, ...prevComments])
      setNewComment('') // Xóa nội dung trong ô input
    } catch (error) {
      toast.error('Gửi bình luận không thành công.')
    } finally {
      setIsSubmittingComment(false)
    }
  }
  const handleApply = () => {
    setIsCvModalOpen(true)
  }
  const handleUpdate = () => {
    setIsupdate(true)
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
            <Handbag /> <span>{isLoadingApply ? 'Applying...' : 'Apply'}</span>
          </button>
        </div>
      </div>
      {showComments && (
        <div className='comment-section'>
          {/* Ô nhập bình luận */}
          <form className='comment-input-form' onSubmit={handleCommentSubmit}>
            <img
              src={currentUser?.avatarUrl || 'https://placehold.co/32x32/EFEFEF/AAAAAA?text=A'}
              alt='avatar'
              className='comment-avatar'
            />
            <input
              type='text'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder='Viết bình luận...'
              className='comment-input'
            />
            <button type='submit' disabled={isSubmittingComment} className='comment-submit-button'>
              Gửi
            </button>
          </form>

          {/* Danh sách bình luận */}
          {isLoadingComments ? (
            <div className='comment-loading'>Đang tải bình luận...</div>
          ) : (
            <div className='comments-list'>
              {comments.map((comment) => (
                <div key={comment.id} className='comment'>
                  <img
                    src={
                      comment.creator.avatarUrl || 'https://placehold.co/32x32/EFEFEF/AAAAAA?text=A'
                    }
                    alt='avatar'
                    className='comment-avatar'
                  />
                  <div className='comment-content'>
                    <span className='comment-author'>{comment.creator.fullName}</span>
                    <p className='comment-text'>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Render Modal có điều kiện */}
      {isCvModalOpen && (
        <ImportCvModal postId={post.postId} onClose={() => setIsCvModalOpen(false)} />
      )}
      {isUpdate && (
        <UpdatePost post={post} postId={post.postId} onClose={() => setIsCvModalOpen(false)} />
      )}
    </div>
  )
}

export default JobPostCard

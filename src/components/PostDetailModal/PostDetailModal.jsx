import React, { useState, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { HandThumbsUp, Chat, HandThumbsUpFill, Handbag } from 'react-bootstrap-icons'
import './PostDetailModal.scss'
import {
  dellikePostApi,
  likePostApi,
  getPostsdetail,
  getJobPostAPI,
  createCommentApi,
} from '../../apis/posts.api'
import ImportCvModal from '../importcv/importcv'

const PostDetailModal = ({ post, onClose, onCommentAdded }) => {
  // State cho phần like
  const [isLiked, setIsLiked] = useState(post?.checkReaction || false)
  const [likeCount, setLikeCount] = useState(post?.countReaction || 0)
  const commentInputRef = useRef(null)

  // State cho phần bình luận
  const [comments, setComments] = useState([])
  const [isLoadingComments, setIsLoadingComments] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const [isLoadingApply, setIsLoadingApply] = useState(false)

  // Lấy danh sách bình luận khi modal được mở
  useEffect(() => {
    const fetchPostDetailsAndComments = async () => {
      // Kiểm tra xem có post ID không
      const targetId = post.postId || post.eventId
      if (!targetId) {
        setIsLoadingComments(false)
        return
      }

      setIsLoadingComments(true)

      console.log('targetId', targetId)
      try {
        let response
        // KIỂM TRA ĐIỀU KIỆN VÀ GỌI API TƯƠNG ỨNG
        if (post.targetType === 'JOB') {
          // Nếu là bài JOB, gọi getJobPostAPI với postId
          response = await getJobPostAPI(targetId)
        } else if (post.targetType === 'EVENT') {
          // Nếu là bài EVENT, gọi getPostsApi với eventId
          // Lưu ý: getPostsApi có vẻ trả về danh sách, ta cần API lấy chi tiết 1 event
          // Tạm dùng getPostsdetail theo file api.js của bạn
          response = await getPostsdetail({ eventId: targetId })
        }
        console.log('idddddđ', targetId)
        // Lấy danh sách bình luận từ trường `commentResponseDTOS`
        const commentsData = response?.data?.commentResponseDTOS || []
        setComments(commentsData)
      } catch (error) {
        toast.error('Không thể tải chi tiết bài đăng và bình luận.')
        console.error('Lỗi khi fetch chi tiết:', error)
      } finally {
        setIsLoadingComments(false)
      }
    }

    fetchPostDetailsAndComments()
  }, [post]) // Chạy lại mỗi khi prop `post` thay đổi

  const handleFocusCommentInput = () => {
    // Dùng .current để truy cập vào phần tử DOM và gọi phương thức focus()
    commentInputRef.current?.focus()
  }
  const handleApply = () => {
    setIsCvModalOpen(true)
  }

  const handleLike = async () => {
    // (Logic handleLike như cũ)
    const originalLikedState = isLiked
    setIsLiked(!originalLikedState)
    setLikeCount((prev) => (originalLikedState ? prev - 1 : prev + 1))
    try {
      const targetId = post.postId || post.eventId
      if (originalLikedState) await dellikePostApi({ targetId, targetType: post.targetType })
      else await likePostApi({ targetId, targetType: post.targetType, emotionType: 'LIKE' })
    } catch (error) {
      toast.error('Thao tác không thành công.')
      setIsLiked(originalLikedState)
      setLikeCount((prev) => (originalLikedState ? prev + 1 : prev - 1))
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setIsSubmittingComment(true)
    try {
      const targetId = post.postId || post.eventId
      const response = await createCommentApi({
        targetId,
        targetType: post.targetType,
        content: newComment,
      })
      setComments((prev) => [response.data, ...prev])
      setNewComment('')
      if (onCommentAdded) {
        onCommentAdded(post.postId || post.eventId)
      }
    } catch (error) {
      toast.error('Gửi bình luận thất bại.')
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const handleContentClick = (e) => e.stopPropagation()

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={handleContentClick}>
        <button onClick={onClose} className='modal-close-button'>
          &times;
        </button>
        <div className='modal-scroll-body'>
          {/* BẮT ĐẦU PHẦN NỘI DUNG GIỐNG HỆT BÀI ĐĂNG */}
          <div className='post-card-view'>
            <div className='post-header'>
              <img src={post.creator.avatarUrl} alt='avatar' className='post-avatar' />
              <div className='post-user-info'>
                <span className='post-user-name'>{post.creator.fullName}</span>
                <span className='post-user-create'>
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              {post.targetType === 'JOB' && <span className='recruit-tag'>Recruitment</span>}
              {post.targetType === 'EVENT' && <span className='recruit-tag event'>Event</span>}
            </div>
            <p className='post-title'>{post.title}</p>
            <p className='post-content'>{post.description}</p>
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
                <button onClick={() => onViewDetail(post)} className='action-button'>
                  <Chat /> <span>{comments.length}</span>
                </button>
                {post.targetType === 'JOB' && (
                  <button onClick={handleApply} className='action-button apply-button'>
                    <Handbag /> <span>{isLoadingApply ? 'Applying...' : 'Apply'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* KẾT THÚC PHẦN NỘI DUNG BÀI ĐĂNG */}

          {/* BẮT ĐẦU PHẦN BÌNH LUẬN */}
          <div className='comments-section'>
            <form className='comment-input-form' onSubmit={handleCommentSubmit}>
              <input
                ref={commentInputRef} // << GẮN VÀO ĐÂY
                type='text'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder='Viết bình luận...'
                className='comment-input'
              />
              <button
                type='submit'
                disabled={isSubmittingComment}
                className='comment-submit-button'>
                Gửi
              </button>
            </form>
            <div className='comments-list'>
              {isLoadingComments ? (
                <div>Đang tải bình luận...</div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.commentId} className='comment'>
                    <img
                      src={comment.userPostResponseDTO.avatarUrl || 'https://placehold.co/32x32'}
                      alt='avatar'
                      className='comment-avatar'
                    />
                    <div className='comment-body'>
                      <span className='comment-author'>{comment.userPostResponseDTO.fullName}</span>
                      <p className='comment-text'>{comment.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* KẾT THÚC PHẦN BÌNH LUẬN */}
          {isCvModalOpen && (
            <ImportCvModal postId={post.postId} onClose={() => setIsCvModalOpen(false)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default PostDetailModal

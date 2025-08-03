import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailpost } from '../../../apis/postAdmin'
import './DetailPost.scss'

const PostDetail = () => {
  const [action, setAction] = useState('like')
  const [post, setPost] = useState(null)
  const { id } = useParams()

  const fetchPost = async (id) => {
    try {
      const res = await getDetailpost(id)
      setPost(res?.data)
    } catch (error) {
      console.error('Lỗi khi lấy bài đăng:', error)
    }
  }

  useEffect(() => {
    if (id) fetchPost(id)
  }, [id])

  const formatDate = (iso) => {
    const d = new Date(iso)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  if (!post) return <p>Đang tải dữ liệu bài đăng...</p>

  return (
    <div className='post-h2'>
      <h2>Chi tiết bài đăng của người dùng</h2>
      <div className='post-detail'>
        <div className='post-detail__main'>
          <h3>{post.title}</h3>
          <p>
            <span style={{fontWeight: 600}}> Người đăng: </span>
           {post.creator?.fullName || 'Không xác định'}
          </p>
          <p>
            <span style={{fontWeight: 600}}>Ngày đăng: </span>
             {formatDate(post.createdAt)}
          </p>
          <div className='post-detail__content'>
            <p>{post.description}</p>
          </div>
          <div className='image-wrapper'>
            <img src={post.images?.[0]} alt='Hình ảnh bài đăng' />
          </div>
        </div>

        <div className='reaction'>
          <div className='reaction-action'>
            <p onClick={() => setAction('like')}>
              <span className={action === 'like' ? 'change' : ''}>Like </span>
              <span>̣({post.countReaction})</span>
            </p>
            <p onClick={() => setAction('comment')}>
              <span className={action === 'comment' ? 'change' : ''}>Comment </span>
              <span> ({post.countComment}) </span>
            </p>
          </div>

          {action === 'like' ? (
            <div className='reaction-likes'>
              {post.reactionResponseDTOS?.length === 0 ? (
                <p>Chưa có lượt thích nào.</p>
              ) : (
                post.reactionResponseDTOS.map((r, i) => (
                  <div key={i} className='like'>
                    <img src={r.avatarUrl || 'https://i.pravatar.cc/40'} alt='avatar' />
                    <div className='like__info'>
                      <p className='like__name'>{r.fullName}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className='reaction-comments'>
              {post.commentResponseDTOS?.length === 0 ? (
                <p>Chưa có bình luận nào.</p>
              ) : (
                post.commentResponseDTOS.map((c, i) => (
                  <div key={i} className='comment'>
                    <img src={c.avatarUrl || 'https://i.pravatar.cc/40'} alt='avatar' />
                    <div className='comment__info'>
                      <div>
                        <p className='comment__name'>{c.fullName}</p>
                        <p className='comment__time'>{formatDate(c.createdAt)}</p>
                      </div>
                      <p className='comment__text'>{c.content}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostDetail

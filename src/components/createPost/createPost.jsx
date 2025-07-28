import React, { useState } from 'react'
import { EmojiSmile, Image } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
import { createPostApi } from '../../apis/posts.api'
import './CreatePost.scss'
import toast from 'react-hot-toast'

const CreatePost = ({ onPostCreated }) => {
  const authState = useSelector((state) => state.auth.auth)
  const currentUser = authState.role

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [postType, setPostType] = useState('EVENT')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOpenModal = () => setModalIsOpen(true)
  const handleCloseModal = (e) => {
    if (isLoading) return
    setModalIsOpen(false)
    setContent('')
    setError('')
    setPostType('EVENT')
  }

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('Nội dung không được để trống.')
      return
    }
    setIsLoading(true)
    try {
      await createPostApi({ title: content, description: content })
      onPostCreated()
      handleCloseModal()
      toast.success('Bài đăng đã được tạo thành công!')
    } catch (err) {
      toast.error('Không thể tạo bài đăng. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }
  if (!currentUser) return null

  return (
    <>
      <div className='create-post-card' onClick={handleOpenModal}>
        <img src={currentUser.avatar} alt='User Avatar' className='create-post-avatar' />
        <div className='create-post-placeholder'>What's on your mind?</div>
      </div>
      {modalIsOpen && (
        <div className='create-post-modal-overlay' onClick={handleCloseModal}>
          <div className='create-post-modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <span className='modal-title-text'>Create post</span>
              <button onClick={handleCloseModal} className='close-button'>
                &times;
              </button>
            </div>
            <div className='modal-user-info'>
              <img src={currentUser.avatar} alt='User Avatar' className='modal-user-avatar' />
              <div className='user-details'>
                <span className='user-name'>{currentUser.hoTen || 'Current User'}</span>
                <span className='post-audience'>Post to Anyone</span>
              </div>
            </div>
            <div className='modal-body'>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='What do you want to talk about?'
                className='modal-textarea'
                autoFocus
              />
            </div>
            <div className='modal-add-ons'>
              <span className='add-ons-title'>Thêm vào bài viết của bạn</span>
              <div className='add-ons-icons'>
                <button className='icon-button'>
                  <EmojiSmile size={20} />
                </button>
                <button className='icon-button'>
                  <Image size={20} />
                </button>
              </div>
            </div>
            {error && <p className='modal-error'>{error}</p>}
            <div className='modal-footer'>
              <div className='type-selector'>
                <span>Type : </span>
                <select value={postType} onChange={(e) => setPostType(e.target.value)}>
                  <option value='EVENT'>event</option>
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className='modal-submit-button'
                disabled={isLoading || !content.trim()}>
                {isLoading ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost

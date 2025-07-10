import React from 'react'
import './createPost.scss'

import { useCreatePost } from '../../hooks/userCreatePost'

import userAvatar from '../../assets/images/hinh-anime-2.jpg'

const CreatePost = ({ onPostCreated }) => {
  const {
    modalIsOpen,
    content,
    isLoading,
    error,
    setContent,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
  } = useCreatePost(onPostCreated)

  return (
    <>
      <div className='create-post-card' onClick={handleOpenModal}>
        <img src={userAvatar} alt='User Avatar' className='create-post-avatar' />
        <div className='create-post-placeholder'>What's on your mind?</div>
      </div>

      {modalIsOpen && (
        <div className='create-post-modal-overlay' onClick={handleCloseModal}>
          <div className='create-post-modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h3>Tạo bài viết</h3>
              <button onClick={handleCloseModal} className='close-button'>
                &times;
              </button>
            </div>
            <div className='modal-body'>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Bạn đang nghĩ gì?'
                className='modal-textarea'
                autoFocus
              />
              {error && <p className='modal-error'>{error}</p>}
            </div>
            <div className='modal-footer'>
              <button
                onClick={handleSubmit}
                className='modal-submit-button'
                disabled={isLoading || !content.trim()}>
                {isLoading ? 'Đang đăng...' : 'Đăng'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost

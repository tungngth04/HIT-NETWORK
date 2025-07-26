import React from 'react'
import './CreatePost.scss'
import { useCreatePost } from '../../hooks/userCreatePost'
import { EmojiSmile, Image } from 'react-bootstrap-icons'
import hinhanime from '../../assets/images/hinh-anime-2.jpg'

const currentUser = {
  name: 'Ne Lam',
  avatar: hinhanime,
}

const CreatePost = ({ onPostCreated }) => {
  const {
    modalIsOpen,
    content,
    postType,
    isLoading,
    error,
    setContent,
    setPostType,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
  } = useCreatePost(onPostCreated)

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
                <span className='user-name'>{currentUser.name}</span>
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
                  <option value='Normal'>Normal</option>
                  <option value='Recruit'>Recruit</option>
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

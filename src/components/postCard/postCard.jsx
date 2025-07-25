import React from 'react'
import { HandThumbsUp, Chat, Bookmark, Handbag } from 'react-bootstrap-icons'
import './PostCard.scss'

const PostCard = ({ post }) => {
  const { user, content, media, stats, type } = post

  return (
    <div className='post-card'>
      <div className='post-header'>
        <img src={user.avatar} alt={`${user.name}'s avatar`} className='post-avatar' />
        <div className='post-user-info'>
          <span className='post-user-name'>{user.name}</span>
          <span className='post-user-details'>
            {user.title} • {user.timestamp}
          </span>
        </div>

        {type === 'Recruit' && <span className='recruit-tag'>Recruitment</span>}
      </div>
      <p className='post-content'>{content}</p>
      {media && (
        <div className='post-media-container'>
          <img src={media} alt='Post media' className='post-media' />
        </div>
      )}
      <div className='post-actions'>
        <div className='action-group'>
          <button className='action-button'>
            <HandThumbsUp /> <span>{stats.likes}</span>
          </button>
          <button className='action-button'>
            <Chat /> <span>{stats.comments}</span>
          </button>

          {type === 'Recruit' && (
            <button className='action-button apply-button'>
              <Handbag /> <span>Apply {stats.applies ?? 0}</span>
            </button>
          )}
        </div>
        <button className='action-button'>
          <Bookmark />
        </button>
      </div>
    </div>
  )
}

export default PostCard

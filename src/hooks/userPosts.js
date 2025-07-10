import { useState, useEffect } from 'react'

const initialPosts = [
  {
    id: 1,
    user: {
      name: 'Vishnu Kumar Agrawal',
      title: 'UX Designer @ Devn Technology',
      timestamp: '25 Nov at 12:24 PM',
      avatar: 'https://placehold.co/48x48/EFEFEF/AAAAAA?text=A',
    },
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    media: 'https://placehold.co/600x250/F0F2F5/CCCCCC?text=Post+Image',
    stats: { likes: 14, comments: 16, applies: 52 },
  },
]

export const usePosts = () => {
  const [posts, setPosts] = useState(initialPosts)

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts])
  }

  return {
    posts,
    addPost,
  }
}

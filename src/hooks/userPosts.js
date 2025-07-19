import { useState, useEffect, useCallback } from 'react'
import { getPostsApi } from '../apis/posts.api'

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const goToPage = useCallback(
    async (pageNum) => {
      if (pageNum < 1 || (totalPages > 0 && pageNum > totalPages)) return
      setIsLoading(true)
      try {
        const { posts: newPosts, totalPages: newTotalPages } = await getPostsApi(pageNum)
        setPosts(newPosts)
        setCurrentPage(pageNum)
        setTotalPages(newTotalPages)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [totalPages],
  )

  useEffect(() => {
    goToPage(1)
  }, [goToPage])

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts])
  }

  return {
    posts,
    isLoading,
    currentPage,
    totalPages,
    addPost,
    goToPage,
  }
}

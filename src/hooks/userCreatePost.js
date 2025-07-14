import { useState } from 'react'
// import { createPostApi } from '../apis/posts.api'

export const useCreatePost = (onPostCreated) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOpenModal = () => setModalIsOpen(true)

  const handleCloseModal = () => {
    if (isLoading) return
    setModalIsOpen(false)
    setContent('')
    setError('')
  }

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('Nội dung không được để trống.')
      return
    }
    setIsLoading(true)
    setError('')
    try {
      const newPostData = await createPostApi({ content })
      // Gọi callback từ hook cha (usePosts) để cập nhật UI
      onPostCreated(newPostData)
      handleCloseModal()
    } catch (err) {
      setError('Không thể tạo bài đăng. Vui lòng thử lại.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    modalIsOpen,
    content,
    isLoading,
    error,
    setContent,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
  }
}

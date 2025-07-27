import { useState } from 'react'
export const useCreatePost = (onPostCreated) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [postType, setPostType] = useState('Normal')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOpenModal = () => setModalIsOpen(true)

  const handleCloseModal = () => {
    if (isLoading) return
    setModalIsOpen(false)
    setContent('')
    setError('')
    setPostType('Normal')
  }

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('Nội dung không được để trống.')
      return
    }
    setIsLoading(true)
    setError('')
    try {
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
    postType,
    isLoading,
    error,
    setContent,
    setPostType,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
  }
}

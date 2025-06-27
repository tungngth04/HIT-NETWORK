import { useState } from 'react'
const useForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await forgotPassword(email)
      console.log('API Response:', response)
      setMessage(
        'Yêu cầu khôi phục mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến.',
      )
      setEmail('')
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu khôi phục mật khẩu:', error)
      setMessage(
        error.response?.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.',
      )
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    loading,
    message,
    handleSubmit,
  }
}

export default useForgotPassword

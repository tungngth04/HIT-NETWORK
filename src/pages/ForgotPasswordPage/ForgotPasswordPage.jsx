import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ForgotPasswordPage.scss'
import { forgotPassword } from '../../apis/auth.api'

const ForgotPasswordPage = () => {
  const [msv, setMsv] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await forgotPassword({ username: msv, email: email })
      setMessage(
        'Yêu cầu khôi phục mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến.',
      )
      setEmail('')
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu khôi phục mật khẩu:', error)
      setMessage(error.response.data.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='forgot-password-page'>
      <div className='forgot-password-left-panel'>
        <div className='welcome-text'>
          <h1>Welcome to</h1>
          <h1 className='brand-name'>HIT NETWORK</h1>
        </div>
      </div>
      <div className='forgot-password-right-panel'>
        <div className='forgot-password-card'>
          <h2>Nhập thông tin tài khoản!</h2>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                id='msv'
                placeholder='Username'
                value={msv}
                onChange={(e) => setMsv(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className='form-group'>
              <input
                type='email'
                id='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {message && (
              <p
                className='api-message'
                style={{ color: message.includes('Lỗi') ? 'red' : 'green', marginTop: '10px' }}>
                {message}
              </p>
            )}
            <button type='submit' className='find-account-button' disabled={loading}>
              {loading ? 'Đang gửi...' : 'Gửi mật khẩu mới'}
            </button>
          </form>

          <div className='login-link'>
            <p>
              Bạn đã có tài khoản? <Link to='/login'>Đăng nhập</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage

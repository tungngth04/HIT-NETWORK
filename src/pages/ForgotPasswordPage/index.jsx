import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/ForgotPasswordPage.scss'
import useForgotPassword from '../../hooks/useForgotPassword'

const ForgotPasswordPage = () => {
  const { email, setEmail, loading, message, handleSubmit } = useForgotPassword()

  return (
    <div className='forgot-password-page'>
      <div className='forgot-password-left-panel'>
        <div className='welcome-text'>
          <h1>Welcome to</h1>
          <h1 className='brand-name'>HIT NETWORK</h1>/
        </div>
      </div>
      <div className='forgot-password-right-panel'>
        <div className='forgot-password-card'>
          <h2>Nhập email!!</h2>
          <form onSubmit={handleSubmit}>
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
                style={{ color: message.includes('Lỗi') ? 'red' : 'red', marginTop: '10px' }}>
                {message}
              </p>
            )}
            <button type='submit' className='find-account-button' disabled={loading}>
              {loading ? 'Đang gửi...' : 'Tìm tài khoản'}
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

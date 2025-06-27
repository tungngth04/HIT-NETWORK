import React from 'react'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import { useLogin } from '../../hooks/useLogin'
import '../../styles/LoginPage.scss'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const {
    msv,
    setMsv,
    password,
    setPassword,
    passwordShow,
    togglePassword,
    isLoading,
    error,
    handleSubmit,
  } = useLogin()
  return (
    <div className='login-page-container'>
      <div className='welcome-section'>
        <div className='welcome-text'>
          <h1>Welcome to</h1>
          <h1 className='brand-name'>HIT NETWORK</h1>
        </div>
      </div>

      <div className='login-section'>
        <div className='login-card'>
          <h2>Đăng nhập</h2>

          <form className='login-form' onSubmit={handleSubmit}>
            <div className='input-group'>
              <label htmlFor='msv'>MSV</label>
              <input
                type='text'
                id='msv'
                name='msv'
                placeholder='Nhập mã sinh viên của bạn'
                value={msv}
                onChange={(e) => setMsv(e.target.value)}
              />
            </div>

            <div className='input-group'>
              <label htmlFor='password'>Password</label>
              <div className='password-wrapper'>
                <input
                  type={passwordShow ? 'text' : 'password'}
                  id='password'
                  name='password'
                  placeholder='Nhập mật khẩu'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={togglePassword} className='toggle-icon'>
                  {passwordShow ? <EyeSlash size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            {error && <p className='error-message'>{error}</p>}

            <div className='options'>
              <p>
                <Link className='forgot-password' to='/ForgotPassword'>
                  Quên mật khẩu
                </Link>
              </p>
            </div>

            <button type='submit' className='submit-button' disabled={isLoading}>
              {isLoading ? 'Đang xử lý...' : 'Join Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

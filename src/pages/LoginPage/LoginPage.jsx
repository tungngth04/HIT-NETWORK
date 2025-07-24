import React from 'react'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import './LoginPage.scss'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { saveAuth } from '../../store/auth.store'

const LoginPage = () => {
  const authen = useAuth()
  const handleSubmit = async (values) => {
    try {
      const response = await login(values)
      // nếu có token thì authen.saveUser({token: response.token})
      // kiểm tra biến role vừa lấy có phải là BQT không
      //dùng role.includes('BQT') để kiểm tra
      // nếu là BQT thì chuyển hướng đến tran admin
      // nếu là TV thì chuyển hướng đến trang home
      if (response.token) {
        saveAuth(response)
        authen.saveUser({ token: response.token, role: response.role })
        if (response.role.includes('BQT')) {
          window.location.href = '/admin'
        } if (response.role.includes('TV')) {
          window.location.href = '/home'
        }
      } else {
        setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.')
    }
  }
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
                  required
                  disabled={isLoading}
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
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

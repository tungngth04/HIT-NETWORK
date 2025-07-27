import React, { useState } from 'react'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import './LoginPage.scss'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { login } from '../../apis/auth.api'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const authen = useAuth()
  const navigate = useNavigate()
  const [msv, setMsv] = useState('')
  const [password, setPassword] = useState('')
  const [passwordShow, setPasswordShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toogglePassword = () => {
    setPasswordShow(!passwordShow)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await login({ username: msv, password: password })
      // nếu có token thì authen.saveUser({token: response.token})
      // kiểm tra biến role vừa lấy có phải là BQT không
      //dùng role.includes('BQT') để kiểm tra
      // nếu là BQT thì chuyển hướng đến tran admin
      // nếu là TV thì chuyển hướng đến trang home
      if (response && response.data.data.token) {
        authen.saveUser({ token: response.data.data.token, role: response.data.data.role })
        if (response.data.data.role.includes('BQT')) {
          navigate('/admin')
          toast.success('Đăng nhập thành công')
        }
        if (response.data.data.role.includes('TV')) {
          navigate('/home')
          toast.success('Đăng nhập thành công')
        }
      } else {
        toast.error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.')
      }
    } catch (error) {
      toast.error('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.')
    } finally {
      setIsLoading(false)
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
                onChange={(e) => setMsv(e.target.value)}
                required
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
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <span onClick={toogglePassword} className='toggle-icon'>
                  {passwordShow ? <EyeSlash size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

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

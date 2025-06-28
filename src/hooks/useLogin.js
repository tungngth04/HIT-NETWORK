import { useState } from 'react'

import { saveAuth } from '../store/auth.store'
import { useDispatch } from 'react-redux'
export const useLogin = () => {
  const [msv, setMsv] = useState('')
  const [password, setPassword] = useState('')
  const [passwordShow, setPasswordShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  const togglePassword = () => {
    setPasswordShow(!passwordShow)
  }

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault()
    }

    if (!msv || !password) {
      setError('Vui lòng nhập cả MSV và Mật khẩu.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data } = await login({ username: msv, password })

      console.log('Đăng nhập thành công:', data)
      alert('Đăng nhập thành công!')
      dispatch(saveAuth(data))
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'MSV hoặc mật khẩu không chính xác.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    msv,
    setMsv,
    password,
    setPassword,
    passwordShow,
    togglePassword,
    isLoading,
    error,
    handleSubmit,
  }
}

import { useState, useEffect } from 'react'
import { Form } from 'antd'
import dayjs from 'dayjs'
import { getUserProfileApi, updateUserProfileApi, changePasswordApi } from '../apis/userProfile.api'

export const useUserProfile = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [action, setAction] = useState('info')
  const [hoverIndex, setHoverIndex] = useState(null)

  const [editForm] = Form.useForm()
  const [passwordForm] = Form.useForm()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserProfileApi()
        setUser(userData)
        editForm.setFieldsValue({
          hoten: userData.hoten,
          gioitinh: userData.gioitinh,

          ngaysinh: userData.ngaysinh ? dayjs(userData.ngaysinh) : null,
        })
      } catch (error) {
        console.error('Failed to fetch user profile', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [editForm])

 
  const handleUpdateProfile = async (values) => {
    console.log('Submitting profile update:', values)
    try {
      const updatedUser = await updateUserProfileApi(values)
      setUser(updatedUser) 
      alert('Cập nhật thông tin thành công!')
      setAction('info') 
    } catch (error) {
      alert('Có lỗi xảy ra, vui lòng thử lại.')
    }
  }

  const handleChangePassword = async (values) => {
    console.log('Submitting password change:', values)
    if (values.newPassword !== values.confirmPassword) {
      passwordForm.setFields([
        { name: 'confirmPassword', errors: ['Mật khẩu xác nhận không khớp!'] },
      ])
      return
    }
    try {
      await changePasswordApi(values)
      alert('Đổi mật khẩu thành công!')
      passwordForm.resetFields()
      setAction('info')
    } catch (error) {
      alert('Có lỗi xảy ra, vui lòng thử lại.')
    }
  }

  return {
    user,
    isLoading,
    action,
    setAction,
    hoverIndex,
    setHoverIndex,
    editForm,
    passwordForm,
    handleUpdateProfile,
    handleChangePassword,
  }
}

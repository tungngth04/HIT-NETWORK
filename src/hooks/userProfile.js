import { useState, useEffect } from 'react'
import { Form } from 'antd'
import dayjs from 'dayjs'
import { info, update } from '../apis/userProfile.api'

export const useUserProfile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [action, setAction] = useState('info')
  const [hoverIndex, setHoverIndex] = useState(null)
  const [editForm] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const [infoUser, setInfoUser] = useState()

  // Get api lay thong tin nguoi dung
  const fetchGetUser = async () => {
    try {
      const response = await info()
      const userData = response?.data
      setInfoUser(userData)
      editForm.setFieldsValue({
        fullName: userData.fullName || '',
        gender: userData.gender || '',
        dob: userData.dob ? dayjs(userData.dob) : null,
        email: userData.email || '',
        username: userData.username || '',
        phone: userData.phone || '',
        // avatarUrl: userData.avatarUrl || null,
      })
    } catch (error) {
      console.error('Lỗi: ', error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchGetUser()
  }, [])

  // PUT API chỉnh sửa thông
  const handleUpdateProfile = async (values) => {
    console.log(values.avatarUrl)
    const formData = new FormData()
    formData.append('fullName', values.fullName)
    formData.append('gender', values.gender)
    formData.append('dob', values.dob?.format('YYYY-MM-DD'))
    formData.append('email', values.email)
    // formData.append('usename', values.usename)
    formData.append('phone', values.phone)
    formData.append('avatarUrl', values.avatarUrl[0].originFileObj)

    try {
      await update(formData)
      console.log('ádasd', formData)
      await fetchGetUser()
      setAction('info')
      alert('Cập nhật thành công!')
    } catch {
      alert('Cap nhat nguoi dung that bai')
      console.log('ádasd', formData)
    }
  }

  // const handleChangePassword = async (values) => {
  //   console.log('Submitting password change:', values)
  //   if (values.newPassword !== values.confirmPassword) {
  //     passwordForm.setFields([
  //       { name: 'confirmPassword', errors: ['Mật khẩu xác nhận không khớp!'] },
  //     ])
  //     return
  //   }
  //   try {
  //     await changePasswordApi(values)
  //     alert('Đổi mật khẩu thành công!')
  //     passwordForm.resetFields()
  //     setAction('info')
  //   } catch (error) {
  //     alert('Có lỗi xảy ra, vui lòng thử lại.')
  //   }
  // }

  return {
    action,
    setAction,
    hoverIndex,
    setHoverIndex,
    infoUser, // lay thong tin nguoi dung
    editForm, // sua thong tin nguoi dung
    handleUpdateProfile,
    // passwordForm,
    // handleChangePassword,
  }
}

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
        fullName: userData.fullName || userData.hoten || '',
        gender: userData.gender || userData.gioitinh || '',
        dob: userData.dob
          ? dayjs(userData.dob)
          : userData.ngaysinh
          ? dayjs(userData.ngaysinh)
          : null,
        email: userData.email || '',
        username: userData.username || userData.tentaikhoan || '',
        phone: userData.phone || '',
      })
    } catch (error) {
      console.error('Failed to fetch user profile', error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchGetUser()
  }, [])

  // PUT API chỉnh sửa thông
  const handleUpdateProfile = async (values) => {
    const payload = {
      ...values,
      dob: values.dob?.format('YYYY-MM-DD'),
      email: infoUser.email,
    }
    console.log('Du lieu gui len api ', payload)
    try {
      await update(payload)
      await fetchGetUser()
      setAction('info')
      // alert('Cập nhật thành công!')
    } catch {
      alert('Cap nhat nguoi dung that bai')
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

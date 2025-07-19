import React from 'react'
import { DatePicker, Form, Input, Radio, Space, Button, Spin } from 'antd'
import dayjs from 'dayjs'
import { useUserProfile } from '../../hooks/userProfile'
import avatar from '../../assets/images/hinh-anime-2.jpg'
import './ProfilePage.scss'

const ProfilePage = () => {
  const {
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
  } = useUserProfile()

  if (isLoading) {
    return (
      <div className='profile-loading'>
        <Spin size='large' />
      </div>
    )
  }

  if (!user) {
    return <div className='profile-loading'>Không thể tải dữ liệu người dùng.</div>
  }

  const menuItems = [
    { key: 'info', label: 'Thông tin cá nhân' },
    { key: 'edit', label: 'Chỉnh sửa thông tin' },
    { key: 'changePassword', label: 'Đổi mật khẩu' },
  ]

  return (
    <div className='profile-page'>
      {/* Phần header card */}
      <div className='profile-header-card'>
        <div className='header-user-info'>
          <img src={avatar} alt='avatar' className='user-avatar' />
          <div className='user-details'>
            <p className='user-name'>{user.hoten}</p>
            <p className='user-email'>{user.email}</p>
          </div>
        </div>
        <div className='header-stats'>
          <div className='stats-item'>
            <p>{user.stats.posts}</p>
            <p>Posts</p>
          </div>
          <div className='stats-item'>
            <p>{user.stats.recruitments}</p>
            <p>Recruitment</p>
          </div>
          <div className='stats-item'>
            <p>{user.stats.applies}</p>
            <p>Apply</p>
          </div>
        </div>
      </div>

      {/* Phần nội dung chính */}
      <div className='profile-main-section'>
        {/* Sidebar */}
        <div className='profile-sidebar'>
          <ul className='sidebar-menu'>
            {menuItems.map((item, index) => (
              <li
                key={item.key}
                className={`menu-item ${hoverIndex === index ? 'hovered' : ''} ${
                  action === item.key && hoverIndex === null ? 'active' : ''
                }`}
                onClick={() => setAction(item.key)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className='profile-content-area'>
          {action === 'info' && (
            <>
              <h4 className='content-title'>Thông tin cá nhân</h4>
              <div className='info-display'>
                <div className='info-item'>
                  <p>Họ và tên:</p>
                  <p>{user.hoten}</p>
                </div>
                <div className='info-item'>
                  <p>Giới tính:</p>
                  <p>{user.gioitinh}</p>
                </div>
                <div className='info-item'>
                  <p>Ngày sinh:</p>
                  <p>{dayjs(user.ngaysinh).format('DD/MM/YYYY')}</p>
                </div>
                <div className='info-item'>
                  <p>Email:</p>
                  <p>{user.email}</p>
                </div>
                <div className='info-item'>
                  <p>Tên tài khoản:</p>
                  <p>{user.tentaikhoan}</p>
                </div>
              </div>
            </>
          )}

          {action === 'edit' && (
            <>
              <h4 className='content-title'>Chỉnh sửa thông tin cá nhân</h4>
              <Form
                form={editForm}
                onFinish={handleUpdateProfile}
                className='edit-form'
                layout='vertical'>
                <Form.Item
                  label='Họ và tên'
                  name='hoten'
                  rules={[{ required: true, message: 'Hãy nhập họ và tên' }]}>
                  <Input className='edit-input' placeholder='Nhập họ và tên' />
                </Form.Item>
                <Form.Item label='Giới tính' name='gioitinh'>
                  <Radio.Group>
                    <Radio value='Nam'>Nam</Radio>
                    <Radio value='Nữ'>Nữ</Radio>
                    <Radio value='Khác'>Khác</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label='Ngày sinh'
                  name='ngaysinh'
                  rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}>
                  <DatePicker className='edit-datepicker' placeholder='Chọn ngày sinh' />
                </Form.Item>
                <Form.Item label='Email'>
                  <Input className='edit-input' disabled value={user.email} />
                </Form.Item>
                <Form.Item label='Tên tài khoản'>
                  <Input className='edit-input' disabled value={user.tentaikhoan} />
                </Form.Item>
                <Form.Item className='form-buttons'>
                  <Space>
                    <Button onClick={() => editForm.resetFields()} className='cancel-button'>
                      Hủy
                    </Button>
                    <Button type='primary' htmlType='submit' className='submit-button'>
                      Xác nhận
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </>
          )}

          {action === 'changePassword' && (
            <>
              <h4 className='content-title'>Đổi mật khẩu</h4>
              <Form
                form={passwordForm}
                onFinish={handleChangePassword}
                className='edit-form'
                layout='vertical'>
                <Form.Item
                  label='Nhập mật khẩu cũ'
                  name='oldPassword'
                  rules={[{ required: true, message: 'Hãy nhập mật khẩu cũ' }]}>
                  <Input.Password className='edit-input' />
                </Form.Item>
                <Form.Item
                  label='Nhập mật khẩu mới'
                  name='newPassword'
                  rules={[{ required: true, message: 'Hãy nhập mật khẩu mới' }]}>
                  <Input.Password className='edit-input' />
                </Form.Item>
                <Form.Item
                  label='Xác nhận mật khẩu'
                  name='confirmPassword'
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: 'Hãy xác nhận mật khẩu' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('Mật khẩu mới không khớp!'))
                      },
                    }),
                  ]}>
                  <Input.Password className='edit-input' />
                </Form.Item>
                <Form.Item className='form-buttons'>
                  <Space>
                    <Button onClick={() => passwordForm.resetFields()} className='cancel-button'>
                      Hủy
                    </Button>
                    <Button type='primary' htmlType='submit' className='submit-button'>
                      Xác nhận
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

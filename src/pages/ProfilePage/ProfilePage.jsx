import React, { useState } from 'react'
import avatar from '../../assets/images/hinh-anime-2.jpg'
import { DatePicker, Form, Input, Radio, Space, Button  } from 'antd'
import './ProfilePage.scss'
function ProfilePage() {
  const [action, setAction] = useState('info')
  const [hoverIndex, setHoverIndex] = useState(null)
  const [userData, setUserData] = useState({
    hoten: '',
    gioitinh: '',
    ngaysinh: null,
    email: '',
    tentaikhoan: '',
  })
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className='user-profile'>
      <div className='user-profile__info'>
        <div className='user-profile__avatar'>
          <div className='user-profile__image'>
            <img src={avatar} alt='avatar' />
          </div>
          <div className='user-profile__name'>
            <p>VishnuAgrawa</p>
            <p>abc@gmail.com</p>
          </div>
        </div>
        <div className='user-profile__amount'>
          <div className='user-profile__amount--item'>
            <p>12</p>
            <p>Post</p>
          </div>
          <div className='user-profile__amount--item'>
            <p>207</p>
            <p>Recruitment</p>
          </div>
          <div className='user-profile__amount--item'>
            <p>64</p>
            <p>Apply</p>
          </div>
        </div>
      </div>
      <div className='user-profile__settings'>
        <div className='user-profile__sidebar'>
          <ul className='menu-list'>
            <li
              className={`${hoverIndex === 0 ? 'hovered' : ''} ${
                action === 'info' && hoverIndex === null ? 'active' : ''
              }`}
              onClick={() => setAction('info')}
              onMouseEnter={() => setHoverIndex(0)}
              onMouseLeave={() => setHoverIndex(null)}>
              Thông tin cá nhân
            </li>

            <li
              className={`${hoverIndex === 1 ? 'hovered' : ''} ${
                action === 'edit' && hoverIndex === null ? 'active' : ''
              }`}
              onClick={() => setAction('edit')}
              onMouseEnter={() => setHoverIndex(1)}
              onMouseLeave={() => setHoverIndex(null)}>
              Chỉnh sửa thông tin
            </li>

            <li
              className={`${hoverIndex === 2 ? 'hovered' : ''} ${
                action === 'changePassword' && hoverIndex === null ? 'active' : ''
              }`}
              onClick={() => setAction('changePassword')}
              onMouseEnter={() => setHoverIndex(2)}
              onMouseLeave={() => setHoverIndex(null)}>
              Đổi mật khẩu
            </li>
          </ul>
        </div>

        {action === 'info' && (
          <div className='user-profile__content'>
            <h4 className='user-profile__content--title'>Thông tin cá nhân</h4>
            <div className='user-profile__form'>
              <div className='user-profile__form--item'>
                <p>Họ và tên: </p>
                <p>Vishnu Kumar Agrawal</p>
              </div>
              <div className='user-profile__form--item'>
                <p>Giới tính: </p>
                <p>Nam</p>
              </div>
              <div className='user-profile__form--item'>
                <p>Ngày sinh: </p>
                <p>dd/yy/mm</p>
              </div>
              <div className='user-profile__form--item'>
                <p>Email: </p>
                <p>abc@gmail.com</p>
              </div>
              <div className='user-profile__form--item'>
                <p>Tên tài khoản: </p>
                <p>Agrawa</p>
              </div>
            </div>
          </div>
        )}
        {action === 'edit' && (
          <div className='user-profile__content'>
            <h4 className='user-profile__content--title'>Chỉnh sửa thông tin cá nhân</h4>
            <Form form={form} className='user-profile__edit-form'>
              <Form.Item
                className='user-profile__edit-form--item'
                value='hoten' name='hoten'
                rules={[{ required: true, message: 'Hãy nhập họ và tên' }]}>
                <Input className='edit-input' placeholder='Nhập họ và tên' />
              </Form.Item>
              <Form.Item className='user-profile__edit-form--item ' value='gioitinh' name='gioitinh'>
                <Radio.Group className='radio-horizontal'>
                  <Radio value='nam'>Nam</Radio>
                  <Radio value='nu'>Nữ</Radio>
                  <Radio value='khac'>Khác</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item className='user-profile__edit-form--item' name='ngaysinh' value='ngaysinh' rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}>
                <DatePicker className='edit-datetime' placeholder='Chọn ngày sinh' />
              </Form.Item>
              <Form.Item className='user-profile__edit-form--item'>
                <Input className='edit-input' disabled value='abc@gmai.com' />
              </Form.Item>
              <Form.Item className='user-profile__edit-form--item'>
                <Input className='edit-input' disabled value='Arward' />
              </Form.Item>
              <Form.Item  className='user-profile__edit-form--item' >
                <Space  style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button htmlType='button' onClick={onReset} className='btn-reset'>
                    Hủy
                  </Button>
                  <Button type='primary' htmlType='submit' className='btn-ok'>
                   Xác nhận
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
        {action === 'changePassword' && (
          <div className='user-profile__content'>
            <h4 className='user-profile__content--title'>Đổi mật khẩu</h4>
            <Form form={form} className='user-profile__changePassword-form' layout='vertical'>
              <Form.Item
                label='Nhập mật khẩu cũ'
                name='oldPassword'
                rules={[{ required: true, message: 'Hãy nhập mật khẩu cũ' }]}
                className='user-profile__changePassword-form--item'>
                <Input.Password className='edit-input' />
              </Form.Item>
              <Form.Item
                label='Nhập mật khẩu mới'
                name='newPassword'
                rules={[{ required: true, message: 'Hãy nhập mật khẩu mới' }]}
                className='user-profile__changePassword-form--item'>
                <Input.Password className='edit-input' />
              </Form.Item>
              <Form.Item
                label='Xác nhận mật khẩu'
                name='ChangePassword'
                rules={[{ required: true, message: 'Hãy xác nhận mật khẩu' }]}
                className='user-profile__changePassword-form--item'>
                <Input.Password className='edit-input' />
              </Form.Item>
              <Form.Item  className='user-profile__changePassword-form--item' >
                <Space  style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button htmlType='button' onClick={onReset} className='btn-reset'>
                    Hủy
                  </Button>
                  <Button type='primary' htmlType='submit' className='btn-ok'>
                   Xác nhận
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage

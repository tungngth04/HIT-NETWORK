import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Radio, DatePicker, Space, Select } from 'antd'
import './MemberForm.scss'
function MemberForm({ modal }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const { form } = Form.useForm()
  const [data, setData] = useState({
    fullName: '',
    role: '',
    gender: 'Nam',
    dob: null,
    email: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async(values) => {
    const payload = {
      ...values,
      dob: values.dob.format('YYYY-MM-DD[T]HH:mm:ss'),
    }
    try{
      await createMembers(payload)
      console.log("Tao api member thanh cong")
    }
    catch(error){
      console.error(error)
    }

    navigate('/admin/members')
  }
  const handleCancel = () => {
    navigate('/admin/members')
  }



  return (
    <div>
      <div className='member-form__wrapper'>
        {modal === 'add' ? <h2>Tạo tài khoản thành viên </h2> : <h2>Sửa tài khoản thành viên</h2>}
        <Form
          onFinish={handleSubmit}
          className='member-form'
          layout='horizontal'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign='left'
          form={form}>
          <Form.Item
            label='Họ và tên'
            name='fullName'
            rules={[{ required: true, message: 'Hãy nhập họ và tên!' }]}>
            <Input placeholder='Nhập họ và tên' onChange={handleChange} />
          </Form.Item>

          <Form.Item label='Vai trò' name='role' rules={[
              { required: true, message: 'Hãy chọn vai trò' },
            ]}>
            <Select placeholder='Chọn vai trò'>
              <Select.Option value='TV' onChange={handleChange}>
                TV
              </Select.Option>
              <Select.Option value='BQT' onChange={handleChange}>
                BQT
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label='Giới tính' name='gender' rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value='MALE' onChange={handleChange}>
                Nam
              </Radio>
              <Radio value='FEMALE' onChange={handleChange}>
                {' '}
                Nữ{' '}
              </Radio>
              <Radio value='OTHER' onChange={handleChange}>
                Khác
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label='Ngày sinh'
            name='dob'
            rules={[{ required: true, message: 'Hãy chọn ngày sinh!' }]}>
            <DatePicker className='datetime' placeholder='Chọn ngày sinh' onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true, message: 'Hãy nhập email' },
              { type: 'email', message: 'Giá trị email không hợp lệ' },
            ]}>
            <Input placeholder='Nhập email' onChange={handleChange} />
          </Form.Item>
          {/* 
          <Form.Item
            label='Tên tài khoản'
            name='username'
            rules={[{ required: true, message: 'Hãy nhập tên tài khoản!' }]}>
            <Input placeholder='Nhập tên tài khoản' onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label='Mật khẩu'
            name='passwordHash'
            rules={[{ required: true, message: 'Hãy nhập mật khẩu hoặc nhấn Rundome' }]}
            style={{ marginBottom: 8 }}>
            <Space.Compact style={{ width: '100%' }}>
              <Input.Password placeholder='Rundome mật khẩu' onChange={handleChange} />
              <Button className='btnSubmit'>Rundome</Button>
            </Space.Compact>
          </Form.Item> */}

          <Space
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '32px',
              justifyContent: 'center',
              marginTop: '40px',
            }}>
            <Form.Item>
              <Button htmlType='button' className='btnCancel' onClick={handleCancel}>
                Hủy
              </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' className='btnSubmit'>
                Gửi
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  )
}

export default MemberForm

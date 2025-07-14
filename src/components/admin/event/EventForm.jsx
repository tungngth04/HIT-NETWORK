import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, DatePicker, Form, Input, Space } from 'antd'
import "./EventForm.scss"
const { TextArea } = Input
function EventForm({ modal }) {
  const navigate = useNavigate()
  const handleCancel = () => {
    navigate("/admin/events")
  }
  return (
    <div className='event-form__wrapper'>
      {modal == 'add' ? (
        <h2>Tạo sự kiện câu lạc HIT</h2>
      ) : (
        <h2>Chỉnh sửa sự kiện câu lạc bộ HIT</h2>
      )}
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        layout='horizontal'
        style={{ maxWidth: 600 }}
        labelAlign='left'
        className='event-form'
        initialValues={{
          tensukien: '',
          thoigian: '',
          điaiem: '',
          nguoitochuc: '',
          mota: '',
        }}>
        <Form.Item
          label='Tên sự kiện'
          name='tensukien'
          rules={[{ required: true, message: 'Hãy nhập tên sự kiện' }]}>
          <Input placeholder='Nhập tên sự kiện'/>
        </Form.Item>
        <Form.Item
          label='Thời gian tổ chức'
          name='thoigian'
          rules={[{ required: true, message: 'Hãy chọn thời gian tổ chức' }]}>
          <DatePicker className='datetime' placeholder='Chọn thời gian tổ chức'/>
        </Form.Item>
        <Form.Item
          label='Địa điểm'
          name='diadiem'
          rules={[{ required: true, message: 'Hãy nhập địa điểm' }]}>
          <Input placeholder='Nhập địa điểm'/>
        </Form.Item>
        <Form.Item
          label='Người tổ chức'
          name='nguoitochuc'
          rules={[{ required: true, message: 'Hãy nhập tên người tổ chức' }]}>
          <Input placeholder='Nhập tên người tổ chức'/>
        </Form.Item> 
        <Form.Item label={<span style={{ marginLeft: '12px' }}>Mô tả sự kiện</span>}        >
          <TextArea rows={4} placeholder='Nhập mô tả sự kiện'/>
        </Form.Item>
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
  )
}

export default EventForm

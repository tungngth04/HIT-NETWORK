import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, DatePicker, Form, Input, Space } from 'antd'
import './EventForm.scss'
import dayjs from 'dayjs'
import { createEvents, getDetaiEvents, updateEvents } from '../../../apis/events.api'
import toast from 'react-hot-toast'
const { TextArea } = Input


function EventForm({ modal }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm()
  const handleCancel = () => {
    navigate('/admin/events')
  }
  const [event, setEvent] = useState({
    title: '',
    eventDate: '',
    location: '',
    organizer: '',
    description: '',
  })

  // get detail event detail
  const getDetail = async (id) => {
    try {
      const response = await getDetaiEvents(id)
      const data = response?.data
      // Tạo đối tượng cho form
      const filledEvent = {
        title: data.title,
        eventDate: dayjs(data.eventDate),
        location: data.location,
        organizer: data.organizer,
        description: data.description,
      }
      setEvent(filledEvent) // cập nhật state nếu bạn cần render khác
      form.setFieldsValue(filledEvent) // set giá trị form  // chú ý phần này
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if (id) {
      getDetail(id)
    }
  }, [id, form])

  // Tao  va sua su kien voi api
  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      eventDate: values.eventDate.format('YYYY-MM-DD[T]HH:mm:ss'),
    }

    try {
      if (modal === 'add') {
        await createEvents(payload)
        console.log('Create API event thanh cong')
        toast.success('Tạo sự kiện thành công!')
      } else {
        await updateEvents(id, payload)
        toast.success('Cập nhật sự kiện thành công!')
      }
    } catch (error) {
      if (modal === 'add'){
         toast.error('Tạo sự kiện thất bại!')
      }
      else{
         toast.error('Cập nhật sự kiện thất bại!')
      }
     
    }

    navigate('/admin/events')
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
        initialValues={event}
        form={form}
        onFinish={handleSubmit} // ← xử lý khi submit thành công
        // onFinishFailed={handleFailed}
      >
        <Form.Item
          label='Tên sự kiện'
          name='title'
          rules={[{ required: true, message: 'Hãy nhập tên sự kiện' }]}>
          <Input placeholder='Nhập tên sự kiện' />
        </Form.Item>
        <Form.Item
          label='Thời gian tổ chức'
          name='eventDate'
          rules={[{ required: true, message: 'Hãy chọn thời gian tổ chức' }]}>
          <DatePicker className='datetime' placeholder='Chọn thời gian tổ chức' />
        </Form.Item>
        <Form.Item
          label='Địa điểm'
          name='location'
          rules={[{ required: true, message: 'Hãy nhập địa điểm' }]}>
          <Input placeholder='Nhập địa điểm' />
        </Form.Item>
        <Form.Item
          label='Người tổ chức'
          name='organizer'
          rules={[{ required: true, message: 'Hãy nhập tên người tổ chức' }]}>
          <Input placeholder='Nhập tên người tổ chức' />
        </Form.Item>
        <Form.Item
          name='description'
          label={<span style={{ marginLeft: '12px' }}>Mô tả sự kiện</span>}>
          <TextArea rows={4} placeholder='Nhập mô tả sự kiện' />
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

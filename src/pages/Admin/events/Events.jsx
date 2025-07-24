import React, { useEffect, useState } from 'react'
import './Events.scss'
// import events from '../data/events';
import { useNavigate } from 'react-router-dom'
import { Table } from 'antd'
import Import from '../../../components/admin/import/Import'
import Delete from '../../../components/admin/delete/Delete'
import { getAllEvents } from '../../../apis/events.api'

function Events() {
  const navigate = useNavigate()
  const handleCreate = () => {
    navigate('/admin/events/create')
  }
  const columns = [
    {
      title: 'STT',
      dataIndex: 'eventId',
      key: 'eventId',
    },
    {
      title: 'Tên sự kiện',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'diadiem',
      key: 'diadiem',
    },
    {
      title: 'Người tổ chức',
      dataIndex: 'nguoitochuc',
      key: 'nguoitochuc',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangthai',
      key: 'trangthai',
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <div className='table-action'>
          <button
            className='table-action__edit'
            onClick={() => navigate(`/admin/events/edit/${record.eventId}`)}>
            Sửa
          </button>
          <button className='table-action__delete' onClick={() => handleDelete(record.eventId)}>
            Xóa
          </button>
        </div>
      ),
    },
  ]

  const [id, setId] = useState() // id su kien cu thw
  const [events, setEvents] = useState()
  const [loading, setLoading] = useState(true)
  const [importPopup, setImportPopup] = useState({
    open: false,
    type: '', // 'user' hoặc 'event'
  })
  const [deletePopup, setDeletePopup] = useState({
    open: false,
    type: '', // 'user' hoặc 'event'
  })
  const handleImport = () => {
    setImportPopup({
      open: true,
      type: 'event',
    })
  }
  const handleDelete = (id) => {
    setId(id)
    setDeletePopup({
      open: true,
      type: 'event',
    })
  }

  const feathEvent = async () => {
    try {
      const response = await getAllEvents()
      console.log('Get All Events', response)
      setEvents(response?.data?.content)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    feathEvent()
  }, [])
  if (loading) return <p>Đang tải dữ liệu...</p>
  return (
    <div className='events-page'>
      <h2 className='events-page__title'>Danh sách sự kiện</h2>
      <div className='members-toolbar'>
        <div className='members-toolbar__search'>
          <input type='text' placeholder='Tìm kiếm theo fullname, username, email' />
        </div>
        <div className='members-toolbar__actions'>
          <button className='button button--search'>Tìm kiếm</button>
          <button className='button button--add' onClick={handleCreate}>
            Thêm
          </button>
          <button className='button button--import' onClick={handleImport}>
            Import
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={events} rowKey='stt' pagination={{ pageSize: 8 }} />
      {deletePopup.open && (
        <Delete
          id={id}
          data={data}
          setData={setData}
          setDeletePopup={setDeletePopup}
          deletePopup={deletePopup}
        />
      )}
      {importPopup.open && (
        <Import importPopup={importPopup} setImportPopup={setImportPopup} setData={setData} />
      )}
    </div>
  )
}

export default Events

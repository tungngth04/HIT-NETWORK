import React, { useEffect, useState } from 'react'
import './Events.scss'
// import events from '../data/events';
import { useNavigate } from 'react-router-dom'
import { Table } from 'antd'
import { Pagination } from 'antd'
import Import from '../../../components/admin/import/Import'
import Delete from '../../../components/admin/delete/Delete'
import { getAllEvents } from '../../../apis/events.api'
import { current } from '@reduxjs/toolkit'

function Events() {
  const navigate = useNavigate()
  const [pagination, setPagination] = useState({
    current: 0,
    size: 10,
  })
  const handlePageChange = (pageCurrent, pageSize) => {
    setPagination((prev) => ({ ...prev, current: pageCurrent - 1, size: pageSize || prev.size }))
  }
  const handleCreate = () => {
    navigate('/admin/events/create')
  }
  const columns = [
    {
      title: 'STT',
      render:  (_, __, index) => (pagination.current ) * pagination.size + index + 1,
      key: 'index',
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
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Người tổ chức',
      dataIndex: 'organizer',
      key: 'organizer',
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
      const response = await getAllEvents({
        page: pagination.current,
        size: pagination.size,
      })
      console.log('Get All Events', response)
      setEvents(response?.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    feathEvent()
  }, [pagination])
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
      <Table
        columns={columns}
        dataSource={events?.content}
        // rowKey={events.eventId}
        rowKey='id'
        // scroll={cacluateTabe}
        pagination={false}
      />
      <Pagination
        align='end'
        defaultCurrent={pagination.current}
        total={events?.totalElements}
        pageSize={pagination.size}
        showSizeChanger
        onChange={handlePageChange}
        onShowSizeChange={handlePageChange}
      />
      {deletePopup.open && (
        <Delete
          id={id}
          // data={data}
          // setData={setData}
          setDeletePopup={setDeletePopup}
          deletePopup={deletePopup}
        />
      )}
      {importPopup.open && (
        <Import
          importPopup={importPopup}
          setImportPopup={setImportPopup}
          //  setData={setData}
        />
      )}
    </div>
  )
}

export default Events

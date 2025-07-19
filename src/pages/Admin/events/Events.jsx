import React, { useState } from 'react'
import "./Events.scss"
import events from '../data/events';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import Import from '../../../components/admin/import/Import';
import Delete from '../../../components/admin/delete/Delete'

function Events() {
const navigate = useNavigate()
const handleCreate = () => {
  navigate("/admin/events/create")
}
const columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Tên sự kiện',
    dataIndex: 'ten',
    key: 'tensukien',
  },
  {
    title: 'Thời gian',
    dataIndex: 'thoigian',
    key: 'thoigian',
  },
  {
    title: 'Địa điểm',
    dataIndex: 'diadiem',
    key: 'diadiem',
  },
  {
    title:'Người tổ chức',
    dataIndex: 'nguoitochuc',
    key: 'nguoitochuc',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangthai',
    key: 'trangthai',
  },
  {
    title: "Hành động",
    dataIndex: "",
    key: "x",
    render: (_,record) => (
      <div className='table-action'>
        <button className="table-action__edit" onClick={() => navigate(`/admin/events/edit/${record.stt}`)}>Sửa</button>
        <button className="table-action__delete" onClick={() => handleDelete(record.stt)}>Xóa</button>
      </div>
    )
  }
];

const [id, setId] = useState()   // id su kien cu thw
const [data, setData] = useState(events)  // danh sach su kieb
const [importPopup, setImportPopup] = useState({
  open: false,
  type: '', // 'user' hoặc 'event'
});
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
            <button className='button button--import' onClick={handleImport}>Import</button>
          </div>
        </div>
        <Table columns={columns} dataSource={events} rowKey='stt'
        pagination={{pageSize: 8}}/>
        {deletePopup.open && (
          <Delete
            id={id}
            data={data}
            setData={setData}
            setDeletePopup={setDeletePopup}
            deletePopup = {deletePopup}
          />
        )}
        {
          importPopup.open && (
            <Import 
            importPopup = {importPopup}
            setImportPopup = {setImportPopup} 
            setData = {setData}
            />
          )
        }
    </div>
  )
}

export default Events
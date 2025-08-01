import { Table } from 'antd'
import React from 'react'
import events from '../data/events'
import fakePosts from '../data/posts'
import "./Post.scss"
import { useNavigate } from 'react-router-dom'

function Post() {
  const navigate = useNavigate()
  const handleCreate = () => {
    navigate('/admin/events/create')
  }
  const columns = [
  {
    title: 'STT',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tiêu đề bài viết',
    dataIndex: 'title',
    key: 'title',
    width: 300,
  },
  {
    title: 'Người đăng',
    dataIndex: 'author',
    key: 'author',
    align: 'center'
  },
  {
    title: 'Ngày đăng',
    dataIndex: 'date',
    key: 'date',
    align: 'center'
  },
  {
    title: 'Lượt thích',
    dataIndex: 'likes',
    key: 'likes',
    align: 'center'
  },
  {
    title: 'Lượt bình luận',
    dataIndex: 'comments',
    key: 'comments',
    align: 'center'
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_, record) => (
      <div className='table-action'>
        <button
          className='table-action__edit'
          onClick={() => navigate(`/admin/post/detail/${record.id}`)}
        >
          Chi tiết
        </button>
        <button
          className='table-action__delete'
          onClick={() => handleDelete(record.id)}
        >
          Xóa
        </button>
      </div>
    ),
  },
];


  const handleDelete = (id) => {
    setId(id)
    setDeletePopup({
      open: true,
      type: 'event',
    })
  }

  return (
    <div className='post-page'>
      <h2 className='post-page__title'>Danh sách bài đăng</h2>
      <div className='post-toolbar'>
        <div className='post-toolbar__search'>
          <input type='text' placeholder='Tìm kiếm theo tiêu đề, nội dung, người đăng' />
        </div>
        <div className='post-toolbar__actions'>
          <button className='button button--search'>Tìm kiếm</button>
        </div>
      </div>
      <Table columns={columns} dataSource={fakePosts} rowKey='stt' pagination={{ pageSize: 8 }} />
    </div>
  )
}

export default Post

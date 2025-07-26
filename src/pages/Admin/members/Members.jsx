import React, { useEffect, useState } from 'react'
import './Members.scss'
// import data1 from '../data/data'
import { CiSearch } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { Table } from 'antd'
import Delete from '../../../components/admin/delete/Delete'
import Import from '../../../components/admin/import/Import'
import { getAllMembers } from '../../../apis/members.api'


function Members() {
  const navigate = useNavigate()
  // const [data, setData] = useState(data1)
  const [id, setId] = useState()
  const [deletePopup, setDeletePopup] = useState({
    open: false,
    type: '', // 'user' hoặc 'event'
  })
  const [importPopup, setImportPopup] = useState({
    open: false,
    type: '', // 'user' hoặc 'event'
  });
  const handleDelete = (id) => {
    setId(id)
    setDeletePopup({
      open: true,
      type: 'user',
    })
  }
  const handleImport = () => {
    setImportPopup({
      open: true,
      type: 'user',
    })
  }
  // const newData = () => ({
  //   hoten: '',
  //   gioitinh: '',
  //   ngaysinh: null,
  //   email: '',
  //   tentaikhoan: '',
  //   matkhau: '',
  // })
  const handleAdd = () => {
    navigate('/admin/members/create')
  }
  const handleEdit = (id) => {
    navigate(`/admin/members/edit/${id}`)
  }
  const columns = [
    {
      title: 'STT',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matkhau',
      key: 'matkhau',
    },
    {
      title: 'Hành động',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <div>
          <button className='button button--edit' onClick={() => handleEdit(record.stt)}>
            Sửa
          </button>
          <button className='button button--delete' onClick={() => handleDelete(record.stt)}>
            Xóa
          </button>
        </div>
      ),
    },
  ]

  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

   const fetchUsers = async() => {
      try {
        const response = await getAllMembers();
        console.log("Get AllMember",response)
        setUser(response?.data?.items)
      } catch(error){
        console.error(error)
      }finally{
        setLoading(false)
      }
    };

  useEffect(() => {
    fetchUsers();
  }, []);
  
//   useEffect(() => {
//   console.log(user); // Sẽ chạy mỗi khi user thay đổi
// }, [user]);

  if (loading) return <p>Đang tải dữ liệu...</p>
  return (
    <>
      <div className='members-page'>
        <h2>Danh sách thành viên</h2>
        <div className='members-toolbar'>
          <div className='members-toolbar__search'>
            <input type='text' placeholder='Tìm kiếm theo fullname, username, email' />
          </div>
          <div className='members-toolbar__actions'>
            <button className='button button--search'>Tìm kiếm</button>
            <button className='button button--add' onClick={handleAdd}>
              Thêm
            </button>
            <button className='button button--import' onClick={handleImport}>Import</button>
          </div>
        </div>
        <Table columns={columns} dataSource={user} rowKey="useId" pagination={{ pageSize: 8 }} /> 
      </div>
      <div>
        {deletePopup.open && (
          <Delete
            id={id}
            // data={data}
            // setData={setData}
            setDeletePopup={setDeletePopup}
            deletePopup = {deletePopup}
          />
        )}
        {
          importPopup.open && (
            <Import 
            importPopup = {importPopup}
            setImportPopup = {setImportPopup} 
            // setData = {setData}
            />
          )
        }
      </div>
    </>
  )
}

export default Members

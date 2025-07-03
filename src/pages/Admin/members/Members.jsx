import React, { useState } from 'react'
import "./Members.scss"
import LayoutAdmin from '../../../layouts/admin/LayoutAdmin/LayoutAdmin'
import data1 from '../data/data';
import { CiSearch } from "react-icons/ci"
import { useNavigate} from 'react-router-dom';
import { Table } from 'antd';
import DeleteMember from '../../../components/admin/delete/DeleteMember';

function Members() {
const navigate = useNavigate()
const [member, setMember] = useState(data1)
const [checktype, setCheckType] = useState("add")
const [showmodal, setShowModal] = useState(false) // show add hoac edit
const [id, setId] = useState()
const newData = () => ({
    hoten: "",
    gioitinh: "",
    ngaysinh: null,
    email: "",
    tentaikhoan: "",
    matkhau: ""
})
const handleAdd = () =>{
    navigate("/admin/members/create")
} 
const handleEdit = (id) => {
    navigate(`/admin/members/edit/${id}`)
} 
const handleDelete = (id) => {
    setShowModal(true)
    setId(id)
}

const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoten',
      key: 'hoten',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gioitinh',
      key: 'gioitinh',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaysinh',
      key: 'ngaysinh',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tài khoản',
      dataIndex: 'tentaikhoan',
      key: 'tentaikhoan',
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matkhau',
      key: 'matkhau',
    },
    {
        title: "Hành động",
        dataIndex: "",
        key: "x",
        render: (_,record) => (
            <div>
                <button className="button button--edit" onClick={() => handleEdit(record.stt)}>Sửa</button>
                <button className="button button--delete" onClick={() => handleDelete(record.stt)}>Xóa</button>
            </div>
        )
    }
  ];

  return (
    <>
    <div className="members-page">
            <h2>Danh sách thành viên</h2>
            <div className="members-toolbar">
                <div className="members-toolbar__search">
                <input type="text" placeholder="Tìm kiếm theo fullname, username, email" />
                </div>
                <div className="members-toolbar__actions">
                    <button className="button button--search">Tìm kiếm</button>
                    <button className="button button--add" onClick={handleAdd}>Thêm</button>
                    <button className="button button--import">Import</button>
                </div>
            </div>
            <Table
            columns={columns}
            dataSource={data1}
            rowKey="stt" 
            pagination ={{ pageSize: 5}}
            />
        </div>
        <div>
             {showmodal && (<DeleteMember deleteId={id} member = {member} setMember = {setMember} setShowModal={setShowModal}/>)}
        </div>  
    </>
              
  )
}

export default Members
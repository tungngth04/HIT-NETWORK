import React, { useState } from 'react'
import "./Members.scss"
import LayoutAdmin from '../../../layouts/admin/LayoutAdmin/LayoutAdmin'
import data1 from '../data/data';
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import DeleteMember from '../../../components/admin/member/DeleteMember';
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
    // setMember(newData)
    // setCheckType("add")
    // setShowModal("true")
    navigate("/admin/members/create")
} 
const handleEdit = (id) => {
    navigate(`/admin/members/edit/${id}`)
}
const handleDelete = (id) => {
    setShowModal(true)
    setId(id)
}
  return (
    <LayoutAdmin>
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

            <div className="members-table">
                <table>
                    <thead>
                        <tr>
                        <th>STT</th>
                        <th>Họ tên</th>
                        <th>Giới tính</th>
                        <th>Ngày Sinh</th>
                        <th>Email</th>
                        <th>Tên tài khoản</th>
                        <th>Mật khẩu</th>
                        <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        member.map((item) => (
                            <tr key={item.stt}>
                                <td>{item.stt}</td>
                                <td>{item.hoten}</td>
                                <td>{item.gioitinh}</td>
                                <td>{item.ngaysinh}</td>
                                <td>{item.email}</td>
                                <td>{item.tentaikhoan}</td>
                                <td>{item.matkhau}</td>
                                <td className="members-table__actions">
                                    <button className="button button--edit" onClick={() => handleEdit(item.stt)}>Sửa</button>
                                    <button className="button button--delete" onClick={() => handleDelete(item.stt)}>Xóa</button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>  
        </div>
        <div>
             {showmodal && (<DeleteMember deleteId={id} member = {member} setMember = {setMember} setShowModal={setShowModal}/>)}
        </div>
        {/* {showmodal && (<DeleteMember deleteId={id} member = {member} setMember = {setMember}/>)} */}
        
    </LayoutAdmin>
  )
}

export default Members
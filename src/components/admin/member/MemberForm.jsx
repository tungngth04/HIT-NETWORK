import React, { useEffect, useState } from 'react'
import LayoutAdmin from '../../../layouts/admin/LayoutAdmin/LayoutAdmin'
import { useNavigate, useParams } from 'react-router-dom'
import data1 from '../../../pages/Admin/data/data'
import { HiH2 } from 'react-icons/hi2'

function MemberForm({modal}) {
  const navigate = useNavigate()
  const {id} = useParams()
  console.log(typeof(id))
  const [data, setData] = useState({
    hoten: "",
    gioitinh: "",
    ngaysinh: null,
    email: "",
    tentaikhoan: "",
    matkhau: ""
  })
  const handleChange = (e) => {
    const {name, value} = e.target
    setData(prev => ({...prev, [name]:value}))
  }
  useEffect(() => {
    if (modal === "edit" && id){
      setData(data1.find((member)=> member.stt === parseInt(id) ))
    }
  })
 
  return (
    <LayoutAdmin>
      {
        modal === "add" ? 
        (<h2>Tạo tài khoản thành viên </h2>) : (<h2>Sửa tài khoản thành viên</h2>)
      }
        <div>
          <div className="label label-name">*Họ và tên</div>
          <div><input type="text" placeholder='Họ và tên' onChange={handleChange} value={data.hoten} name='hoten'/></div>
        </div>
        <div>
          <div className="label label-gender">*Giới tính</div>
          <div><input type="radio" name="gioitinh" id="" checked = {data.gioitinh === "Nam"}  onChange={handleChange}  value="Nam"/>Male</div>
          <div><input type="radio" name="gioitinh" id="" checked = {data.gioitinh === "Nữ"}  onChange={handleChange} value="Nữ" />Female</div>
          <div><input type="radio" name="gioitinh" id="" checked = {data.gioitinh === "Khác"}  onChange={handleChange} value="Khác"/>Other</div>
        </div>
        <div>
          <div className="label label.dob">*Ngày sinh</div>
          <div><input type="date" placeholder='dd/mm/yy'  onChange={handleChange} value={data.ngaysinh} name='ngaysinh' /></div>
        </div>
        <div>
          <div className="label label-email">*Email</div>
          <div><input type="email" placeholder='Email' onChange={handleChange} value={data.email} name="email"/></div>
        </div>
        <div>
          <div className='label label-user'>*Tên tài khoản</div>
          <div><input type="text" placeholder='Tên tài khoản'  onChange={handleChange} value={data.tentaikhoan} name="tentaikhoan"/></div>
        </div>
        <div>
          <div className='label label-pass'>*Mật khẩu</div>
          <div>
            <input type="password" placeholder='***********'  onChange={handleChange} value={data.matkhau} name='matkhau'/>
            <button className='btn-rundome'>Rundome</button>
          </div>
        </div>
        <div>
          <button className='btn-save'>Lưu</button>
          <button className='btn-cancel'>Hủy</button>
        </div>
    </LayoutAdmin>
  )
}

export default MemberForm
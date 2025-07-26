import React, { useEffect } from 'react'
import data1 from '../../../pages/Admin/data/data'
import './Delete.scss'
import { MdCancel } from 'react-icons/md'
import { deleteMembers } from '../../../apis/members.api'
import toast from 'react-hot-toast'
function DeleteMember({ username, deletePopup, setDeletePopup, fetchUsers}) {
  const handleClose = () => {
    setDeletePopup({
      open: false,
      type: '',
    })
  }
  

  const handleDelete = async () => {
  try {
    await deleteMembers(username)
    console.log("Xoas thanh cong");
    toast.success('Xoá thành viên thành công!')
    fetchUsers()
    handleClose()
  } catch (error) {
    console.error(error)
    toast.error('Xóa thành viên thất bại!')
  }
}

  return (
    <div className='delete-member'>
      <div className='overlay'></div>
      <div className='delete-member__container'>
        <div className='close-icon'>
          <MdCancel onClick={handleClose} />
        </div>
        <h2>Xác nhận</h2>
        {deletePopup.type === 'user' ? (
          <p>Bạn có chắc chắn xóa tài khoản này không?</p>
        ) : (
          <p>Bạn có chắc chắn xóa sự kiện này không?</p>
        )}

        <div className='action'>
          <button className='button btn_cancel' onClick={handleClose}>
            Hủy
          </button>
          <button className='button btn_ok' onClick={handleDelete}>
            Ok
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteMember

// src/components/downloadCv/downloadCv.js

import React, { useState } from 'react'
import toast from 'react-hot-toast'
// Import hàm API download
import { dowloadCvAPI } from '../../apis/posts.api'
import './downloadCv.scss'

const DownloadCvModal = ({ postId, onClose, onPostUpdated }) => {
  // Bỏ state cvFile, chỉ giữ lại isLoading
  const [isLoading, setIsLoading] = useState(false)

  // Bỏ hàm handleFileChange

  // SỬA LẠI HOÀN TOÀN HÀM XỬ LÝ
  const handleConfirmDownload = async () => {
    setIsLoading(true)
    try {
      // Nhận toàn bộ phản hồi từ API
      const response = await dowloadCvAPI(postId)
      console.log('Toàn bộ đối tượng response:', response)
      console.log('Toàn bộ headers:', response?.headers)
      console.log('Kiểu dữ liệu của response.data:', typeof response?.data)

      // Lấy tên file từ header
      const disposition = response.headers?.['content-disposition']
      let filename = `CVs-Post-${postId}.zip`
      if (disposition && disposition.indexOf('attachment') !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
        const matches = filenameRegex.exec(disposition)
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '')
        }
      }

      // Tạo URL từ dữ liệu blob trong response.data
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)

      // Kích hoạt tải xuống
      document.body.appendChild(link)
      link.click()

      // Dọn dẹp
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)

      toast.success('Tải xuống thành công!')
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Tải file không thành công.')
      console.error('Download failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='import-cv-modal-overlay' onClick={onClose}>
      <div className='import-cv-modal-content' onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className='close-button'>
          &times;
        </button>

        {/* THAY ĐỔI NỘI DUNG POPUP */}
        <h2>Xác nhận tải xuống</h2>

        {/* Bỏ khu vực input file */}

        <button onClick={handleConfirmDownload} className='import-button' disabled={isLoading}>
          {isLoading ? 'Đang tải...' : 'Tải xuống'}
        </button>
      </div>
    </div>
  )
}

export default DownloadCvModal

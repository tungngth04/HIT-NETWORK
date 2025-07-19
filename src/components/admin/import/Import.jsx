import React, { useState } from 'react'
import './Import.scss'
import { MdCancel } from 'react-icons/md'
function Import({ importPopup, setImportPopup, id, setData }) {
  const handleClose = () => {
    setImportPopup({ open: false, type: '' })
  }
  const [showResult, setShowResult] = useState(false)
  const resultImport = () => {
    setShowResult(true)
  }
  return (
    <div className='import-event'>
      <div className='overlay'></div>
      <div className='import-event__container'>
        <div className='close-icon'>
          <MdCancel onClick={handleClose} />
        </div>
        {importPopup.type === 'event' ? (
          <>
            <h2>Import file danh sách sự kiện</h2>
            <a href='../../../../public/Template_Event.xlsx' download className='import-file'>
              Click vào đây để lấy template
            </a>
          </>
        ) : (
          <>
            <h2>Import file danh sách user</h2>
            <a href='../../../../public/Template_User.xlsx' download className='import-file'>
              Click vào đây để lấy template
            </a>
          </>
        )}

        <div className='action'>
          <button className='button btn_import' onClick={resultImport}>
            Import
          </button>
        </div>
        {showResult && (
          <div className='notification-import'>
            <p>Thành công: </p>
            <p>Thất bại: </p>
            <p>Tổng: </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Import

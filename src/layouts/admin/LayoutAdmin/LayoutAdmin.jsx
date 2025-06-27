import React from 'react'
import './LayoutAdmin.scss'
import Sidebar from '../Sidebar/Sidebar'
import HeaderAdmin from '../../../common/admin/HeaderAdmin'

function LayoutAdmin({children}) {
  return (
    <div className='admin__container'>
        <div className='admin__content'>
            <div className='admin__sidebar'>
                <Sidebar/>
            </div>
            <div className='admin__right'>
                <HeaderAdmin/>
                {children}
            </div>
        </div>
    </div>
  )
}

export default LayoutAdmin
import React from 'react'
import "./HeaderAdmin.scss"
import LogoReact from "../../assets/react.svg"
function HeaderAdmin() {
  return (
    <div className="admin__header">
        <p className="admin__header--name">Hello, Phuong</p>
        <div className="admin__header--avatar">
          <img src={LogoReact} alt="" />
            <p>Phuong</p>
        </div>
    </div>
  )
}

export default HeaderAdmin
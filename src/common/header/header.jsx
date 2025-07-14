import React from 'react'
import './header.scss'
import logo from '../../assets/images/logo.png'
import avatar from '../../assets/images/hinh-anime-2.jpg'
import { Search } from 'react-bootstrap-icons'
import { Bell } from 'react-bootstrap-icons'
import { Envelope } from 'react-bootstrap-icons'
import { CaretDown } from 'react-bootstrap-icons'
const Header = () => {
  return (
    <header className='main-header'>
      <div className='header-left'>
        <div className='logo'>
          <img src={logo} alt='' />
        </div>
      </div>
      <nav className='main-nav'>
        <ul>
          <li>
            <a href='/home' className='active'>
              Home
            </a>
          </li>
          <li>
            <a href='#'>My posts</a>
          </li>
          <li>
            <a href='#'>Events</a>
          </li>
          <li>
            <a href='#'>Recruitment</a>
          </li>
        </ul>
      </nav>
      <div className='header-right'>
        <div className='search-icon'>
          <Search size={22} />
        </div>
        <div className='notification-icon'>
          <Envelope size={22} />
          <span className='badge'></span>
        </div>
        <div className='messages-icon'>
          <Bell size={22} />
          <span className='badge'></span>
        </div>
        <div className='profile-dropdown'>
          <div className='profile-avatar'>
            <img src={avatar} />
          </div>
          <div className='caret-down-container'>
            <div className='caret-down'>
              <CaretDown size={20} />
              <div className='profile-menu'>
                <ul>
                  <li>Thông tin cá nhân</li>
                  <li>Chỉnh sửa thông tin cá nhân</li>
                  <li>Đăng xuất</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

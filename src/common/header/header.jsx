import './header.scss'
import logo from '../../assets/images/logo.png'
import avatar from '../../assets/images/hinh-anime-2.jpg'
import { Search } from 'react-bootstrap-icons'
import { Bell } from 'react-bootstrap-icons'
import { Envelope } from 'react-bootstrap-icons'
import { CaretDown } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
const Header = () => {
  const navigate = useNavigate()
  const authen = useAuth()
  const handleLogout = () => {
    authen.clearUser()
    navigate('/login')
    toast.success('Đăng xuất thành công')
  }
  const handleInfor = () => {
    navigate('/home/profile')
  }
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
            <NavLink to='/home' className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/my-posts' className={({ isActive }) => (isActive ? 'active' : '')}>
              My posts
            </NavLink>
          </li>
          <li>
            <NavLink to='/events' className={({ isActive }) => (isActive ? 'active' : '')}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to='/recruitment' className={({ isActive }) => (isActive ? 'active' : '')}>
              Recruitment
            </NavLink>
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
            <div className='profile-menu'>
              <ul>
                <li onClick={handleInfor}>Thông tin cá nhân</li>
                <li onClick={handleLogout}>Đăng xuất</li>
              </ul>
            </div>
          </div>
          <div className='caret-down-container'>
            <div className='caret-down'>
              <CaretDown size={20} />
              <div className='profile-menu'></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

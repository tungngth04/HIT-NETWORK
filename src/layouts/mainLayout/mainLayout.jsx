import React from 'react'
import Header from '../../common/header/header'
import Footer from '../../common/footer/footer'
import './MainLayout.scss'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='main-app-layout'>
      <Header />
      <main className='layout-content'>
        <div className='main-app-container'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout

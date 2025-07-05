import React from 'react'
import Header from '../../common/header/header'
import Footer from '../../common/footer/footer'
import './MainLayout.scss'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='main-app-layout'>
      <Header />
      <div className='main-app-container'></div>
      <main className='layout-content'></main>
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout

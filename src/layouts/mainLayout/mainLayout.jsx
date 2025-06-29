import React from 'react'
import Header from '../header/header'
import Footer from '../footer/footer'
import './MainLayout.scss'

const MainLayout = ({ children }) => {
  return (
    <div className='main-app-layout'>
      <Header />
      <div className='main-app-container'></div>
      <main className='layout-content'>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout

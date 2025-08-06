import React, { useState, useEffect, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../../common/header/header'
import Footer from '../../common/footer/footer'
import SidebarWidget from '../../components/sidebarWidget/sidebarWidget'
import { getPostsApi, getEventApi, getJobApi } from '../../apis/posts.api'
import './mainLayout.scss'
import toast from 'react-hot-toast'

const MainLayout = () => {
  const [recruitmentPosts, setRecruitmentPosts] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const location = useLocation()
  const isProfilePage = location.pathname === '/profile'
  const fetchSidebarData = useCallback(async () => {
    try {
      const jobResponse = await getJobApi({ page: 0, size: 3 })
      setRecruitmentPosts(jobResponse.data.content || [])
      const eventResponse = await getEventApi({ page: 0, size: 3 })
      setUpcomingEvents(eventResponse.data.content || [])
      console.log('job', jobResponse)
      console.log('event', eventResponse)
    } catch (error) {
      toast.error('Không thể tải dữ liệu cho sidebar:', error)
    }
  }, [])

  useEffect(() => {
    if (!isProfilePage) {
      fetchSidebarData()
    }
  }, [isProfilePage, fetchSidebarData])

  return (
    <div className='main-app-layout'>
      <Header />
      <div className={`main-layout-container ${isProfilePage ? 'no-sidebar' : ''}`}>
        <main className='layout-content'>
          <Outlet />
        </main>
        {!isProfilePage && (
          <aside className='layout-sidebar'>
            <SidebarWidget title='Recruitment Posts' items={recruitmentPosts} type='JOB' />
            <SidebarWidget title='Upcoming Events' items={upcomingEvents} type='EVENT' />
          </aside>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout

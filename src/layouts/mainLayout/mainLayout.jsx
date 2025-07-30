import React, { useState, useEffect, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../common/header/header' // Giữ nguyên đường dẫn của bạn
import Footer from '../../common/footer/footer' // Giữ nguyên đường dẫn của bạn
import SidebarWidget from '../../components/SidebarWidget/sidebarWidget'
import { getPostsApi, getEventApi, getJobApi } from '../../apis/posts.api'
import './MainLayout.scss' // Giữ nguyên đường dẫn của bạn

const MainLayout = () => {
  // --- Logic để fetch dữ liệu cho Sidebar ---
  const [recruitmentPosts, setRecruitmentPosts] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])

  const fetchSidebarData = useCallback(async () => {
    try {
      const jobResponse = await getPostsApi({ page: 0, limit: 3 })
      setRecruitmentPosts(jobResponse.data.data.content || [])
      const eventResponse = await getPostsApi({ page: 0, limit: 3 })
      setUpcomingEvents(eventResponse.data.data.content || [])
    } catch (error) {
      console.error('Không thể tải dữ liệu cho sidebar:', error)
    }
  }, [])

  useEffect(() => {
    fetchSidebarData()
  }, [fetchSidebarData])
  console.log(recruitmentPosts)
  console.log(upcomingEvents)

  return (
    <div className='main-app-layout'>
      <Header />
      <div className='main-layout-container'>
        <main className='layout-content'>
          <Outlet />
        </main>
        <aside className='layout-sidebar'>
          <SidebarWidget title='Recruitment Posts' items={recruitmentPosts} type='JOB' />
          <SidebarWidget title='Upcoming Events' items={upcomingEvents} type='EVENT' />
        </aside>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout

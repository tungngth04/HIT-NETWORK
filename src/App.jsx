import LoginPage from './pages/LoginPage/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import MainLayout from './layouts/mainLayout/mainLayout'
import UserHomePage from './pages/userHomePage/userHomePage'
import { useRoutes, Navigate, Routes } from 'react-router-dom'
import './App.scss'
import Dashboard from './pages/Admin/dashboard/Dashboard'
import MemberForm from './components/admin/member/MemberForm'
import Members from './pages/Admin/members/Members'
import Events from './pages/Admin/events/Events'
import EventForm from './components/admin/event/EventForm'
import LayoutAdmin from './layouts/LayoutAdmin/LayoutAdmin'
function App() {
  const elements = useRoutes([
    {
      path: '/admin',
      element: <LayoutAdmin />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'members',
          element: <Members />,
        },
        {
          path: 'members/create',
          element: <MemberForm modal='add' />,
        },
        {
          path: 'members/edit/:id',
          element: <MemberForm modal='edit' />,
        },
        {
          path: 'events',
          element: <Events />,
        },
        {
          path: 'events/create',
          element: <EventForm modal='add' />,
        },
        {
          path: 'events/edit/:id',
          element: <EventForm modal='edit' />,
        },
      ],
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/forgotpassword',
      element: <ForgotPasswordPage />,
    },
    {
      path: '/home',
      element: <MainLayout />,
      children: [
        {
          path: '',

          element: <UserHomePage />,
          index: true,
        },
      ],
    },
  ])
  return <>{elements}</>
}
export default App

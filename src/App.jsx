import LoginPage from './pages/LoginPage/LoginPage'
import './App.scss'
import { Routes, useRoutes } from 'react-router-dom'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import MainLayout from './layouts/mainLayout/mainLayout'
import UserHomePage from './pages/userHomePage/userHomePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

function App() {
  let elements = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/loginPage',
      element: <LoginPage />,
    },
    {
      path: '/forgotpassword',
      element: <ForgotPasswordPage />,
    },
    {
      path: '/user',
      element: <MainLayout />,
      children: [
        {
          path: 'home',
          element: <UserHomePage />,
          index: true,
        },
        {
          path: 'profile',
          element: <ProfilePage/>,
        }
      ],
    },
  ])

  return elements
}

export default App

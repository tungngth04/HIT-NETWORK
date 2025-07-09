import LoginPage from './pages/LoginPage/LoginPage'
import './App.scss'
import { Routes, useRoutes } from 'react-router-dom'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'
import MainLayout from './layouts/mainLayout/mainLayout'
import UserHomePage from './pages/userHomePage/userHomePage'

function App() {
  let elements = useRoutes([
    {
      path: '/loginPage',
      element: <LoginPage />,
    },
    {
      path: '/forgotpassword',
      element: <ForgotPasswordPage />,
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/home',
          element: <UserHomePage />,
          index: true,
        },
      ],
    },
  ])

  return elements
}

export default App

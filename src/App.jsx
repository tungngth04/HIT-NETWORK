import LoginPage from './pages/LoginPage/LoginPage'
import './App.scss'
import { Routes, useRoutes } from 'react-router-dom'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'

function App() {
  let elements = useRoutes([
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
  ])

  return elements
}

export default App

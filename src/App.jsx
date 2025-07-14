import { useRoutes, Navigate,  Routes } from "react-router-dom";
import "./App.scss";
import Dashboard from "./pages/Admin/dashboard/Dashboard";
import MemberForm from "./components/admin/member/MemberForm";
import Members from "./pages/Admin/members/Members";
import LayoutAdmin from "./layouts/admin/LayoutAdmin/LayoutAdmin";
import LoginPage from './pages/LoginPage/LoginPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage'

function App() {
  const elements = useRoutes([
    {
      path: "/admin",
      element: <LayoutAdmin/>,
      children: [
        {
          path: "dashboard",
          element: <Dashboard/>
        },
        {
          path: "members",
          element: <Members/>,  
        },
        {
          path: "members/create",
          element: <MemberForm modal="add"/>
        },
        {
          path: "members/edit/:id",
          element: <MemberForm modal="edit"/>
        },
      ]
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
  ])
  return (
    <>
      {elements}
    </>
  );
}
export default App

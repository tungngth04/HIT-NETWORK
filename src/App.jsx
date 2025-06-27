import { useRoutes, Navigate } from "react-router-dom";
import "./App.scss";
import Dashboard from "./pages/Admin/dashboard/Dashboard";
import Members from "./pages/Admin/Members/Members";
import MemberForm from "./components/admin/member/MemberForm";


function App() {
  const elements = useRoutes([
    {
      path: "/",
      element: <Navigate to="/admin/dashboard" />
    },
    {
      path: "/admin/dashboard",
      element: <Dashboard/>
    },
    {
      path: "/admin/members",
      element: <Members/>
    },
    {
      path: "/admin/members/create",
      element: <MemberForm modal="add"/>
    },
    {
      path: "/admin/members/edit/:id",
      element: <MemberForm modal="edit"/>
    }

  ])
  return (
    <>
      {elements}
      {/* <DeleteMember/> */}
    </>
  );
}

export default App;

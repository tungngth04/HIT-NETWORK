import { useRoutes, Navigate } from "react-router-dom";
import "./App.scss";
import Dashboard from "./pages/Admin/dashboard/Dashboard";
import MemberForm from "./components/admin/member/MemberForm";
import Members from "./pages/Admin/members/Members";
import LayoutAdmin from "./layouts/admin/LayoutAdmin/LayoutAdmin";


function App() {
  const elements = useRoutes([
    {
      path: "/",
      element: <Navigate to="/admin/dashboard" />
    },
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
    }
    

  ])
  return (
    <>
      {elements}
    </>
  );
}

export default App;

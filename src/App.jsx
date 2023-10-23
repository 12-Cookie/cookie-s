import "./App.css";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import BottomNav from "./components/common/BottomNav/BottomNav";
import Login from "./pages/Login/Login";
import Login_A from "./pages/Login/admin/login/Login_A";
import InfoForm_A from "./pages/Login/admin/infoForm/InfoForm_A";
import InfoForm_S from "./pages/Login/staff/infoForm/InfoForm_S";
import SubmitCode from "./pages/Login/staff/SubmitCode/SubmitCode";
import Dashboard_S from "./pages/Dashboard/staff/Dashboard_S";
import Dashboard_A from "./pages/Dashboard/admin/Dashboard_A";
import Schedule_S from "./pages/Schedule/staff/schedule/Schedule_S";
import Schedule_A from "./pages/Schedule/admin/schedule/Schedule_A";
import ManageSchedule_A from "./pages/Schedule/admin/manageSchedule/ManageSchedule_A";
import ManageSchedule_S from "./pages/Schedule/staff/manageSchedule/ManageSchedule_S";
import AssignRole from "./pages/Schedule/admin/assignRole/AssignRole";
import AddSchedule from "./pages/Schedule/admin/addSchedule/AddSchedule";
import Salary_S from "./pages/Salary/Salary_S";
import Workers from "./pages/Workers/Workers";
import ViewStaff from "./pages/UserInfo/ViewStaff/ViewStaff";
import StaffInfo from "./pages/UserInfo/StaffInfo/StaffInfo";
import Notice_S from "./pages/Notice/staff/Notice_S";
import Notice_A from "./pages/Notice/admin/Notice_A";
import AddNotice from "./pages/Notice/admin/AddNotice/AddNotice";
import Info_S from "./pages/Info/staff/Info_S";
import Info_A from "./pages/Info/admin/Info_A";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLogin) navigate("/");
    else if (isLogin && location.pathname === "/") navigate("/dashboard");
  }, []);

  return (
    <>
      <section className="main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login/admin" element={<Login_A />} />
          <Route path="/info/admin" element={<InfoForm_A />} />
          <Route path="/info/staff" element={<InfoForm_S />} />
          <Route path="/info/code" element={<SubmitCode />} />
          <Route
            path="/dashboard"
            element={!isAdmin ? <Dashboard_S /> : <Dashboard_A />}
          />
          <Route
            path="/schedule"
            element={!isAdmin ? <Schedule_S /> : <Schedule_A />}
          />
          <Route
            path="/schedule/manage"
            element={!isAdmin ? <ManageSchedule_S /> : <ManageSchedule_A />}
          />
          <Route
            path="/schedule/assign"
            element={!isAdmin ? <NotFound /> : <AssignRole />}
          />
          <Route
            path="/schedule/add"
            element={!isAdmin ? <NotFound /> : <AddSchedule />}
          />
          <Route
            path="/salary"
            element={!isAdmin ? <Salary_S /> : <NotFound />}
          />
          <Route
            path="/workers"
            element={!isAdmin ? <NotFound /> : <Workers />}
          />
          <Route
            path="/staff"
            element={!isAdmin ? <NotFound /> : <ViewStaff />}
          />
          <Route
            path="/staff/info"
            element={!isAdmin ? <NotFound /> : <StaffInfo />}
          />
          <Route
            path="/notice"
            element={!isAdmin ? <Notice_S /> : <Notice_A />}
          />
          <Route
            path="/notice/add"
            element={!isAdmin ? <NotFound /> : <AddNotice />}
          />
          <Route path="/info" element={!isAdmin ? <Info_S /> : <Info_A />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </section>

      <section className="nav">
        {isLogin ? <BottomNav isAdmin={isAdmin} /> : null}
      </section>
    </>
  );
}

export default App;

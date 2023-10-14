import { useNavigate } from "react-router-dom";
import * as style from "./BottomNav.style";
import DashBoard_i from "../../icons/DashBoard_i";
import Schedule_i from "../../icons/Schedule_i";
import Salary_i from "../../icons/Salary_i";
import Notice_i from "../../icons/Notice_i";
import Info_i from "../../icons/Info_i";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <style.BottomNavWrap>
      <style.BottomNavLink
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        <style.Icon>
          <DashBoard_i />
        </style.Icon>
        <div>대시보드</div>
      </style.BottomNavLink>
      <style.BottomNavLink
        onClick={() => {
          navigate("/schedule");
        }}
      >
        <style.Icon>
          <Schedule_i />
        </style.Icon>
        <div>스케줄</div>
      </style.BottomNavLink>
      <style.BottomNavLink
        onClick={() => {
          navigate("/salary");
        }}
      >
        <style.Icon>
          <Salary_i />
        </style.Icon>
        <div>급여</div>
      </style.BottomNavLink>
      <style.BottomNavLink
        onClick={() => {
          navigate("/notice");
        }}
      >
        <style.Icon>
          <Notice_i />
        </style.Icon>
        <div>공지사항</div>
      </style.BottomNavLink>
      <style.BottomNavLink
        onClick={() => {
          navigate("/info");
        }}
      >
        <style.Icon>
          <Info_i />
        </style.Icon>
        <div>내정보</div>
      </style.BottomNavLink>
    </style.BottomNavWrap>
  );
};

export default BottomNav;

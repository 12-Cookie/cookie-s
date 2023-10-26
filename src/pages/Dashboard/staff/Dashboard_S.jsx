import * as style from "./Dashboard_S.style";
import { useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../firebase/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import Notice from "../admin/notice/Notice";
import { useFireFetch } from "../../../hooks/useFireFetch";
import ScheduleItem from "../../../components/common/ScheduleItem/ScheduleItem";
import Chart from "./chart/Chart";

const initailUserdata = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : {};

const Dashboard_S = () => {
  const dummyUserData = JSON.parse(localStorage.getItem("user"));
  const dummyUserId = dummyUserData.id;

  const [userData, setUserData] = useState(initailUserdata);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const fetch = useFireFetch();
  const noticeData = fetch.getData("notice");
  const scheduleData = fetch.getData("schedule");
  const bookedShiftsData = fetch.getData("bookedShifts");
  const filteredScheduleData = [...scheduleData].slice(0, 3);
  const bookingShiftsData = fetch.getData(
    "bookingShifts",
    "userId",
    dummyUserId,
  );

  const matchingData = [];

  const fetchData = () => {
    for (const secondItem of bookingShiftsData) {
      const scheduleId = secondItem.scheduleId;

      const matchingFirstItem = scheduleData.find(
        (firstItem) => firstItem.id === scheduleId,
      );

      if (matchingFirstItem) {
        const newObject = {
          ...matchingFirstItem,
        };

        matchingData.push(newObject);
      }
    }
  };

  fetchData();

  const auth = getAuth(app);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        localStorage.removeItem("userData");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       console.log(user);
  //       setUserData(user);
  //       navigate("/");
  //     } else if (user && pathname === "/") {
  //       navigate("/dashboard");
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [auth, navigate]);

  return (
    <style.DashboardWrap>
      <Notice noticeData={noticeData} />
      <h1>내 스케줄</h1>
      <ScheduleItem
        scheduleLists={filteredScheduleData}
        bookedShiftsData={bookedShiftsData}
      />
      <Chart matchingData={matchingData} />
      <button onClick={handleLogOut}>로그아웃</button>
    </style.DashboardWrap>
  );
};

export default Dashboard_S;

import StaffManagement from "../../../components/StaffManagement/StaffManagement";
import ScheduleItem from "../../../components/common/ScheduleItem/ScheduleItem";
import { useFireFetch } from "../../../hooks/useFireFetch";
import * as style from "./Dashboard_A.style";
import Notice from "./notice/Notice";
import { useEffect, useState } from "react";

const Dashboard_A = () => {
  const fetch = useFireFetch();
  const scheduleData = fetch.getData("schedule");
  const userData = fetch.getData("users", "isAdmin", false);
  const noticeData = fetch.getData("notice");
  const bookedShiftsData = fetch.getData("bookedShifts");
  const filteredScheduleData = [...scheduleData].slice(0, 3);
  const [fetchNoticeData, setFetchNoticeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const getNoticeData = await fetch.get("notice", "companyId", companyId);
      setFetchNoticeData(getNoticeData);
    };
  }, []);

  return (
    <style.DashboardWrap>
      <Notice fetchNoticeData={fetchNoticeData} />
      <h1>스케줄 관리</h1>
      <ScheduleItem
        scheduleLists={filteredScheduleData}
        bookedShiftsData={bookedShiftsData}
      />
      <StaffManagement userData={userData} />
    </style.DashboardWrap>
  );
};

export default Dashboard_A;

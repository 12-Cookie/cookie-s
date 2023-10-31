import StaffManagement from "../../../components/StaffManagement/StaffManagement";
import ScheduleItem from "../../../components/common/ScheduleItem/ScheduleItem";
import { useFireFetch } from "../../../hooks/useFireFetch";
import useUserStore from "../../../store/user/useUserStore";
import * as style from "./Dashboard_A.style";
import Notice from "./notice/Notice";
import { useEffect, useState } from "react";

const Dashboard_A = () => {
  const { id, companyId } = useUserStore((state) => state.userData);
  const fetch = useFireFetch();
  const userData = fetch.getData("users", "isAdmin", false);
  const bookedShiftsData = fetch.getData("bookedShifts");
  const [fetchNoticeData, setFetchNoticeData] = useState([]);
  const [fetchScheduleData, setFetchScheduleData] = useState([]);
  const filteredScheduleData = [...fetchScheduleData].slice(0, 3);

  useEffect(() => {
    const fetchData = async () => {
      const getNoticeData = await fetch.get("notice", "companyId", companyId);
      const getScheduleData = await fetch.get(
        "schedule",
        "companyId",
        companyId,
      );

      setFetchNoticeData(getNoticeData);
      setFetchScheduleData(getScheduleData);
    };

    fetchData();
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

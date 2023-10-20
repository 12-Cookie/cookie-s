import StaffManagement from "../../../components/StaffManagement/StaffManagement";
import ScheduleItem from "../../../components/common/ScheduleItem/ScheduleItem";
import { useFireFetch } from "../../../hooks/useFireFetch";
import * as style from "./Dashboard_A.style";

const Dashboard_A = () => {
  const fetch = useFireFetch();
  const scheduleData = fetch.getData("schedule");
  const userData = fetch.getData("users", "isAdmin", false);
  const bookedShiftsData = fetch.getData("bookedShifts");

  return (
    <style.DashboardWrap>
      <h1>스케줄 관리</h1>
      <ScheduleItem
        scheduleData={scheduleData}
        bookedShiftsData={bookedShiftsData}
      />
      <StaffManagement userData={userData} />
    </style.DashboardWrap>
  );
};

export default Dashboard_A;

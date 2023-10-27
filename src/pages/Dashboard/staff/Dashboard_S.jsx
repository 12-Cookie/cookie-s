import * as style from "./Dashboard_S.style";
import Notice from "../admin/notice/Notice";
import { useFireFetch } from "../../../hooks/useFireFetch";
import ScheduleItem from "../../../components/common/ScheduleItem/ScheduleItem";

const Dashboard_S = () => {
  const fetch = useFireFetch();
  const noticeData = fetch.getData("notice");
  const scheduleData = fetch.getData("schedule");
  const bookedShiftsData = fetch.getData("bookedShifts");
  const filteredScheduleData = [...scheduleData].slice(0, 3);

  return (
    <style.DashboardWrap>
      <Notice noticeData={noticeData} />
      <h1>내 스케줄</h1>
      <ScheduleItem
        scheduleData={filteredScheduleData}
        bookedShiftsData={bookedShiftsData}
      />
    </style.DashboardWrap>
  );
};

export default Dashboard_S;

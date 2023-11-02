import * as style from "./Dashboard_S.style";
import Notice from "../admin/notice/Notice";
import { useFireFetch } from "../../../hooks/useFireFetch";
import ScheduleItem from "../../../components/common/ScheduleItem/ScheduleItem";
import Chart from "./chart/Chart";
import { useEffect, useState } from "react";
import useUserStore from "../../../store/user/useUserStore";
import Loader from "../../../components/common/loader/Loader";

import NoData from "./NoData";

const Dashboard_S = () => {
  const { id, companyId } = useUserStore((state) => state.userData);
  const fetch = useFireFetch();
  const [fetchNoticeData, setFetchNoticeData] = useState([]);
  const [fetchBookedShifts, setFetchBookedShifts] = useState([]);
  const [fetchScheduleData, setFetchScheduleData] = useState([]);
  const [confirmedData, setConfirmedData] = useState([]);
  const [matchedData, setMatchedData] = useState([]);
  const [sliceMatchData, setSliceMatchData] = useState([]);
  const matchingData = [];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const getNoticeData = await fetch.get("notice", "companyId", companyId);
      const getBookedShiftsData = await fetch.get("bookedShifts", "userId", id);
      const getScheduleData = await fetch.get(
        "schedule",
        "companyId",
        companyId,
      );

      const matchData = [];

      getScheduleData.forEach((scheduleData) => {
        const matchingItem = getBookedShiftsData.find(
          (bookedShiftsData) => scheduleData.id === bookedShiftsData.scheduleId,
        );

        if (matchingItem) {
          matchData.push(scheduleData);
        }
      });

      
      setFetchNoticeData(getNoticeData);
      setFetchScheduleData(getScheduleData);
      setMatchedData(matchData);
      
      const sortedSliceMatchData = matchData.sort((a, b) => b.id.localeCompare(a.id)).slice(0 ,3);
      const sortedFetchBookedShifts = getBookedShiftsData.sort((a, b) => b.scheduleId.localeCompare(a.scheduleId)).slice(0, 3);
      
      setSliceMatchData(sortedSliceMatchData);
      setFetchBookedShifts(sortedFetchBookedShifts);

      const dataArr = []; 
      const confirmDataArr = [];

      for (const item of getBookedShiftsData) {
        if (item.role) {
          dataArr.push(item);
        }
      }

      getScheduleData.forEach((scheduleData) => {
        const matchingItem = dataArr.find(
          (item) => scheduleData.id === item.scheduleId,
        );

        if (matchingItem && scheduleData.status === '모집완료') {
          confirmDataArr.push(scheduleData);
        }
      });

      setConfirmedData(confirmDataArr);
      console.log(confirmedData)
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <style.DashboardWrap>
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <Notice fetchNoticeData={fetchNoticeData} />
          <style.Title>내 스케줄</style.Title>
          {sliceMatchData.length === 0 ? (
            <NoData />
          ) : (
            <ScheduleItem
              scheduleLists={sliceMatchData}
              setFetchScheduleData={setFetchScheduleData}
              fetchBookedShifts={fetchBookedShifts}
            />
          )}
          <style.Title>급여 차트</style.Title>
          <Chart matchingData={confirmedData} />
        </>
      )}
    </style.DashboardWrap>
  );
};

export default Dashboard_S;

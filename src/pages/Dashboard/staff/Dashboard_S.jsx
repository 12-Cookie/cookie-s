import * as style from "./Dashboard_S.style";
import Notice from "../admin/notice/Notice";
import { useFireFetch } from "../../../hooks/useFireFetch";
import ScheduleItem from "../../../components/common/ScheduleItem/ScheduleItem";
import Chart from "./chart/chart";
import { useEffect, useState } from "react";
import useUserStore from "../../../store/user/useUserStore";
import Loader from "../../../components/common/loader/Loader";

const Dashboard_S = () => {
  const { id, companyId } = useUserStore((state) => state.userData);
  const fetch = useFireFetch();
  const bookingShiftsData = fetch.getData("bookingShifts", "userId");
  const [fetchNoticeData, setFetchNoticeData] = useState([]);
  const [fetchBookedShifts, setFetchBookedShifts] = useState([]);
  const [fetchScheduleData, setFetchScheduleData] = useState([]);
  const [confirmedData, setConfirmedData] = useState([]);
  const [matchedData, setMatchedData] = useState([]);
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
      setFetchBookedShifts(getBookedShiftsData);
      setFetchScheduleData(getScheduleData);
      setMatchedData(matchData.slice(0, 3));

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

        if (matchingItem) {
          confirmDataArr.push(scheduleData);
        }
      });

      setConfirmedData(confirmDataArr);

      for (const secondItem of bookingShiftsData) {
        const scheduleId = secondItem.scheduleId;

        const matchingFirstItem = getScheduleData.find(
          (firstItem) => firstItem.id === scheduleId,
        );

        if (matchingFirstItem) {
          const newObject = {
            ...matchingFirstItem,
          };

          matchingData.push(newObject);
        }
      }
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
          <h1>내 스케줄</h1>
          <ScheduleItem
            scheduleLists={matchedData}
            setFetchScheduleData={setFetchScheduleData}
          />
          <Chart matchingData={confirmedData} />
        </>
      )}
    </style.DashboardWrap>
  );
};

export default Dashboard_S;

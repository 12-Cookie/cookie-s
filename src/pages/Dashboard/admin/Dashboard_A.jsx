import StaffManagement from "../../../components/StaffManagement/StaffManagement";
import ScheduleItem from "../../../components/common/ScheduleItem/ScheduleItem";
import Loader from "../../../components/common/loader/Loader";
import { useFireFetch } from "../../../hooks/useFireFetch";
import useUserStore from "../../../store/user/useUserStore";
import * as style from "./Dashboard_A.style";
import Notice from "./notice/Notice";
import { useEffect, useState } from "react";

const Dashboard_A = () => {
  const { companyId } = useUserStore((state) => state.userData);
  const fetch = useFireFetch();
  const [fetchNoticeData, setFetchNoticeData] = useState([]);
  const [fetchScheduleData, setFetchScheduleData] = useState([]);
  const [fetchUserData, setFetchUserData] = useState([]);
  const filteredScheduleData = [...fetchScheduleData].slice(0, 3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const getNoticeData = await fetch.get("notice", "companyId", companyId);
      const getUserData = await fetch.get("users", "companyId", companyId);
      const getScheduleData = await fetch.get(
        "schedule",
        "companyId",
        companyId,
      );

      setFetchNoticeData(getNoticeData);
      setFetchScheduleData(getScheduleData);
      setFetchUserData(getUserData);

      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <style.DashboardWrap>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Notice fetchNoticeData={fetchNoticeData} />
          <style.Title>스케줄 관리</style.Title>
          <ScheduleItem
            scheduleLists={filteredScheduleData}
            setScheduleLists={setFetchScheduleData}
          />
          <style.StaffManagementWrap>
            <StaffManagement userData={fetchUserData} />
          </style.StaffManagementWrap>
        </>
      )}
    </style.DashboardWrap>
  );
};

export default Dashboard_A;

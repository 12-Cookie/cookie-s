import * as style from "./Dashboard_S.style";
import Notice from "../admin/notice/Notice";
import { useFireFetch } from "../../../hooks/useFireFetch";
import ScheduleItem from "../../../components/common/ScheduleItem/ScheduleItem";
import Chart from "./chart/Chart";

const Dashboard_S = () => {
<<<<<<< HEAD
  const dummyUserData = JSON.parse(localStorage.getItem("user"));
  const dummyUserId = dummyUserData.id;

  const [userData, setUserData] = useState(initailUserdata);

  const navigate = useNavigate();
  const { pathname } = useLocation();

=======
>>>>>>> e2bfe6c9dc346a123b2047d1fc2a52273db6f930
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

  return (
    <style.DashboardWrap>
      <Notice noticeData={noticeData} />
      <h1>내 스케줄</h1>
      <ScheduleItem
        scheduleLists={filteredScheduleData}
        bookedShiftsData={bookedShiftsData}
      />
    </style.DashboardWrap>
  );
};

export default Dashboard_S;

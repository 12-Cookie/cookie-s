import { useState } from "react";
import { Badge } from "@chakra-ui/react";
import ScheduleRoleItem from "../ScheduleRoleItem/ScheduleRoleItem";
import ScheduleUtilItem from "../ScheduleUtilItem/ScheduleUtilItem";
import PropTypes from "prop-types";

const ScheduleItem = ({ scheduleData, bookedShiftsData }) => {
  const [isAdmin, setIsAdmin] = useState(true);

  const handleClick = () => {
    console.log(bookedShiftsData.length);
  };

  const getDayOfWeekFromDate = (date) => {
    const { year, month, day } = date;
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const weekOfDay = new Date(`${year}-${month}-${day}`);
    const getDate = weekOfDay.getDay();
    const getDay = week[getDate];

    return getDay;
  };

  const renderStatusToAdmin = (scheduleData) => {
    const { status, numWorkers } = scheduleData;
    switch (status) {
      case "모집중":
        return (
          <Badge>
            모집중 ({bookedShiftsData.length}/{numWorkers})
          </Badge>
        );
      case "모집완료":
        return <Badge colorScheme="green">모집완료</Badge>;
      case "모집취소":
        return <Badge colorScheme="red">모집취소</Badge>;
      default:
        console.log("일치하는 양식이 없습니다.");
    }
  };

  const renderStatusToStaff = (scheduleData) => {
    const { status } = scheduleData;
    switch (status) {
      case "모집중":
        return <Badge>대기중</Badge>;
      case "모집완료":
        return <Badge colorScheme="green">확정</Badge>;
      case "모집취소":
        return <Badge colorScheme="red">취소됨</Badge>;
      default:
        console.log("일치하는 양식이 없습니다.");
    }
  };

  return (
    <>
      {scheduleData.map((scheduleData) => (
        <div className="time" key={scheduleData.id}>
          <span onClick={handleClick}>
            {`${scheduleData.date.month}월 ${scheduleData.date.day}일`}
          </span>
          <span>({getDayOfWeekFromDate(scheduleData.date)})</span>
          <span>{`${scheduleData.time.start} ~ ${scheduleData.time.end}`}</span>
          <div>
            {isAdmin
              ? renderStatusToAdmin(scheduleData)
              : renderStatusToStaff(scheduleData)}
          </div>
          <div>
            {isAdmin ? "" : <ScheduleRoleItem />}
            {isAdmin ? <ScheduleUtilItem scheduleData={scheduleData} /> : ""}
          </div>
        </div>
      ))}
    </>
  );
};

export default ScheduleItem;

ScheduleItem.propTypes = {
  scheduleData: PropTypes.array,
  bookedShiftsData: PropTypes.array,
};

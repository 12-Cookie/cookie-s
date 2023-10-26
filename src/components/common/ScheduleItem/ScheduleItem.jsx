import { useState } from "react";
import { Badge } from "@chakra-ui/react";
import ScheduleRoleItem from "../ScheduleRoleItem/ScheduleRoleItem";
import ScheduleUtilItem from "../ScheduleUtilItem/ScheduleUtilItem";
import PropTypes from "prop-types";
import * as style from "./ScheduleItem.style";

const ScheduleItem = ({ scheduleLists, setScheduleLists }) => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [userLength, setUserLength] = useState(
    Array(scheduleLists.length).fill(0),
  );

  const getDayOfWeekFromDate = (date) => {
    const { year, month, day } = date;
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const weekOfDay = new Date(`${year}-${month}-${day}`);
    const getDate = weekOfDay.getDay();
    const getDay = week[getDate];

    return getDay;
  };

  const renderStatusToAdmin = (scheduleData, index) => {
    const { status, numWorkers } = scheduleData;
    switch (status) {
      case "모집중":
        return (
          <Badge>
            모집중 ({userLength[index]}/{numWorkers})
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
    <style.ScheduleItemWrap>
      {scheduleLists.map((scheduleData, index) => (
        <style.ScheduleItem key={scheduleData.id}>
          <style.ScheduleInfo>
            <style.ScheduleDate>
              {`${scheduleData.date.month}월`}
              {`${scheduleData.date.day}일`}
              <style.ScheduleDay>
                ({getDayOfWeekFromDate(scheduleData.date)})
              </style.ScheduleDay>
            </style.ScheduleDate>
            <style.ScheduleTime>
              {`${scheduleData.time.start} ~ ${scheduleData.time.end}`}
            </style.ScheduleTime>
            <style.ScheduleStatus>
              <div>
                {isAdmin
                  ? renderStatusToAdmin(scheduleData, index)
                  : renderStatusToStaff(scheduleData)}
              </div>
            </style.ScheduleStatus>
          </style.ScheduleInfo>
          {isAdmin ? "" : <ScheduleRoleItem />}
          {isAdmin ? (
            <ScheduleUtilItem
              scheduleData={scheduleData}
              scheduleLists={scheduleLists}
              userLength={userLength}
              setScheduleLists={setScheduleLists}
              setUserLength={setUserLength}
              index={index}
            />
          ) : (
            ""
          )}
        </style.ScheduleItem>
      ))}
    </style.ScheduleItemWrap>
  );
};

export default ScheduleItem;

ScheduleItem.propTypes = {
  scheduleLists: PropTypes.array,
  setScheduleLists: PropTypes.array,
};

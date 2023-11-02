import React from "react";
import {
  ScheduleDate,
  ScheduleDay,
  ScheduleInfo,
  ScheduleItemWrap,
  ScheduleStatus,
  ScheduleTime,
} from "../../common/ScheduleItem/ScheduleItem.style";
import { Badge } from "@chakra-ui/react";
import Roles from "../admin/AddSchedule/Roles";
import UserApplyButton from "./UserApplyButton";
import styled from "styled-components";

export const ScheduleItems = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 18px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserApplyItem = ({ scheduleLists, setScheduleLists }) => {
  const getDayOfWeekFromDate = (date) => {
    const { year, month, day } = date;
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const weekOfDay = new Date(`${year}-${month}-${day}`);
    const getDate = weekOfDay.getDay();
    const getDay = week[getDate];

    return getDay;
  };

  return (
    <ScheduleItemWrap>
      {setScheduleLists &&
        scheduleLists.map((scheduleData, index) => {
          return (
            <ScheduleItems key={scheduleData.id}>
              <ScheduleInfo>
                <ScheduleDate>
                  {`${scheduleData.date.month}월`}
                  {`${scheduleData.date.day}일`}
                  <ScheduleDay>
                    ({getDayOfWeekFromDate(scheduleData.date)})
                  </ScheduleDay>
                </ScheduleDate>
                <ScheduleTime>
                  {`${scheduleData.time.start} ~ ${scheduleData.time.end}`}
                </ScheduleTime>
                <ScheduleStatus>
                  {scheduleData.status !== "모집완료" && (
                    <UserApplyButton scheduleData={scheduleData} />
                  )}
                </ScheduleStatus>
              </ScheduleInfo>
            </ScheduleItems>
          );
        })}
    </ScheduleItemWrap>
  );
};

export default UserApplyItem;

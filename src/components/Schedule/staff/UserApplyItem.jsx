import {
  ScheduleDate,
  ScheduleDay,
  ScheduleInfo,
  ScheduleItemWrap,
  ScheduleStatus,
  ScheduleTime,
} from "../../common/ScheduleItem/ScheduleItem.style";
import Roles from "../admin/AddSchedule/Roles";
import UserApplyButton from "./UserApplyButton";
import styled from "styled-components";

export const ScheduleItemWraps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ScheduleItems = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 18px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ScheduleInfos = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

export const ScheduleDates = styled.div`
  display: flex;
  font-weight: bold;
  gap: 3px;
  min-width: 80px;
`;
export const ScheduleDays = styled.div``;

export const ScheduleTimes = styled.span`
  font-weight: normal;
`;

export const ScheduleStatuss = styled.div`
  margin-left: auto;
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
    <ScheduleItemWraps>
      {setScheduleLists &&
        scheduleLists.map((scheduleData, index) => (
          <ScheduleItems key={scheduleData?.id}>
            <ScheduleInfos>
              <ScheduleDates>
                {`${scheduleData.date.month}월`}
                {`${scheduleData.date.day}일`}
                <ScheduleDays>
                  ({getDayOfWeekFromDate(scheduleData.date)})
                </ScheduleDays>
              </ScheduleDates>
              <ScheduleTimes>
                {`${scheduleData.time.start} ~ ${scheduleData.time.end}`}
              </ScheduleTimes>
              <ScheduleStatuss>
                <UserApplyButton scheduleData={scheduleData} />
              </ScheduleStatuss>
            </ScheduleInfos>
            <div>
              <Roles companyId={scheduleData?.companyId} />
            </div>
          </ScheduleItems>
        ))}
    </ScheduleItemWraps>
  );
};

export default UserApplyItem;

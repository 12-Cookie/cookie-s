import * as style from "./AssignHeader.style";
import getDayOfWeek from "../../../../utils/getDayOfWeek";
import amOrPm from "../../../../utils/amOrPm";

const AssignHeader = ({ schedule }) => {
  const dayText = getDayOfWeek(
    schedule.date.year,
    schedule.date.month,
    schedule.date.day,
  );

  return (
    <style.AssignHeaderWrap>
      <style.AssignHeaderTop>
        {schedule.date.year}.{schedule.date.month}.{schedule.date.day}({dayText}
        )
      </style.AssignHeaderTop>
      <style.AssignHeaderBottom>
        <span>
          {amOrPm(schedule.time.start)} {schedule.time.start}
        </span>
        <span>
          {amOrPm(schedule.time.end)} {schedule.time.end}
        </span>
      </style.AssignHeaderBottom>
    </style.AssignHeaderWrap>
  );
};

export default AssignHeader;

import { useState, useEffect } from "react";
import { useFireFetch } from "../../hooks/useFireFetch";
import SalaryCalendar from "./SalaryCalendar";
import useUserStore from "../../store/user/useUserStore";
import * as style from "./Salary_S.style";
import { Heading, Flex, Text, Spacer } from "@chakra-ui/react";
import moment from "moment";
const Salary_S = () => {
  const fetch = useFireFetch();
  const { companyId } = useUserStore((state) => state.userData);
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([]);
  const { id, payPerHour } = useUserStore((state) => state.userData);
  const [myScheduleInfo, setMyScheduleInfo] = useState([]);
  const [viewData, setViewData] = useState({});
  const [workHour, setWorkHour] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const bookedShiftsRes = await fetch.get("bookedShifts", "userId", id);

      const filterConfirmed = bookedShiftsRes.filter((v, i) => {
        return v.role !== "";
      });

      const matchingSchedules = [];

      for (const v of filterConfirmed) {
        const scheduleRes = await fetch.get("schedule", "id", v.scheduleId);
        if (scheduleRes.length > 0) {
          matchingSchedules.push(...scheduleRes);
        }
      }
      setMyScheduleInfo(matchingSchedules);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (myScheduleInfo[0]) {
      setViewData({});
      const date = myScheduleInfo.map((obj) => {
        return `${obj.date.year}-${obj.date.month
          .toString()
          .padStart(2, "0")}-${obj.date.day.toString().padStart(2, "0")}`;
      });
      setMark(date);

      const selectedDate = moment(value).format("YYYY-MM-DD");

      if (date.includes(selectedDate)) {
        const indices = date
          .map((el, index) => (el === selectedDate ? index : -1))
          .filter((index) => index !== -1);
        const selected = indices.map((e) => myScheduleInfo[e]);

        const workHour = calculateWorkHours(
          selected[0].time.start,
          selected[0].time.end,
        );
        setWorkHour(workHour);

        const data = { ...selected[0], pay: workHour * payPerHour };

        setViewData(data);
      }
      console.log("viewData : ", viewData);
    }
  }, [myScheduleInfo, value]);

  const calculateWorkHours = (startTime, endTime) => {
    const startParts = startTime.split(":");
    const endParts = endTime.split(":");
    const startHour = parseInt(startParts[0], 10);
    const startMinute = parseInt(startParts[1], 10);
    const endHour = parseInt(endParts[0], 10);
    const endMinute = parseInt(endParts[1], 10);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;
    const minutesWorked = endMinutes - startMinutes;
    const hoursWorked = minutesWorked / 60;
    return hoursWorked;
  };

  return (
    <>
      <Heading as="h2" size="md" mb="1rem">
        급여 확인
      </Heading>
      <SalaryCalendar
        companyId={companyId}
        value={value}
        onChange={onChange}
        mark={mark}
      />
      {viewData.pay && (
        <style.ScheduleItemWrap>
          <style.ScheduleItem key={viewData.id}>
            <style.ScheduleInfo>
              <style.ScheduleDate>
                {`${viewData.date.month}월 `}
                {`${viewData.date.day}일`}
              </style.ScheduleDate>
              <style.ScheduleTime>
                {`${viewData.time.start} ~ ${viewData.time.end}`}
              </style.ScheduleTime>
            </style.ScheduleInfo>
            <Flex>
              <Text>{`${workHour}시간`}</Text>
              <Spacer />
              <Text>{`${viewData.pay} 원`}</Text>
            </Flex>
          </style.ScheduleItem>
        </style.ScheduleItemWrap>
      )}
    </>
  );
};
export default Salary_S;

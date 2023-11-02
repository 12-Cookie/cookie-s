import { Button, Heading } from "@chakra-ui/react";
import * as style from "./Schedule_S.style";
import { Link } from "react-router-dom";
import StaffCalendar from "../../../../components/Schedule/staff/StaffCalendar";
import { useEffect, useState } from "react";
import useUserStore from "../../../../store/user/useUserStore";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import moment from "moment";
import UserApplyItem from "../../../../components/Schedule/staff/UserApplyItem";

const Schedule_S = () => {
  const { companyId } = useUserStore((state) => state.userData);
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([]);
  const [scheduleLists, setScheduleLists] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const fireFetch = useFireFetch();
  const schedules = fireFetch.getData("schedule", "companyId", companyId);
  useEffect(() => {
    if (schedules[0]) {
      setScheduleLists([...schedules]);
      const date = schedules.map((obj) => {
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
        const selcted = indices.map((e) => schedules[e]);
        setSelectedSchedules(selcted);
      } else {
        setSelectedSchedules([]);
      }
    }
  }, [schedules, value]);
  return (
    <style.ScheduleWrap>
      <Heading as="h2" size="md" mb="1rem">
        스케줄 관리
      </Heading>
      <div style={{ marginBottom: "1rem" }}>
        <Button borderRadius="2rem " colorScheme="blue" color="white" size="md">
          스케줄 생성
        </Button>
        <Link to="/schedule/manage">
          <Button
            borderRadius="2rem "
            colorScheme="white"
            color="black"
            size="md"
          >
            신청 확인
          </Button>
        </Link>
      </div>
      <div>
        <StaffCalendar
          companyId={companyId}
          value={value}
          onChange={onChange}
          mark={mark}
        />

        {selectedSchedules.length !== 0 && (
          <UserApplyItem
            scheduleLists={selectedSchedules}
            setScheduleLists={setSelectedSchedules}
          />
        )}
      </div>
    </style.ScheduleWrap>
  );
};

export default Schedule_S;

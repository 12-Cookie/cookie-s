import { useEffect, useState } from "react";
import * as style from "./Schedule_A.style";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AdminCalendar from "../../../../components/Schedule/admin/AddSchedule/AdminCalendar";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import ScheduleItem from "../../../../components/common/ScheduleItem/ScheduleItem.jsx";

const Schedule_A = () => {
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([]);
  const [scheduleLists, setScheduleLists] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const fireFetch = useFireFetch();
  const schedules = fireFetch.getData(
    "schedule",
    "companyId",
    "TiP9VRKNKplTMNoZzYji",
  );
  useEffect(() => {
    if (schedules[0]) {
      setScheduleLists([...schedules]);
      const date = schedules.map((obj) => {
        return `${obj.date.year}-${obj.date.month}-${obj.date.day}`;
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
        스케줄
      </Heading>
      <div>
        <Button borderRadius="2rem " colorScheme="blue" size="md">
          스케줄 생성
        </Button>
        <Link to="/schedule/manage">
          <Button
            borderRadius="2rem "
            colorScheme="white"
            color="black"
            size="md"
          >
            스케줄 관리
          </Button>
        </Link>
      </div>

      <AdminCalendar
        value={value}
        mark={mark}
        setmark={setMark}
        onChange={onChange}
      />
      {selectedSchedules.length !== 0 && (
        <ScheduleItem
          scheduleLists={selectedSchedules}
          setScheduleLists={setSelectedSchedules}
        />
      )}

      <Link to="/schedule/add">
        <Button w="100%" mt="3" colorScheme="teal" size="md">
          스케줄 생성
        </Button>
      </Link>
    </style.ScheduleWrap>
  );
};
export default Schedule_A;

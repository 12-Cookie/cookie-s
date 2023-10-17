import { useState } from "react";
import * as style from "./Schedule_A.style";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AdminCalendar from "../../../../components/Schedule/AdminCalendar";

const Schedule_A = () => {
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState(["2022-10-01", "2023-10-18", "2023-10-10"]);
  return (
    <style.ScheduleWrap>
      <style.Header>스케줄</style.Header>
      <div>
        <Button borderRadius="2rem " colorScheme="blue" size="md">
          스케줄 생성
        </Button>
        <Link to="/schedule/manage">
          <Button
            borderRadius="2rem "
            colorScheme="white"
            color="black"
            size="md">
            스케줄 관리
          </Button>
        </Link>
      </div>

      <AdminCalendar onChange={onChange} value={value} mark={mark} />
      <div>{moment(value).format("YYYY년 MM월 DD일")}</div>

      <Link to="/schedule/add">
        <Button w="100%" mt="3" colorScheme="teal" size="md">
          생성하기
        </Button>
      </Link>
    </style.ScheduleWrap>
  );
};
export default Schedule_A;

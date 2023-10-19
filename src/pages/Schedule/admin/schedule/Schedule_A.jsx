import { useState } from "react";
import * as style from "./Schedule_A.style";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AdminCalendar from "../../../../components/Schedule/AdminCalendar";

const Schedule_A = () => {
  const [value, onChange] = useState(new Date());
  const initialMark = ["2023-10-02", "2023-10-12", "2023-10-10"];
  const [mark, setMark] = useState(initialMark);
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

      <AdminCalendar value={value} mark={mark} onChange={onChange} />
      <div>{moment(value).format("YYYY년 MM월 DD일")}</div>

      <Link to="/schedule/add">
        <Button w="100%" mt="3" colorScheme="teal" size="md">
          스케줄 생성
        </Button>
      </Link>
    </style.ScheduleWrap>
  );
};
export default Schedule_A;

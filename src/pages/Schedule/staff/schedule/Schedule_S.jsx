import { Button, Heading } from "@chakra-ui/react";
import * as style from "./Schedule_S.style";
import { Link } from "react-router-dom";
import StaffCalendar from "../../../../components/Schedule/staff/staffCalendar";
import { useState } from "react";

const Schedule_S = () => {
  const [value, onChange] = useState(new Date());
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
        <StaffCalendar value={value} onChange={onChange} />
      </div>
    </style.ScheduleWrap>
  );
};

export default Schedule_S;

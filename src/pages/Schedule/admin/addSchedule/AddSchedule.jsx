import { useEffect, useState } from "react";
import AdminCalendar from "../../../../components/Schedule/AdminCalendar";
import * as style from "./AddSchedule.style";
import { Input } from "@chakra-ui/input";

const AddSchedule = () => {
  const [value, onChange] = useState(new Date());
  const initialMark = ["2023-10-02", "2023-10-12", "2023-10-10"];
  const [mark, setMark] = useState(initialMark);
  //mark지정
  useEffect(() => {
    setMark(["2023-10-10", "2023-10-12", "2023-10-11"]);
    console.log(mark);
  }, []);
  return (
    <style.AddScheduleWrap>
      <style.Header>스케줄 생성</style.Header>
      <style.Form>
        <div>
          <div>범위</div>
        </div>
        <div>
          <div>날짜</div>
        </div>
        <div>
          <div>시간</div>
        </div>
        <div>
          <div>롤</div>
        </div>
        <div>
          <div>인원</div>
          <AdminCalendar onChange={onChange} value={value} mark={mark} />
        </div>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="datetime-local"
        />
      </style.Form>
    </style.AddScheduleWrap>
  );
};

export default AddSchedule;

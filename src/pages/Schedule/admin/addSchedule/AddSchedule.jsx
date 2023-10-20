import { useEffect, useState } from "react";
import AdminCalendar from "../../../../components/Schedule/AdminCalendar";
import * as style from "./AddSchedule.style";
import {
  Heading,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Button,
} from "@chakra-ui/react";
import moment from "moment";
import { useFireFetch } from "../../../../hooks/useFireFetch";

const AddSchedule = () => {
  const [value, onChange] = useState(new Date());
  const initialMark = ["2023-10-02", "2023-10-12", "2023-10-10"];
  const [mark, setMark] = useState(initialMark);
  const [startTimeValue, setStartTimeValue] = useState("09:00");
  const [endTimeValue, setEndTimeValue] = useState("18:00");
  const [radioValue, setRadioValue] = useState("1");
  const [oneScheduleValue, setOneScheduleValue] = useState("");
  const [manyScheduleValue, setManyScheduleValue] = useState([]);
  const [monthValue, setMonthValue] = useState("");
  useEffect(() => {
    setOneScheduleValue(moment(value).format("YYYY년 MM월 DD일"));
  }, [value]);

  useEffect(() => {
    setMark(["2023-10-10", "2023-10-12", "2023-10-11"]);
    console.log(mark);
    console.log(radioValue);
  }, [radioValue]);
  const handleStartTimeValue = (e) => {
    setStartTimeValue(e.target.value);
  };
  const handleEndTimeValue = (e) => {
    setEndTimeValue(e.target.value);
  };
  const handleManyScheduleValue = (e) => {
    setManyScheduleValue(e.target.value);
  };
  const handleMonthValue = (e) => {
    setMonthValue(e.target.value);
  };
  //form 제출
  const handleSubmit = (e) => {
    console.log("a");
  };
  console.log(endTimeValue);
  const fireFetch = useFireFetch();

  const schedule = fireFetch.postData("schedule", "1", { a: "b" })[0];
  return (
    <style.AddScheduleWrap>
      <Heading as="h2" size="md" mb="1rem">
        스케줄 생성
      </Heading>
      <style.Form type="submit" onSubmit={handleSubmit}>
        <RadioGroup onChange={setRadioValue} value={radioValue}>
          <Stack direction="row">
            <Radio size="sm" value="1">
              개별지정
            </Radio>
            <Radio size="sm" value="2">
              복수지정
            </Radio>
          </Stack>
        </RadioGroup>

        {radioValue === "1" ? (
          <input
            style={{ width: "12rem" }}
            required
            type="string"
            onChange={onChange}
            value={oneScheduleValue}
            placeholder="0"
            disabled
          />
        ) : (
          <div>
            <input
              required
              type="month"
              value={monthValue}
              onChange={handleMonthValue}
            />
            <input
              style={{ width: "12rem" }}
              required
              type="string"
              value={manyScheduleValue}
              onChange={handleManyScheduleValue}
              placeholder="10,12,13,21"
            />
          </div>
        )}
        <div>
          <div>날짜</div>
          <div>
            <AdminCalendar onChange={onChange} value={value} mark={mark} />
          </div>
        </div>

        <div>
          <div>시간</div>
          <style.TimeInput>
            <Input
              value={startTimeValue}
              onChange={handleStartTimeValue}
              placeholder="Select"
              size="sm"
              type="time"
            />
            <span>~</span>
            <Input
              value={endTimeValue}
              onChange={handleEndTimeValue}
              placeholder="Select"
              size="sm"
              type="time"
            />
          </style.TimeInput>
        </div>
        <div>
          <div>롤</div>
        </div>
        <div>
          <div>인원</div>
          <div>
            <input
              style={{ width: "6.3rem" }}
              required
              type="number"
              size="sm"
              placeholder="0"
            />
          </div>
        </div>
        <Button type="submit" w="100%" mt="3" colorScheme="teal" size="md">
          스케줄 생성 완료
        </Button>
      </style.Form>
    </style.AddScheduleWrap>
  );
};

export default AddSchedule;

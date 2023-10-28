import { useEffect, useState } from "react";
import moment from "moment";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import * as style from "./AddSchedule.style";
import {
  Heading,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import Roles from "../../../../components/Schedule/admin/AddSchedule/Roles";
import WorkersComponent from "../../../../components/Schedule/admin/AddSchedule/WorkersComponent";
import AddCalendar from "../../../../components/Schedule/admin/AddSchedule/AddCalendar";

const AddSchedule = ({ companyId, isAdmin }) => {
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const [radioValue, setRadioValue] = useState("1");
  const [startTimeValue, setStartTimeValue] = useState("09:00");
  const [endTimeValue, setEndTimeValue] = useState("18:00");
  const [oneScheduleValue, setOneScheduleValue] = useState("");
  const [manyScheduleValue, setManyScheduleValue] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [workersValue, setWorkersValue] = useState("");

  const fireFetch = useFireFetch();
  const company = companyId;
  useEffect(() => {
    setOneScheduleValue(moment(value).format("YYYY-MM-DD"));
  }, [value]);

  useEffect(() => {
    if (radioValue === "2") {
      if (monthValue !== "") {
        const customDate = monthValue + "-1";
        onChange(new Date(customDate));
      }
    }
  }, [radioValue, monthValue]);
  const handleStartTimeValue = (e) => {
    setStartTimeValue(e.target.value);
  };
  const handleEndTimeValue = (e) => {
    setEndTimeValue(e.target.value);
  };
  const handleManyScheduleValue = (e) => {
    setManyScheduleValue(e.target.value);
  };

  //form 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = Timestamp.now();

    if (radioValue === "1") {
      fireFetch.addData("schedule", {
        companyId: company,
        date: {
          year: Number(oneScheduleValue.split("-")[0]),
          month: Number(oneScheduleValue.split("-")[1]),
          day: Number(oneScheduleValue.split("-")[2]),
        },
        numWorkers: Number(workersValue),
        status: "모집중",

        time: {
          start: startTimeValue,
          end: endTimeValue,
        },
        timestamp: timestamp,
      });
      navigate("/schedule");
    } else {
      const year = monthValue.split("-")[0];
      const month = monthValue.split("-")[1];
      const days = manyScheduleValue.split(" ");
      days.map((v, i) => {
        fireFetch.addData("schedule", {
          companyId: company,
          date: {
            year: Number(year),
            month: Number(month),
            day: Number(v),
          },
          numWorkers: Number(workersValue),
          status: "모집중",

          time: {
            start: startTimeValue,
            end: endTimeValue,
          },
          timestamp: timestamp,
        });
      });
      navigate("/dashboard");
    }
  };

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
              onChange={(e) => setMonthValue(e.target.value)}
            />
            <input
              style={{ width: "12rem" }}
              required
              type="string"
              value={manyScheduleValue}
              onChange={handleManyScheduleValue}
              placeholder="(예:)1 2 13 21"
            />
          </div>
        )}
        <div>
          <div>날짜</div>
          <div>
            {isAdmin && <AddCalendar onChange={onChange} value={value} />}
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
          <Roles companyId={companyId} />
        </div>
        <div>
          <div>인원</div>
          <div>
            <WorkersComponent
              setWorkersValue={setWorkersValue}
              workersValue={workersValue}
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

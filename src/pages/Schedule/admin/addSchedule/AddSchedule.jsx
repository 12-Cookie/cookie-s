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
import getWeekdayWeekend from "../../../../utils/getWeekdayWeekend";
import getCurrentWeekNumber from "../../../../utils/getCurrentWeekNumber";
import useUserStore from "../../../../store/user/useUserStore";

const AddSchedule = () => {
  const { companyId, isAdmin } = useUserStore((state) => state.userData);
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  const [radioValue, setRadioValue] = useState("1");
  const [startTimeValue, setStartTimeValue] = useState("09:00");
  const [endTimeValue, setEndTimeValue] = useState("18:00");
  const [oneScheduleValue, setOneScheduleValue] = useState("");
  const [manyScheduleValue, setManyScheduleValue] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [weekValue, setWeekValue] = useState("2023-W44");
  const [workersValue, setWorkersValue] = useState("");
  const fireFetch = useFireFetch();
  const weekInfo = weekValue.split("-W");
  const { weekdays, weekends } = getWeekdayWeekend(
    Number(weekInfo[0]),
    Number(weekInfo[1]),
  );

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

  //form 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = Timestamp.now();

    if (radioValue === "1") {
      fireFetch.addData("schedule", {
        companyId: companyId,
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
    } else if (radioValue === "2") {
      const year = monthValue.split("-")[0];
      const month = monthValue.split("-")[1];
      const days = manyScheduleValue.split(" ");
      days.map((v, i) => {
        fireFetch.addData("schedule", {
          companyId: companyId,
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

  const handleWeekdaysSubmit = (e) => {
    e.preventDefault();
    if (workersValue === "") {
      alert("인원을 입력해주세요!");
    } else {
      const timestamp = Timestamp.now();
      weekdays.map((v, i) => {
        const date = v.slice(0, 10).split("-");
        fireFetch.addData("schedule", {
          companyId: companyId,
          date: {
            year: Number(date[0]),
            month: Number(date[1]),
            day: Number(date[2]),
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
  const handleWeekendsSubmit = (e) => {
    e.preventDefault();
    if (workersValue === "") {
      alert("인원을 입력해주세요!");
    } else {
      const timestamp = Timestamp.now();
      weekends.map((v, i) => {
        const date = v.slice(0, 10).split("-");
        fireFetch.addData("schedule", {
          companyId: companyId,
          date: {
            year: Number(date[0]),
            month: Number(date[1]),
            day: Number(date[2]),
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
            <Radio size="sm" value="3">
              주간지정
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
        ) : radioValue === "2" ? (
          <>
            <div>
              <div>년 월</div>
              <input
                required
                type="month"
                value={monthValue}
                onChange={(e) => setMonthValue(e.target.value)}
              />
            </div>
            <div>
              <div>일</div>
              <input
                style={{ width: "12rem" }}
                required
                type="string"
                value={manyScheduleValue}
                onChange={(e) => setManyScheduleValue(e.target.value)}
                placeholder="(예:)1 2 13 21"
              />
            </div>
          </>
        ) : (
          <div>
            <div>기간</div>
            <input
              required
              id="week"
              type="week"
              name="week"
              min={getCurrentWeekNumber()}
              value={weekValue}
              onChange={(e) => setWeekValue(e.target.value)}
            />
          </div>
        )}

        {isAdmin && (radioValue === "1" || radioValue === "2") ? (
          <div>
            <div>날짜</div>

            <AddCalendar
              onChange={onChange}
              value={value}
              companyId={companyId}
            />
          </div>
        ) : (
          <>
            {weekdays[0][0] !== "N" && (
              <div>{`${weekdays[0]} ~ ${weekends[1]}`}</div>
            )}

            <div>
              <div>평일</div>
              <ul>
                {weekdays.map((day, index) =>
                  day[0] === "N" ? (
                    <li key={index}></li>
                  ) : (
                    <li key={index}>{day}</li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <div>주말</div>
              <ul>
                {weekends.map((day, index) =>
                  day[0] === "N" ? (
                    <li key={index}></li>
                  ) : (
                    <li key={index}>{day}</li>
                  ),
                )}
              </ul>
            </div>
          </>
        )}

        <div>
          <div>시간</div>
          <style.TimeInput>
            <Input
              value={startTimeValue}
              onChange={(e) => setStartTimeValue(e.target.value)}
              placeholder="Select"
              size="sm"
              type="time"
            />
            <span>~</span>
            <Input
              value={endTimeValue}
              onChange={(e) => setEndTimeValue(e.target.value)}
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
        {isAdmin && (radioValue === "1" || radioValue === "2") ? (
          <Button type="submit" w="100%" mt="3" colorScheme="teal" size="md">
            스케줄 생성
          </Button>
        ) : (
          <div id="weekButtons">
            <Button onClick={handleWeekdaysSubmit} type="submit" w="45%">
              평일 스케줄 생성
            </Button>
            <Button onClick={handleWeekendsSubmit} type="submit" w="45%">
              주말 스케줄 생성
            </Button>
          </div>
        )}
      </style.Form>
    </style.AddScheduleWrap>
  );
};

export default AddSchedule;

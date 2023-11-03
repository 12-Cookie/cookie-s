import React, { useState, useEffect } from "react";
import { useFireFetch } from "../../hooks/useFireFetch";
import StaffCalendar from "../../components/Schedule/staff/StaffCalendar";
import useUserStore from "../../store/user/useUserStore";
import * as style from "./Salary_S.style";
import Loader from "../../components/common/loader/Loader";
import { ScheduleItem } from "../../components/common/ScheduleItem/ScheduleItem.style";
import { Heading } from "@chakra-ui/react";
import moment from "moment";

const Salary_S = () => {
  const fetch = useFireFetch();
  const { companyId } = useUserStore((state) => state.userData);
  const [value, onChange] = useState(new Date());
  const [mark, setMark] = useState([]);

  const { id } = useUserStore((state) => state.userData);
  const [scheduleLists, setScheduleLists] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedShifts = async () => {
      const bookedShiftsRes = await fetch.get("bookedShifts", "userId", id);
      console.log("bookedShiftsRes :", bookedShiftsRes);
      return bookedShiftsRes;
    };

    const fetchData = async () => {
      const bookedShiftsRes = await fetchBookedShifts();
      setMark(
        bookedShiftsRes.map((shift) => moment(shift.date).format("YYYY-MM-DD")),
      );

      const selectedDate = moment(value).format("YYYY-MM-DD");

      console.log("selectedDate :", selectedDate);
      // 선택된 날짜에 해당하는 스케줄 ID 추출
      const selectedScheduleId = bookedShiftsRes.find(
        (shift) => moment(shift.date).format("YYYY-MM-DD") === selectedDate,
      )?.scheduleId;
      if (selectedScheduleId) {
        const selectedScheduleInfo = await fetch.get(
          "schedule",
          "id",
          selectedScheduleId,
        );

        // 선택된 스케줄 정보를 저장합니다.
        setSelectedSchedule(selectedScheduleInfo[0]);
        console.log("selectedScheduleInfo:", selectedScheduleInfo);
      }
    };
    fetchData();
    console.log();
  }, [value, id]);
  console.log("selectedSchedule :", selectedSchedule);

  return (
    <style.salaryWrap>
      <Heading as="h2" size="md" mb="1rem">
        급여 확인
      </Heading>
      <StaffCalendar
        companyId={companyId}
        value={value}
        onChange={onChange}
        mark={mark}
      />
      {selectedSchedule && (
        <div>
          <p>{selectedSchedule.status}</p>
        </div>
      )}
    </style.salaryWrap>
  );
};

export default Salary_S;

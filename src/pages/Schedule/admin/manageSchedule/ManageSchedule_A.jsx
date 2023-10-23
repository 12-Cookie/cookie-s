import * as style from "./ManageSchedule_A.style";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { Heading } from "@chakra-ui/react";
import ScheduleItem from "../../../../components/common/ScheduleItem/ScheduleItem";
import ScheduleUtilItem from "../../../../components/common/ScheduleUtilItem/ScheduleUtilItem";

const ManageSchedule_A = () => {
  const fireFetch = useFireFetch();
  const schedules = fireFetch.getData(
    "schedule",
    "companyId",
    "TiP9VRKNKplTMNoZzYji",
  );

  const bookedSchedule = fireFetch.getData(
    "bookedShifts",
    "companyId",
    "TiP9VRKNKplTMNoZzYji",
  );

  // console.log(bookedSchedule);

  // console.log(schedules);
  return (
    <style.ManageScheduleWrap>
      <Heading as="h2" size="md" mb="1rem">
        스케줄 관리
      </Heading>
      <ScheduleItem
        scheduleData={schedules}
        bookedShiftsData={bookedSchedule}
      />
      {/* <ScheduleUtilItem scheduleData={schedules} /> */}
    </style.ManageScheduleWrap>
  );
};

export default ManageSchedule_A;

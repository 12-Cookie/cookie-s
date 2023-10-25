import * as style from "./ManageSchedule_A.style";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { Heading } from "@chakra-ui/react";
import ScheduleItem from "../../../../components/common/ScheduleItem/ScheduleItem";
import { useEffect, useState } from "react";

const ManageSchedule_A = () => {
  const fireFetch = useFireFetch();
  const [scheduleLists, setScheduleLists] = useState([]);

  const schedules = fireFetch.getData(
    "schedule",
    "companyId",
    "TiP9VRKNKplTMNoZzYji",
  );

  useEffect(() => {
    if (schedules[0]) {
      setScheduleLists([...schedules]);
    }
  }, [schedules]);

  const bookedSchedule = fireFetch.getData(
    "bookedShifts",
    "companyId",
    "TiP9VRKNKplTMNoZzYji",
  );

  // console.log(scheduleLists);
  return (
    <style.ManageScheduleWrap>
      <Heading as="h2" size="md" mb="1rem">
        스케줄 관리
      </Heading>
      {scheduleLists[0] && (
        <ScheduleItem
          scheduleLists={scheduleLists}
          setScheduleLists={setScheduleLists}
        />
      )}
    </style.ManageScheduleWrap>
  );
};

export default ManageSchedule_A;

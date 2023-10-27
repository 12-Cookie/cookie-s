import * as style from "./ManageSchedule_A.style";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
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

  // console.log(scheduleLists);
  return (
    <style.ManageScheduleWrap>
      <Heading as="h2" size="md" mb="1rem">
        스케줄 관리
      </Heading>
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/schedule">
          <Button
            borderRadius="2rem "
            colorScheme="white"
            color="black"
            size="md"
          >
            스케줄 생성
          </Button>
        </Link>
        <Button borderRadius="2rem " colorScheme="blue" size="md">
          스케줄 관리
        </Button>
      </div>
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

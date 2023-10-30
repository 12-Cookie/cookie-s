import * as style from "./ManageSchedule_S.style";
import { useEffect, useState } from "react";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ScheduleItem from "../../../../components/common/ScheduleItem/ScheduleItem";
import useUserStore from "../../../../store/user/useUserStore";

const ManageSchedule_S = () => {
  const fireFetch = useFireFetch();
  const { id } = useUserStore((state) => state.userData);
  const [scheduleLists, setScheduleLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookedShiftsRes = await fireFetch.get("bookedShifts", "userId", id);
      for (const v of bookedShiftsRes) {
        const scheduleRes = await fireFetch.get("schedule", "id", v.scheduleId);
        if (!scheduleLists[0]) {
          setScheduleLists((prev) => [...prev, ...scheduleRes]);
        }
      }
    };
    fetchData();
  }, []);

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
          신청 확인
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

export default ManageSchedule_S;

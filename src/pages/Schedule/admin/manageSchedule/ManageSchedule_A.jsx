import * as style from "./ManageSchedule_A.style";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { useEffect, useState } from "react";
import { Heading, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Loader from "../../../../components/common/loader/Loader";
import ScheduleItem from "../../../../components/common/ScheduleItem/ScheduleItem";
import useUserStore from "../../../../store/user/useUserStore";

const ManageSchedule_A = () => {
  const fireFetch = useFireFetch();
  const { companyId } = useUserStore((state) => state.userData);
  const [scheduleLists, setScheduleLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const schedules = fireFetch.getData("schedule", "companyId", companyId);

  useEffect(() => {
    if (schedules[0]) {
      setScheduleLists([...schedules]);
    }
  }, [schedules]);

  useEffect(() => {
    const time = setTimeout(() => {
      setLoading(false);
    }, 1000);
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
          스케줄 관리
        </Button>
      </div>
      {loading ? <Loader /> : null}
      <div style={{ display: loading ? "none" : "block" }}>
        {scheduleLists[0] && (
          <ScheduleItem
            scheduleLists={scheduleLists}
            setScheduleLists={setScheduleLists}
          />
        )}
      </div>
    </style.ManageScheduleWrap>
  );
};

export default ManageSchedule_A;

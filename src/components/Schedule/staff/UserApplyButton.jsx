import { Badge, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFireFetch } from "../../../hooks/useFireFetch";
import useUserStore from "../../../store/user/useUserStore";
import { useNavigate } from "react-router-dom";
const UserApplyButton = ({ scheduleData }) => {
  const { id } = useUserStore((state) => state.userData);
  const fireFetch = useFireFetch();
  const [applySchedules, setApplySchedules] = useState([]);
  const navigate = useNavigate();
  const applyOrNot = async () => {
    try {
      const schedules = await fireFetch.get("bookedShifts", "userId", id);
      const b = schedules?.map((e) => e?.scheduleId);
      setApplySchedules([...b]);
    } catch (error) {
      // handle error here
      console.error("Error occurred while fetching data: ", error);
    }
  };
  useEffect(() => {
    applyOrNot();
  }, []);
  const handleUserApply = (e) => {
    e.preventDefault();

    if (confirm("신청하시겠어요?")) {
      fireFetch.addData("bookedShifts", {
        companyId: scheduleData?.companyId,
        userId: id,
        role: "",
        scheduleId: scheduleData?.id,
      });
      navigate("/schedule/manage");
    }
  };
  return applySchedules.includes(scheduleData?.id) ? (
    <Badge>신청완료</Badge>
  ) : (
    <Button size="sm" onClick={handleUserApply} colorScheme="gray">
      신청
    </Button>
  );
};

export default UserApplyButton;

import { Badge, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
  console.log(applySchedules);
  const handleUserApply = (e) => {
    e.preventDefault();
    fireFetch.addData("bookedShifts", {
      companyId: scheduleData?.companyId,
      userId: id,
      role: "",
      scheduleId: scheduleData?.id,
    });
    navigate("/schedule/manage");
  };
  return (
    <Button onClick={handleUserApply} colorScheme="gray">
      신청
    </Button>
  );
};

export default UserApplyButton;

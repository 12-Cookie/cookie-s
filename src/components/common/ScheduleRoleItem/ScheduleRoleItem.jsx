import { useState, useEffect } from "react";
import { useFireFetch } from "../../../hooks/useFireFetch";
import useUserStore from "../../../store/user/useUserStore";

const ScheduleRoleItem = ({ scheduleData }) => {
  const { id } = useUserStore((state) => state.userData);
  const [role, setRole] = useState("");

  const fireFetch = useFireFetch();

  useEffect(() => {
    const fetchData = async () => {
      const bookedUser = await fireFetch.get("bookedShifts", "userId", id);

      const find = bookedUser.find((v, i) => v.scheduleId === scheduleData.id);

      setRole(find.role);
    };
    fetchData();
  }, []);
  return <>{<span>{!role ? "포지션" : role}</span>}</>;
};

export default ScheduleRoleItem;

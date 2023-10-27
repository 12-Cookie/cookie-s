import { useState, useEffect } from "react";
import { useFireFetch } from "../../../hooks/useFireFetch";

const ScheduleRoleItem = ({ scheduleData }) => {
  const [user, setUser] = useState("ZGDupTlZ8OON2cD6LvHO");
  const [role, setRole] = useState("");

  const fireFetch = useFireFetch();

  useEffect(() => {
    const fetchData = async () => {
      const bookedUser = await fireFetch.get("bookedShifts", "userId", user);

      const find = bookedUser.find((v, i) => v.scheduleId === scheduleData.id);

      setRole(find.role);
    };
    fetchData();
  }, []);
  return <>{<span>{!role ? "포지션" : role}</span>}</>;
};

export default ScheduleRoleItem;

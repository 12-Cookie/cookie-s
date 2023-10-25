import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import * as style from "./ScheduleUtilItem.style";
import { useFireFetch } from "../../../hooks/useFireFetch";

const ScheduleUtilItem = ({
  scheduleLists,
  scheduleData,
  userLength,
  index,
  setScheduleLists,
  setUserLength,
}) => {
  const [isAdmin, setIsAdmin] = useState(true);
  const navigate = useNavigate();
  const fireFetch = useFireFetch();
  const { id } = scheduleData;

  const users = fireFetch.bookedUser(scheduleData.id);

  useEffect(() => {
    if (users[0]) {
      const copy = [...userLength];
      copy[index] = users.length;
      setUserLength(copy);
    }
  }, [users]);

  const deleteData = () => {
    alert(`id: ${id} 가 삭제 되었습니다`);

    const copy = [...scheduleLists];
    const filtered = copy.filter((v, i) => v.id !== id);
    setScheduleLists(filtered);
    fireFetch.deleteById("schedule", id);
  };

  const handleDelete = () => {
    console.log("data", scheduleData);
    console.log("id", id);
    const confirmValue = confirm("정말 삭제하시겠습니까?");
    confirmValue ? deleteData() : "";
  };

  const handleAllocation = () => {
    console.log(scheduleData);
    navigate(`/schedule/assign?id=${id}`);
  };

  const handleCancel = () => {
    console.log(scheduleData);
  };

  return (
    <style.ScheduleUtilWrap>
      {isAdmin ? (
        <style.ScheduleUtilBtn>
          <style.DeleteBtn onClick={handleDelete}>삭제</style.DeleteBtn>
          <style.AllocationBtn onClick={handleAllocation}>
            배정
          </style.AllocationBtn>
        </style.ScheduleUtilBtn>
      ) : (
        <button onClick={handleCancel}>취소하기</button>
      )}
    </style.ScheduleUtilWrap>
  );
};

export default ScheduleUtilItem;

ScheduleUtilItem.propTypes = {
  scheduleData: PropTypes.object,
};

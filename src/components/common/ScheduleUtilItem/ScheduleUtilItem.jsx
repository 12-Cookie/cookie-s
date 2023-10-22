import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import * as style from "./ScheduleUtilItem.style";

const ScheduleUtilItem = ({ scheduleData }) => {
  const [isAdmin, setIsAdmin] = useState(true);
  const navigate = useNavigate();
  const { id } = scheduleData;

  const handleDelete = () => {
    console.log("data", scheduleData);
    console.log("id", id);
    const confirmValue = confirm("정말 삭제하시겠습니까?");
    confirmValue ? alert(`id: ${id} 가 삭제 되었습니다`) : "";
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

import { useState } from "react";
import PropTypes from "prop-types";

const ScheduleUtilItem = ({ scheduleData }) => {
  const [isAdmin, setIsAdmin] = useState(true);
  const { id } = scheduleData;

  const handleDelete = () => {
    console.log("data", scheduleData);
    console.log("id", id);
    const confirmValue = confirm("정말 삭제하시겠습니까?");
    confirmValue ? alert(`id: ${id} 가 삭제 되었습니다`) : "";
  };

  const handleAllocation = () => {
    console.log(scheduleData);
  };

  const handleCancel = () => {
    console.log(scheduleData);
  };

  return (
    <>
      {isAdmin ? (
        <>
          <button onClick={handleDelete}>삭제</button>
          <button onClick={handleAllocation}>배정</button>
        </>
      ) : (
        <button onClick={handleCancel}>취소하기</button>
      )}
    </>
  );
};

export default ScheduleUtilItem;

ScheduleUtilItem.propTypes = {
  scheduleData: PropTypes.object,
};

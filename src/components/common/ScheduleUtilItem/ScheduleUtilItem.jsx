import * as style from "./ScheduleUtilItem.style";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFireFetch } from "../../../hooks/useFireFetch";
import useUserStore from "../../../store/user/useUserStore";

const ScheduleUtilItem = ({
  scheduleLists,
  scheduleData,
  status,
  index,
  setScheduleLists,
  setUserLength,
}) => {
  const { isAdmin } = useUserStore((state) => state.userData);
  const navigate = useNavigate();
  const fireFetch = useFireFetch();
  const { id } = scheduleData;

  const users = fireFetch.bookedUser(scheduleData.id);

  useEffect(() => {
    setUserLength((prev) => {
      const copy = [...prev];
      copy[index] = users.length;
      return copy;
    });
  }, [users]);

  const deleteData = () => {
    const copy = [...scheduleLists];
    const filtered = copy.filter((v, i) => v.id !== id);
    setScheduleLists(filtered);
    fireFetch.deleteById("schedule", id);
  };

  const handleDelete = () => {
    const confirmValue = confirm("정말 삭제하시겠습니까?");
    confirmValue ? deleteData() : "";
  };

  const handleAllocation = () => {
    navigate(`/schedule/assign/${id}`);
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
            {status === "모집완료" ? "수정" : "배정"}
          </style.AllocationBtn>
        </style.ScheduleUtilBtn>
      ) : (
        <button onClick={handleCancel}>취소하기</button>
      )}
    </style.ScheduleUtilWrap>
  );
};

export default ScheduleUtilItem;

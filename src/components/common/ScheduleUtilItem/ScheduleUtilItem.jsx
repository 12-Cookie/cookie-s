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
          {status !== "모집완료" ? (
            <style.AllocationBtn onClick={handleAllocation}>
              배정
            </style.AllocationBtn>
          ) : null}
        </style.ScheduleUtilBtn>
      ) : (
        <button onClick={handleCancel}>취소하기</button>
      )}
    </style.ScheduleUtilWrap>
  );
};

export default ScheduleUtilItem;

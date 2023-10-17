import * as style from "./AssignRole.style";
import AssignHeader from "../../../../components/Schedule/admin/assignRole/AssignHeader";
import { useFireFetch } from "../../../../hooks/useFireFetch";

const AssignRole = () => {
  const fireFetch = useFireFetch();

  const schedule = fireFetch.getData(
    "schedule",
    "id",
    "NyOKqZmAHtErt68DHrTO",
  )[0];

  return (
    <style.AssignRoleWrap>
      <h1 style={{ marginBottom: "1rem" }}>역할배정</h1>
      {schedule && <AssignHeader schedule={schedule} />}
    </style.AssignRoleWrap>
  );
};

export default AssignRole;

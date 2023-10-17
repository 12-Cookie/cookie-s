import * as style from "./AssignRole.style";
import AssignHeader from "../../../../components/Schedule/admin/assignRole/AssignHeader";

const AssignRole = () => {
  return (
    <style.AssignRoleWrap>
      <h1 style={{ marginBottom: "1rem" }}>역할배정</h1>
      <AssignHeader />
    </style.AssignRoleWrap>
  );
};

export default AssignRole;

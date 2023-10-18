import * as style from "./AssignRole.style";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { Heading } from "@chakra-ui/react";
import AssignHeader from "../../../../components/Schedule/admin/assignRole/AssignHeader/AssignHeader";
import AssignBody from "../../../../components/Schedule/admin/assignRole/AssignBody/AssignBody";

const AssignRole = () => {
  const fireFetch = useFireFetch();

  const schedule = fireFetch.getData(
    "schedule",
    "id",
    "NyOKqZmAHtErt68DHrTO",
  )[0];

  return (
    <style.AssignRoleWrap>
      <Heading as="h2" size="md" mb="1rem">
        역할배정
      </Heading>
      {schedule && <AssignHeader schedule={schedule} />}
      {schedule && <AssignBody schedule={schedule} />}
    </style.AssignRoleWrap>
  );
};

export default AssignRole;

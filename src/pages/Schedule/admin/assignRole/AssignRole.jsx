import * as style from "./AssignRole.style";
import AssignHeader from "../../../../components/Schedule/admin/assignRole/AssignHeader";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { Heading } from "@chakra-ui/react";

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
    </style.AssignRoleWrap>
  );
};

export default AssignRole;

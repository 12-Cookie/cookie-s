import * as style from "./AssignFooter.style";
import { useFireFetch } from "../../../../../hooks/useFireFetch";
import { Tag } from "@chakra-ui/react";

const AssignFooter = ({ schedule }) => {
  const fireFetch = useFireFetch();

  const users = fireFetch.bookedUser(schedule.id);
  console.log(users);
  return (
    <style.AssignFooterWrap>
      {users.map((v, i) => {
        return (
          <Tag key={i} mr="1rem">
            {v.name}
          </Tag>
        );
      })}
    </style.AssignFooterWrap>
  );
};

export default AssignFooter;

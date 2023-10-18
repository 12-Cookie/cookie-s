import * as style from "./AssignFooter.style";
import { useFireFetch } from "../../../../../hooks/useFireFetch";
import { Tag } from "@chakra-ui/react";

const AssignFooter = ({ schedule }) => {
  const fireFetch = useFireFetch();

  const bookedShifts = fireFetch.getData(
    "bookedShifts",
    "scheduleId",
    schedule.id,
  );

  return (
    <style.AssignFooterWrap>
      {bookedShifts.map((v, i) => {
        return (
          <Tag key={i} mr="1rem">
            {v.userName}
          </Tag>
        );
      })}
    </style.AssignFooterWrap>
  );
};

export default AssignFooter;

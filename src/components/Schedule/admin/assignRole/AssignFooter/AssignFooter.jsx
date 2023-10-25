import * as style from "./AssignFooter.style";
import { useEffect, useState } from "react";
import { useFireFetch } from "../../../../../hooks/useFireFetch";
import { Tag } from "@chakra-ui/react";

const AssignFooter = ({
  userData,
  schedule,
  config,
  roleData,
  isHidden,
  booking,
  userId,
  setRoleDate,
  setIsHidden,
  setuserData,
  setBooking,
  setUserId,
}) => {
  const fireFetch = useFireFetch();

  const users = fireFetch.bookedUser(schedule.id);

  const handleClick = (name, id) => {
    const map = new Map(roleData);
    map.set(config, [...map.get(config), name]);
    setRoleDate(map);

    const data = {
      role: config,
      scheduleId: schedule.id,
      userId: id,
    };

    const copy = [...booking];
    copy.push(data);
    setBooking(copy);

    // console.log(booking);
    // console.log(schedule);
  };

  useEffect(() => {
    if (users) {
      setIsHidden(Array(users.length).fill(false));
      setuserData(users.map((v, i) => v.name));
      setUserId([...users]);
    }
  }, [users]);

  const toggleVisibility = (i) => {
    const copy = [...isHidden];
    copy[i] = !copy[i];
    setIsHidden(copy);
  };

  return (
    <style.AssignFooterWrap>
      {users.map((v, i) => {
        return (
          <Tag
            key={i}
            mr="1rem"
            cursor="pointer"
            userSelect="none"
            onClick={() => {
              handleClick(v.name, v.id);
              toggleVisibility(i);
            }}
            style={isHidden[i] ? { display: "none" } : null}
          >
            {v.name}
          </Tag>
        );
      })}
    </style.AssignFooterWrap>
  );
};

export default AssignFooter;

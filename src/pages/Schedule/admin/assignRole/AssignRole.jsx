import * as style from "./AssignRole.style";
import { useState } from "react";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { Heading, Button, Stack } from "@chakra-ui/react";
import AssignHeader from "../../../../components/Schedule/admin/assignRole/AssignHeader/AssignHeader";
import AssignBody from "../../../../components/Schedule/admin/assignRole/AssignBody/AssignBody";
import AssignFooter from "../../../../components/Schedule/admin/assignRole/AssignFooter/AssignFooter";

const AssignRole = () => {
  const [viewFooter, setViewFooter] = useState(false);
  const [roleData, setRoleDate] = useState([]);
  const [config, setConfig] = useState("");
  const [isHidden, setIsHidden] = useState([]);
  const [userData, setuserData] = useState([]);
  const [booking, setBooking] = useState([]);

  const fireFetch = useFireFetch();

  const schedule = fireFetch.getData(
    "schedule",
    "id",
    "NyOKqZmAHtErt68DHrTO",
  )[0];

  const handleClick = () => {
    console.log(roleData);
  };

  console.log(booking);

  return (
    <style.AssignRoleWrap>
      <Heading as="h2" size="md" mb="1rem">
        역할배정
      </Heading>
      {schedule && <AssignHeader schedule={schedule} />}
      {schedule && roleData && (
        <AssignBody
          schedule={schedule}
          isHidden={isHidden}
          roleData={roleData}
          userData={userData}
          config={config}
          setViewFooter={setViewFooter}
          setRoleDate={setRoleDate}
          setConfig={setConfig}
          setIsHidden={setIsHidden}
        />
      )}
      {schedule
        ? viewFooter && (
            <AssignFooter
              schedule={schedule}
              setRoleDate={setRoleDate}
              config={config}
              roleData={roleData}
              isHidden={isHidden}
              userData={userData}
              booking={booking}
              setIsHidden={setIsHidden}
              setuserData={setuserData}
              setBooking={setBooking}
            />
          )
        : null}
      <Stack mt="3rem">
        <Button onClick={handleClick}>역할 배정 완료</Button>
      </Stack>
    </style.AssignRoleWrap>
  );
};

export default AssignRole;

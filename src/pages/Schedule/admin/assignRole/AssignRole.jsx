import * as style from "./AssignRole.style";
import { useState } from "react";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { Heading, Button, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Loader from "../../../../components/common/loader/Loader";
import AssignHeader from "../../../../components/Schedule/admin/assignRole/AssignHeader/AssignHeader";
import AssignBody from "../../../../components/Schedule/admin/assignRole/AssignBody/AssignBody";
import AssignFooter from "../../../../components/Schedule/admin/assignRole/AssignFooter/AssignFooter";

const override = {
  position: "absolute",
  display: "block",
  margin: "0 auto",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderColor: "red",
};

const AssignRole = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#319795");
  const [viewFooter, setViewFooter] = useState(false);
  const [roleData, setRoleDate] = useState([]);
  const [config, setConfig] = useState("");
  const [isHidden, setIsHidden] = useState([]);
  const [userData, setuserData] = useState([]);
  const [userId, setUserId] = useState([]);
  const [booking, setBooking] = useState([]);

  const { id } = useParams();

  const fireFetch = useFireFetch();

  const schedule = fireFetch.getData("schedule", "id", id)[0];

  const fetch = async () => {
    await fireFetch.update("schedule", id, { status: "모집완료" });

    for (const x of booking) {
      const booked = await fireFetch.get("bookedShifts", "userId", x.userId);
      const data = booked.find((v, i) => v.scheduleId === x.scheduleId);
      await fireFetch.update("bookedShifts", data.id, { role: x.role });

      alert("완료");
    }
  };

  const handleClick = () => {
    fetch();
  };

  return (
    <style.AssignRoleWrap>
      <Heading as="h2" size="md" mb="1rem">
        역할배정
      </Heading>
      {loading ? <Loader loading={loading} /> : null}
      <div style={{ display: loading ? "none" : "block" }}>
        {schedule && <AssignHeader schedule={schedule} />}
        {schedule && roleData && (
          <AssignBody
            schedule={schedule}
            isHidden={isHidden}
            roleData={roleData}
            userData={userData}
            config={config}
            booking={booking}
            userId={userId}
            setViewFooter={setViewFooter}
            setRoleDate={setRoleDate}
            setConfig={setConfig}
            setIsHidden={setIsHidden}
            setBooking={setBooking}
            setLoading={setLoading}
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
                userId={userId}
                setIsHidden={setIsHidden}
                setuserData={setuserData}
                setBooking={setBooking}
                setUserId={setUserId}
              />
            )
          : null}
        <Stack mt="3rem">
          <Button onClick={handleClick}>역할 배정 완료</Button>
        </Stack>
      </div>
    </style.AssignRoleWrap>
  );
};

export default AssignRole;

import * as style from "./NoData.style";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const NoData = () => {
  const navigate = useNavigate();
  const goSchedule = () => {
    navigate("/schedule");
  };
  return (
    <style.NoDataWrap>
      <p>데이터가 없습니다</p>
      <Button onClick={goSchedule} colorScheme="teal" size="sm">
        스케줄 신청
      </Button>
    </style.NoDataWrap>
  );
};

export default NoData;

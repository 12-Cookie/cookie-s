import * as style from "./Info_S.style";
import { app } from "../../../firebase/firebase";
import { signOut, getAuth } from "firebase/auth";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/user/useUserStore";

const Info_S = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        window.location.reload();
        useUserStore.persist.clearStorage();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <style.InfoWrap>
      <h1>info_s</h1>
      <Button onClick={handleLogOut}>로그아웃</Button>
    </style.InfoWrap>
  );
};

export default Info_S;

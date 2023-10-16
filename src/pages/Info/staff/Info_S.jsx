import * as style from "./Info_S.style";
import { useUserStore } from "../../../stores/useUserStore";

const Info_S = () => {
  const userData = useUserStore((state) => state.user);
  console.log(userData);
  return (
    <style.InfoWrap>
      <h1>{userData.name}</h1>
    </style.InfoWrap>
  );
};

export default Info_S;

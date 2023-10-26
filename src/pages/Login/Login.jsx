import React, { useEffect, useState } from "react";
import * as style from "./Login.style";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button, Heading, Text } from "@chakra-ui/react";
import useUserStore from "../../store/user/useUserStore";
import { useFireFetch } from "../../hooks/useFireFetch";

const Login = () => {
  // const initialUserData = useUserStore((state) => state.userData);

  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const { userData, setUserData } = useUserStore();
  const fireFetch = useFireFetch();
  const [user, setUser] = useState({});

  const handleAuth = () => {
    if (user?.name) {
      navigate("/dashboard");
    } else {
      signInWithPopup(auth, provider)
        .then((response) => {
          const { uid } = response.user;
          setUserData({ ...userData, id: uid, isAdmin: false });
        })
        .then(() => {
          fireFetch.postData("users", userData.id, userData);
        })
        .then(() => {
          navigate("/info/staff");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("user");
    setUser(JSON.parse(userDataFromLocalStorage));
  });

  return (
    <style.LoginWrap>
      <Heading as="h2" size="md" mb="1rem">
        내 일정에 맞게
        <br />
        근무 스케줄 지정
      </Heading>
      <Button
        w="100%"
        mt="100px"
        colorScheme="teal"
        size="md"
        onClick={handleAuth}
      >
        Google 로그인
      </Button>
      <style.AdminLoginWrap>
        <Text>관리자이신가요? </Text>
        <Link to={"/login/admin"}>
          <Text color="green" ml="10px">
            관리자 로그인
          </Text>
        </Link>
      </style.AdminLoginWrap>
    </style.LoginWrap>
  );
};

export default Login;

import * as style from "./Login.style";
import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../../firebase/firebase";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button, Heading, Text } from "@chakra-ui/react";

const initailUserdata = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : {};

const Login = () => {
  const [userData, setUserData] = useState(initailUserdata);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        console.log(response);
        localStorage.setItem("userData", JSON.stringify(response.user));
        navigate("/info/staff");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       console.log(user);
  //       setUserData(user);
  //       navigate("/");
  //     } else if (user && pathname === "/") {
  //       navigate("/info/staff");
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [auth, navigate]);

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

import React, { useState } from "react";
import * as style from "./Login.style";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Button, Heading, Text } from "@chakra-ui/react";
import useUserStore from "../../store/user/useUserStore";
import { useFireFetch } from "../../hooks/useFireFetch";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Login = () => {
  // const initialUserData = useUserStore((state) => state.userData);

  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const { userData, setUserData } = useUserStore();
  const fireFetch = useFireFetch();

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then(async (response) => {
        const { uid } = response.user;

        const Ref = collection(db, "users");
        const q = query(Ref, where("id", "==", uid));
        const querySnapshot = await getDocs(q);
        const updatedUserData = {
          ...userData,
          id: uid,
          isAdmin: false,
        };

        if (querySnapshot.empty) {
          await setUserData(updatedUserData);
          await fireFetch.postData("users", uid, userData);
          navigate("/info/staff");
        } else {
          querySnapshot.forEach(async (doc) => {
            await setUserData({ ...doc.data() });
            navigate("/dashboard");
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

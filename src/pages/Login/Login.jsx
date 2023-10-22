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
  //       navigate("/dashboard");
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [auth, navigate]);

  return (
    <style.LoginWrap>
      <h1>내 근무에 맞게</h1>
      <h1>근무 스케줄 지정</h1>
      <button onClick={handleAuth}>Google 로그인</button>
      <p>
        관리자이신가요?{" "}
        <Link to={"/login/admin"}>
          <button>관리자 로그인</button>
        </Link>
      </p>
    </style.LoginWrap>
  );
};

export default Login;

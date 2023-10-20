import * as style from "./Dashboard_S.style";
import { useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../firebase/firebase";
import { useNavigate, useLocation } from "react-router-dom";

const initailUserdata = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : {};

const Dashboard_S = () => {
  const [userData, setUserData] = useState(initailUserdata);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const auth = getAuth(app);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        localStorage.removeItem("userData");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log(user);
        setUserData(user);
        navigate("/");
      } else if (user && pathname === "/") {
        navigate("/dashboard");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  return (
    <style.DashboardWrap>
      <h1>Dashboard_S</h1>
      <button onClick={handleLogOut}>로그아웃</button>
    </style.DashboardWrap>
  );
};

export default Dashboard_S;

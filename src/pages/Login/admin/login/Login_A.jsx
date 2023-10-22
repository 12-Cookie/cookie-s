import * as style from "./Login_A.style";
import LoginForm from "./LoginForm";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../../../../firebase/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const initailUserdata = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : {};

const Login_A = () => {
  const [userData, setUserData] = useState(initailUserdata);

  const auth = getAuth(app);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [firebaseError, setFirebaseError] = useState("");

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response);
        localStorage.setItem("userData", JSON.stringify(response.user));
      })
      .catch((error) => {
        return error & setFirebaseError("이메일 또는 비밀번호가 틀렸습니다.");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log(user);
        setUserData(user); // 상태관리 필요
        navigate("/login/admin");
      } else if (user && pathname === "/login/admin") {
        navigate("/dashboard");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  return (
    <LoginForm
      title={"로그인"}
      getDataForm={handleLogin}
      firebaseError={firebaseError}
    />
  );
};

export default Login_A;

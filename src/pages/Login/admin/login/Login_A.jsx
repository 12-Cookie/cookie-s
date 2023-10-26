import * as style from "./Login_A.style";
import LoginForm from "../../../../components/Login/LoginForm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useUserStore from "../../../../store/user/useUserStore";
import { useFireFetch } from "../../../../hooks/useFireFetch";

const Login_A = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const { userData, setUserData } = useUserStore();
  const fireFetch = useFireFetch();
  const [firebaseError, setFirebaseError] = useState("");
  const [user, setUser] = useState({});

  const handleLogin = (email, password) => {
    if (user?.id) {
      navigate("/dashboard");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          const { uid } = response.user;
          setUserData({ ...userData, id: uid, isAdmin: true });
        })
        .then(() => {
          fireFetch.postData("users", userData.id, userData);
        })
        .then(() => {
          navigate("/info/admin");
        })
        .catch((error) => {
          return error & setFirebaseError("이메일 또는 비밀번호가 틀렸습니다.");
        });
    }
  };

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("user");
    setUser(JSON.parse(userDataFromLocalStorage));
  });

  return (
    <style.AdminLoginWrap>
      <LoginForm
        title={"관리자 로그인"}
        getDataForm={handleLogin}
        firebaseError={firebaseError}
      />
    </style.AdminLoginWrap>
  );
};

export default Login_A;

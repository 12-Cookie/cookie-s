import * as style from "./Login_A.style";
import LoginForm from "../../../../components/Login/LoginForm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserStore from "../../../../store/user/useUserStore";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";

const Login_A = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const { userData, setUserData } = useUserStore();
  const fireFetch = useFireFetch();
  const [firebaseError, setFirebaseError] = useState("");

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const { uid } = response.user;

        const Ref = collection(db, "users");
        const q = query(Ref, where("id", "==", uid));
        const querySnapshot = await getDocs(q);
        const updatedUserData = {
          ...userData,
          id: uid,
          isAdmin: true,
        };

        if (querySnapshot.empty) {
          await setUserData(updatedUserData);
          await fireFetch.postData("users", uid, updatedUserData);
          navigate("/info/admin");
        } else {
          querySnapshot.forEach(async (doc) => {
            await setUserData({ ...doc.data() });
            navigate("/dashboard");
          });
        }
      })
      .catch((error) => {
        return error & setFirebaseError("이메일 또는 비밀번호가 틀렸습니다.");
      });
  };

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

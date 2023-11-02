import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as style from "./SubmitCode.style";
import {
  collection,
  query,
  getFirestore,
  getDocs,
  where,
} from "firebase/firestore";
import { app } from "./../../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  PinInput,
  PinInputField,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import useUserStore from "../../../../store/user/useUserStore";

const db = getFirestore(app);

const SubmitCode = () => {
  // const [pin, setPin] = useState(["", "", "", "", "", ""]); // 초기 상태: 4자리 빈 PIN
  const navigate = useNavigate();
  const { userData, setUserData } = useUserStore();
  const fireFetch = useFireFetch();

  const [pin, setPin] = useState("");

  const handleChange = (value) => {
    setPin(value);
  };

  const handleComplete = (value) => {
    const pinNum = Number(value);

    const get = async () => {
      if (pinNum) {
        const companiesRef = collection(db, "company");
        const _query = query(companiesRef, where("code", "==", pinNum));
        const querySnapshot = await getDocs(_query);

        if (querySnapshot.empty) {
          alert("일치하는 회사 코드를 찾을 수 없습니다.");
        } else {
          const companyId = querySnapshot.docs[0].data().id;
          await setUserData({ ...userData, companyId });
          return {
            ...userData,
            companyId,
          };
        }
      }
    };
    get().then((res) => {
      if (res) {
        fireFetch.postData("users", userData.id, res);
        navigate("/dashboard");
      }
    });
  };

  return (
    <style.SubmitCodeWrap>
      <Heading as="h2" size="md" mb="5rem">
        필수 정보 입력
      </Heading>
      <HStack>
        <PinInput
          size="lg"
          value={pin}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
    </style.SubmitCodeWrap>
  );
};

export default SubmitCode;
